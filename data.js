// Sample course data
window.SAMPLE_COURSE = {
  id: "course-web-101",
  title: "Web Dev Basics: HTML, CSS, JS",
  description: "Learn how the web works and build a simple interactive site.",
  lessons: [
    {
      id: "l1-intro-web",
      title: "How the Web Works",
      duration: 420,
      sources: [
        { src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", type: "application/x-mpegURL" },
        { src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", type: "video/mp4" }
      ],
      quiz: {
        id: "q1",
        questions: [
          {
            id: "q1-1",
            prompt: "Which protocol is used to transfer web pages?",
            options: ["HTTP/HTTPS", "FTP", "SMTP", "SSH"],
            answerIndex: 0,
            explanation: "Web pages are requested and delivered over HTTP/HTTPS."
          },
          {
            id: "q1-2",
            prompt: "What does the browser do with HTML?",
            options: ["Renders structure/content", "Compiles code", "Sends emails", "Manages OS"],
            answerIndex: 0,
            explanation: "HTML provides structure and content to render."
          }
        ]
      }
    },
    {
      id: "l2-html-basics",
      title: "HTML Basics",
      duration: 600,
      sources: [
        { src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", type: "application/x-mpegURL" },
        { src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", type: "video/mp4" }
      ],
      quiz: {
        id: "q2",
        questions: [
          {
            id: "q2-1",
            prompt: "Which tag is the largest heading?",
            options: ["<h1>", "<head>", "<title>", "<header>"],
            answerIndex: 0,
            explanation: "<h1> defines the top-level heading."
          },
          {
            id: "q2-2",
            prompt: "Which element contains page content?",
            options: ["<html>", "<body>", "<main>", "<div>"],
            answerIndex: 1,
            explanation: "<body> wraps the visible content."
          }
        ]
      }
    }
  ]
};
