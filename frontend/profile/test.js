
const Resume = { "basics": { "email": "rail.com", "name": "RAHUL KUMAR BHARTI", "label": "r Pradesh 233300", "location": { "city": "Ghazipur", "countryCode": "IN", "region": "Uttar Pradesh" }, "phone": "", "profiles": [{ "network": "linkedin", "username": "rahul-kbharti", "url": "linkedin.com/in/rahul-kbharti" }, { "network": "github", "username": "rahulkbharti", "url": "github.com/rahulkbharti" }], "website": "string" }, "education": [{ "area": "Information Technology", "institution": "Rajkiya Engineering College, Ambedkar Nagar", "startDate": "string", "studyType": "Bachelor of Technology", "endDate": "July 2025", "gpa": "8.0 / 10" }], "skills": [{ "category": "Programming Languages", "keywords": ["C", "C++", "JavaScript(ES6+)", "TypeScript", "Python"] }, { "category": "Frontend", "keywords": ["React.js", "Next.js", "Redux", "Tailwind CSS", "HTML5", "CSS3"] }, { "category": "Backend", "keywords": ["Node.js", "Express.js", "Django", "REST API development", "JWT/OAuth"] }, { "category": "Databases", "keywords": ["MongoDB(NoSQL)", "MySQL(SQL)"] }, { "category": "Cloud Platforms", "keywords": ["Google Cloud(Basics)", "Microsoft Azure(Basics)", "Docker", "GitHub Actions"] }, { "category": "Testing & Tools", "keywords": ["Vitest(Jest-compatible)", "Postman", "VS Code", "Git", "GitHub", "Figma"] }], "summary": "Results-driven Full-Stack Developer with hands-on experience in designing, developing, and deploying web applications. Proficient in JavaScript, Python, React, and Node.js, with a strong command of both NoSQL (MongoDB) and SQL (MySQL) databases. Seeking to leverage project management skills and a passion for problem-solving to build high-quality, responsive web applications.", "workExperience": [{ "company": "Ekalsutra Edtech Pvt. Ltd.", "position": "Web App Development Intern", "startDate": "October 2023", "endDate": "December 2023", "highlights": ["Developed a responsive admin dashboard using React.js, Material UI, and Redux Toolkit, translating Figma designs into pixel-perfect UI components with 95% design fidelity.", "Optimized data flow by integrating REST APIs with React Query, reducing unnecessary re-renders by 30% through intelligent caching strategies.", "Implemented 15+ form workflows using Formik & Yup, decreasing validation errors by 25% and improving form completion rates.", "Secured application routes with JWT authentication, implementing token validation and protected routing.", "Conducted comprehensive API testing with Postman (50+ endpoints) and wrote unit tests (Vitest) covering 80%+ of critical components.", "Collaborated in Agile team using Git/GitHub, maintaining 100% code review compliance."], "location": "Akbarpur, Uttar Pradesh" }], "achievements": [{ "description": "Top 0.5% in TCS CodeVita (among 400K+ participants).", "title": "TCS CodeVita" }, { "description": "Completed 87+ hands-on labs, 27 courses, 23 quizzes, 7 gamified learning modules, and 3 structured learning paths on Google Cloud.", "title": "Google Cloud Certifications" }], "projects": [{ "name": "Library Management ERP Solution", "summary": "Architected a full-stack solution with React.js + Material UI frontend and Node.js/Express backend serving 3 user roles (Admin/Staff/Member).", "highlights": ["Implemented secure authentication using JWT + Google OAuth 2.0 with redux-persist for session management.", "Designed normalized MySQL database with organization-based isolation and 40+ RBAC permissions controlled via admin dashboard.", "Developed 15+ Formik forms with Yup validation and Axios interceptors, improving data submission accuracy.", "Optimized state management using Redux Toolkit, encrypted and stored in local Storage", "Established CI/CD pipeline with Vitest testing and Winston logging for production monitoring."], "technologies": ["Node.js", "Express", "MySQL", "JWT", "OAuth 2.0", "RBAC", "Reactjs"], "url": "string" }, { "name": "Real Time Video Chat App", "summary": "Built an Omegle-like video chat app using React, Node.js, and WebRTC, enabling real-time peer-to-peer connections with Socket.io for secure SDP exchange.", "highlights": ["Implemented interest-based matching with a queue system and semaphore locks to prevent duplicate connections and ensure 1:1 pairing.", "Developed custom hooks (useWebRTC, useMedia) to streamline WebRTC setup, media handling, and error management."], "technologies": ["WebRTC", "Socket.io", "Custom Hooks (useMedia + useWebRTC)"], "url": "string" }, { "name": "M3U8 Video Streaming App", "summary": "Developed an adaptive M3u8 streaming service using Node.js, FFmpeg, and Azure Blob Storage, leveraging child processes for non-blocking video transcoding into multiple resolutions.", "highlights": ["Implemented dynamic M3u8 playlist generation with signed URLs and expiry times, MongoDB for metadata storage, and Socket.io for real-time encoding status updates.", "Designed a responsive frontend with HLS.js and Plyr.js for seamless playback, including video preview thumbnails and adaptive bitrate switching.", "Automated CI/CD on Render with Github Action and Docker, slashing deployment time by 60%."], "technologies": ["FFmpeg", "Azure Blob Storage", "MongoDB", "HLS.js", "Nodejs(Child Process)"], "url": "string" }], "id": "cdclq219j", "name": "master", "job_role": "Software Engineering" }

const job_info = { "companyName": "Prometteur Solutions Pvt. Ltd.", "coreResponsibilities": ["Meeting with the development team to discuss user interface ideas and application requirements", "Reviewing application requirements and interface designs", "Identifying and developing web-based user interactions", "Developing and implementing highly responsive user interface components using React and Next.js concepts", "Writing application interface code using JavaScript, following React.js workflows", "Creating server-side rendered pages and API routes using Next.js", "Troubleshooting and debugging interface software and application code", "Developing and implementing front-end architecture to support UI/UX concepts", "Monitoring and improving front-end performance", "Ensuring cross-browser and cross-platform compatibility", "Documenting application changes and updates"], "jobSummary": "React JS Developer responsible for developing and implementing user interface components using React and Next.js, ensuring cross-browser compatibility, and improving front-end performance.", "jobTitle": "React JS Developer", "jobType": "Full-time", "keywords": ["React.js", "Next.js", "JavaScript", "CSS", "HTML", "Webpack", "Redux", "Flux", "Enzyme", "Mocha", "Jest", "REST APIs", "Git", "UI", "UX", "web development", "front-end", "developer"], "location": "Mulshi, Maharashtra, India", "qualifications": { "preferred": [], "required": ["In-depth knowledge of JavaScript, CSS, HTML, and front-end technologies", "Hands-on experience with React.js and Next.js frameworks", "Familiarity with React tools like Webpack, Redux, Flux, Enzyme, etc.", "Basic understanding of server-side rendering (SSR) and static site generation (SSG) in Next.js", "Understanding of user interface design principles and best practices", "Knowledge of performance testing frameworks including Mocha and Jest", "Experience with browser-based debugging and performance testing tools", "Familiarity with REST APIs and version control systems like Git"] }, "softSkills": [], "technicalSkills": { "mustHave": ["JavaScript", "CSS", "HTML", "React.js", "Next.js"], "niceToHave": ["Webpack", "Redux", "Flux", "Enzyme", "Mocha", "Jest", "REST APIs", "Git"] } }




console.log(job_info, Resume)


function generatePrompt(job, resume) {
    const name = resume.basics.name;
    const jobTitle = job.jobTitle;
    const companyName = job.companyName;

    const skills = resume.skills.map(s => s.keywords).flat().join(", ");
    const topProjects = resume.projects.map(p => `${p.name} - ${p.summary}`).join("\n");

    const workHighlights = resume.workExperience
        .map(exp => `At ${exp.company} as ${exp.position}, ${exp.highlights.slice(0, 2).join(" ")}`)
        .join("\n");

    return `
Act as a professional career assistant. Using the following information, craft a highly personalized cover letter for the role:

**Candidate Details:**
- Name: ${name}
- Summary: ${resume.summary}
- Skills: ${skills}
- Top Projects:
${topProjects}

- Work Highlights:
${workHighlights}

**Job Details:**
- Job Title: ${jobTitle}
- Company: ${companyName}
- Location: ${job.location}
- Job Summary: ${job.jobSummary}
- Key Responsibilities: ${job.coreResponsibilities.join(", ")}
- Must-have Skills: ${job.technicalSkills.mustHave.join(", ")}
- Nice-to-have Skills: ${job.technicalSkills.niceToHave.join(", ")}
- Required Qualifications: ${job.qualifications.required.join(", ")}

**Your Task:** 
Write a cover letter (200-300 words) that:
1. Highlights the candidate’s most relevant experience and achievements aligned with the job.
2. Showcases knowledge of ${jobTitle}, React.js, Next.js, and front-end development.
3. Uses a confident, professional tone but sounds genuine.
4. Mentions why ${name} is excited about joining ${companyName}.
`;
}

// Example Usage:
const prompt = generatePrompt(job_info, Resume);
console.log(prompt);