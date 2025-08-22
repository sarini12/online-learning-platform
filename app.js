(function () {
  const LS_KEY = "learnflow-state";
  const state = loadState();
  const course = window.SAMPLE_COURSE;

  const yearEl = document.getElementById("year");
  const lessonList = document.getElementById("lesson-list");
  const courseTitle = document.getElementById("course-title");
  const courseDesc = document.getElementById("course-desc");
  const progressBar = document.getElementById("progress-bar");
  const progressMeta = document.getElementById("progress-meta");
  const lessonTitle = document.getElementById("lesson-title");
  const video = document.getElementById("video");
  const videoError = document.getElementById("video-error");
  const quizRoot = document.getElementById("quiz-root");
  const btnSubmitQuiz = document.getElementById("btn-submit-quiz");
  const quizScore = document.getElementById("quiz-score");
  const btnMarkComplete = document.getElementById("btn-mark-complete");
  const courseComplete = document.getElementById("course-complete");
  const bestBadge = document.getElementById("best-badge");

  yearEl.textContent = new Date().getFullYear();

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || {};
    } catch {
      return {};
    }
  }
  function saveState() {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }

  function getActiveLesson() {
    const id = state.activeLessonId || course.lessons[0].id;
    return course.lessons.find(l => l.id === id) || course.lessons[0];
  }

  function renderSidebar() {
    lessonList.innerHTML = "";
    course.lessons.forEach((l, idx) => {
      const done = state.completed?.[l.id];
      const btn = document.createElement("button");
      btn.className = "lesson-btn";
      btn.innerHTML = `<div class="lesson-title">${idx+1}. ${l.title}</div>
        <div class="muted">${formatTime(l.duration)}</div>
        <div><span class="badge ${done?"success":""}">${done?"Done":"Not done"}</span></div>`;
      btn.onclick = () => { state.activeLessonId = l.id; saveState(); render(); };
      lessonList.appendChild(btn);
    });
  }

  function renderCourseHeader() {
    courseTitle.textContent = course.title;
    courseDesc.textContent = course.description;
    const total = course.lessons.length;
    const done = Object.values(state.completed||{}).filter(Boolean).length;
    const pct = Math.floor((done/total)*100);
    progressBar.style.width = pct+"%";
    progressMeta.textContent = `Progress: ${pct}% (${done}/${total})`;
    courseComplete.classList.toggle("hidden", done!==total);
  }

  function setupVideo(sources) {
    videoError.classList.add("hidden");
    video.src="";
    const hlsSrc = sources.find(s=>s.type.includes("mpegURL"));
    const mp4Src = sources.find(s=>s.type.includes("mp4"));
    if(hlsSrc){
      if(video.canPlayType("application/vnd.apple.mpegurl")){
        video.src=hlsSrc.src;
      } else if(window.Hls && window.Hls.isSupported()){
        const hls=new Hls();hls.loadSource(hlsSrc.src);hls.attachMedia(video);
      } else if(mp4Src){ video.src=mp4Src.src; }
    } else if(mp4Src){ video.src=mp4Src.src; }
    video.onended=()=>document.getElementById("quiz-card").scrollIntoView({behavior:"smooth"});
    video.onerror=()=>{ videoError.textContent="Video playback error"; videoError.classList.remove("hidden"); };
  }

  function renderLesson() {
    const lesson=getActiveLesson();
    lessonTitle.textContent=lesson.title;
    setupVideo(lesson.sources);
    renderQuiz(lesson);
  }

  function renderQuiz(lesson) {
    const quiz=lesson.quiz;
    quizRoot.innerHTML="";
    quiz.questions.forEach((q,i)=>{
      const div=document.createElement("div");
      div.className="card";
      div.innerHTML=`<p><strong>Q${i+1}.</strong> ${q.prompt}</p>
        ${q.options.map((opt,j)=>
          `<label><input type="radio" name="${q.id}" value="${j}"/> ${escapeHtml(opt)}</label><br>`
        ).join("")}
        <p class="muted hidden" id="exp-${q.id}"></p>`;
      quizRoot.appendChild(div);
    });

    btnSubmitQuiz.onclick=()=>{
      let score=0;
      quiz.questions.forEach(q=>{
        const chosen=[...document.getElementsByName(q.id)].find(r=>r.checked);
        if(chosen && Number(chosen.value)===q.answerIndex){ score++; }
        document.getElementById("exp-"+q.id).textContent="Answer: "+q.options[q.answerIndex]+" – "+q.explanation;
        document.getElementById("exp-"+q.id).classList.remove("hidden");
      });
      quizScore.textContent=`You scored ${score}/${quiz.questions.length}`;
      if(score/quiz.questions.length>=0.7){ state.completed={...state.completed,[lesson.id]:true}; }
      saveState(); renderSidebar(); renderCourseHeader();
    };
  }

  function render() {
    renderSidebar();
    renderCourseHeader();
    renderLesson();
  }

  function formatTime(s){
    return Math.floor(s/60).toString().padStart(2,"0")+":"+Math.floor(s%60).toString().padStart(2,"0");
  }

  //  Fix: escape < and > in options so they display
  function escapeHtml(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  render();
})();
