// src/services/dummyJobAnalysisService.ts

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Interfaces for the service
export interface JobAnalysisRequest {
  jobDescription: string;
  company?: string;
  role?: string;
  resumeId?: string;
}

export interface ExtractedSkill {
  name: string;
  importance: "required" | "preferred" | "nice-to-have";
  category: "technical" | "soft" | "tool" | "framework";
  experienceLevel?: "beginner" | "intermediate" | "expert";
  foundInProfile: boolean;
  matchConfidence: number;
}

export interface ProjectSuggestion {
  id: string;
  projectName: string;
  relevanceScore: number;
  reason: string;
  skillsDemonstrated: string[];
  highlightSuggestions: string[];
}

export interface ResumeSuggestion {
  section: "summary" | "experience" | "skills" | "projects" | "education";
  suggestion: string;
  priority: "high" | "medium" | "low";
  beforeExample?: string;
  afterExample?: string;
}

export interface GapAnalysis {
  matchPercentage: number;
  strengths: string[];
  weaknesses: string[];
  improvementSuggestions: string[];
  learningResources: {
    title: string;
    url: string;
    type: "course" | "tutorial" | "documentation" | "book";
    estimatedTime: string;
  }[];
}

export interface InterviewPreparation {
  likelyQuestions: {
    question: string;
    category: "technical" | "behavioral" | "cultural";
    tips: string[];
  }[];
  companyResearch: {
    culture: string[];
    values: string[];
    recentNews: string[];
  };
}

export interface JobAnalysisResponse {
  extractedRole: string;
  extractedCompany: string;
  extractedSkills: ExtractedSkill[];
  projectSuggestions: ProjectSuggestion[];
  resumeSuggestions: ResumeSuggestion[];
  gapAnalysis: GapAnalysis;
  interviewPreparation: InterviewPreparation;
  suggestedActions: string[];
  analysisTimestamp: Date;
  estimatedApplicationStrength: number;
}

export interface TailoredResumeResponse {
  tailoredContent: string;
  changes: string[];
  beforeExample?: string;
  afterExample?: string;
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  jobDescription: string;
  status: "saved" | "applied" | "interviewing" | "rejected" | "offered";
  appliedDate?: Date;
  analysis: JobAnalysisResponse;
  notes: string;
  resumeUsed?: string;
  coverLetterUsed?: string;
  nextSteps: string[];
}

// Generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Extract basic info from job description (mock implementation)
const extractJobInfoFallback = (
  jobDescription: string
): { role: string; company: string; skills: string[] } => {
  const roleMatch = jobDescription.match(
    /(senior|junior|lead|principal)?\s*(frontend|backend|full stack|software|web|mobile|devops|data|ml|ai)/i
  );
  const role = roleMatch ? roleMatch[0] : "Software Developer";

  const companyMatch = jobDescription.match(
    /(?:at|company:|organization:)\s*([A-Za-z0-9&\-.]+)/i
  );
  const company = companyMatch ? companyMatch[1] : "Tech Company Inc.";

  // Extract some common skills
  const commonSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Python",
    "Java",
    "C#",
    "SQL",
    "MongoDB",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Agile",
    "Scrum",
    "REST",
    "GraphQL",
  ];

  const foundSkills = commonSkills.filter((skill) =>
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  );

  return {
    role,
    company,
    skills: foundSkills,
  };
};

// Mock job applications storage
let mockApplications: JobApplication[] = [];

// Main function to analyze a job description
export const analyzeJobDescription = async (
  request: JobAnalysisRequest
): Promise<JobAnalysisResponse> => {
  await delay(1500); // Simulate API call delay

  // For demo purposes, return mock data
  return getMockAnalysisData(request);
};

// Function to generate a tailored resume based on job analysis
export const generateTailoredResume = async (
  _jobDescription: string,
  _resumeId: string,
  _analysis: JobAnalysisResponse
): Promise<TailoredResumeResponse> => {
  await delay(2000); // Simulate API call delay

  // For demo purposes, return mock data
  return getMockTailoredResume();
};

// Function to save a job application to the tracker
export const saveJobApplication = async (
  application: Omit<JobApplication, "id" | "analysisTimestamp">
): Promise<JobApplication> => {
  await delay(1000); // Simulate API call delay

  const newApplication: JobApplication = {
    ...application,
    id: generateId(),
    analysis: {
      ...application.analysis,
      analysisTimestamp: new Date(),
    },
  };

  mockApplications.push(newApplication);
  return newApplication;
};

// Function to get all job applications
export const getJobApplications = async (): Promise<JobApplication[]> => {
  await delay(800); // Simulate API call delay
  return mockApplications;
};

// Function to update a job application
export const updateJobApplication = async (
  id: string,
  updates: Partial<JobApplication>
): Promise<JobApplication> => {
  await delay(1000); // Simulate API call delay

  const index = mockApplications.findIndex((app) => app.id === id);
  if (index === -1) {
    throw new Error("Application not found");
  }

  mockApplications[index] = {
    ...mockApplications[index],
    ...updates,
  };

  return mockApplications[index];
};

// Function to extract key information from a job description
export const extractJobInfo = async (
  jobDescription: string
): Promise<{ role: string; company: string; skills: string[] }> => {
  await delay(500); // Simulate API call delay
  return extractJobInfoFallback(jobDescription);
};

// Mock data for development/demo purposes
const getMockAnalysisData = (
  request: JobAnalysisRequest
): JobAnalysisResponse => {
  const { role, company } = extractJobInfoFallback(request.jobDescription);

  return {
    extractedRole: request.role || role,
    extractedCompany: request.company || company,
    extractedSkills: [
      {
        name: "React",
        importance: "required",
        category: "framework",
        foundInProfile: true,
        matchConfidence: 0.9,
        experienceLevel: "expert",
      },
      {
        name: "TypeScript",
        importance: "required",
        category: "technical",
        foundInProfile: true,
        matchConfidence: 0.85,
        experienceLevel: "intermediate",
      },
      {
        name: "Node.js",
        importance: "preferred",
        category: "technical",
        foundInProfile: true,
        matchConfidence: 0.75,
        experienceLevel: "intermediate",
      },
      {
        name: "GraphQL",
        importance: "preferred",
        category: "technical",
        foundInProfile: false,
        matchConfidence: 0.4,
      },
      {
        name: "AWS",
        importance: "nice-to-have",
        category: "tool",
        foundInProfile: false,
        matchConfidence: 0.2,
      },
      {
        name: "Jest",
        importance: "required",
        category: "tool",
        foundInProfile: true,
        matchConfidence: 0.8,
        experienceLevel: "intermediate",
      },
      {
        name: "Agile Methodology",
        importance: "required",
        category: "soft",
        foundInProfile: true,
        matchConfidence: 0.9,
      },
    ],
    projectSuggestions: [
      {
        id: "1",
        projectName: "E-commerce Platform",
        relevanceScore: 0.95,
        reason:
          "Demonstrates full-stack development with React, Node.js, and payment integration which aligns perfectly with the e-commerce focus mentioned in the job description.",
        skillsDemonstrated: [
          "React",
          "TypeScript",
          "Node.js",
          "REST APIs",
          "Payment Integration",
        ],
        highlightSuggestions: [
          "Emphasize the scalability challenges you solved",
          "Mention specific performance improvements you implemented",
          "Highlight the CI/CD pipeline you set up",
        ],
      },
      {
        id: "2",
        projectName: "Real-time Collaboration Tool",
        relevanceScore: 0.85,
        reason:
          "Shows expertise in real-time technologies and complex state management, which are mentioned as desirable skills.",
        skillsDemonstrated: ["React", "WebSockets", "Redux", "TypeScript"],
        highlightSuggestions: [
          "Focus on the real-time synchronization challenges",
          "Mention the number of concurrent users supported",
          "Highlight the responsive UI design",
        ],
      },
    ],
    resumeSuggestions: [
      {
        section: "summary",
        suggestion:
          "Add a professional summary highlighting your 5+ years of experience with React and TypeScript in e-commerce applications.",
        priority: "high",
        beforeExample:
          "Frontend developer with experience in various technologies.",
        afterExample:
          "Senior Frontend Developer with 5+ years specializing in React and TypeScript, with extensive experience building scalable e-commerce platforms handling 10k+ daily users.",
      },
      {
        section: "skills",
        suggestion:
          "Move React and TypeScript to the top of your skills section and add specific libraries mentioned in the job description like Jest and React Testing Library.",
        priority: "high",
      },
      {
        section: "experience",
        suggestion:
          'Quantify your achievements in your most recent role (e.g., "Improved page load time by 40%", "Reduced bounce rate by 25%").',
        priority: "medium",
      },
    ],
    gapAnalysis: {
      matchPercentage: 75,
      strengths: [
        "Strong React experience (5+ years)",
        "TypeScript proficiency",
        "Node.js background",
        "Testing expertise with Jest",
        "Agile methodology experience",
      ],
      weaknesses: [
        "No GraphQL experience",
        "Limited cloud experience (AWS)",
        "No mention of performance optimization tools",
      ],
      improvementSuggestions: [
        "Complete a GraphQL tutorial within the next 2 weeks",
        "Take an AWS fundamentals course",
        "Add performance optimization to your learning goals",
      ],
      learningResources: [
        {
          title: "GraphQL Basics Course",
          url: "https://example.com/graphql-course",
          type: "course",
          estimatedTime: "10 hours",
        },
        {
          title: "AWS Certified Cloud Practitioner",
          url: "https://example.com/aws-course",
          type: "course",
          estimatedTime: "20 hours",
        },
      ],
    },
    interviewPreparation: {
      likelyQuestions: [
        {
          question:
            "How do you handle state management in large React applications?",
          category: "technical",
          tips: [
            "Discuss different state management solutions you've used (Redux, Context API, Zustand)",
            "Mention how you decide between local and global state",
            "Provide a specific example from your experience",
          ],
        },
        {
          question:
            "Describe a challenging technical problem you solved in a previous project.",
          category: "behavioral",
          tips: [
            "Use the STAR method (Situation, Task, Action, Result)",
            "Focus on your thought process and collaboration",
            "Quantify the impact of your solution",
          ],
        },
      ],
      companyResearch: {
        culture: [
          "Innovation-focused",
          "Collaborative environment",
          "Remote-friendly",
        ],
        values: ["Customer obsession", "Ownership", "Long-term thinking"],
        recentNews: [
          "Recently secured $20M in Series B funding",
          "Launched a new AI-powered feature last month",
          "Expanding into European markets",
        ],
      },
    },
    suggestedActions: [
      "Highlight your React projects more prominently in your resume",
      "Complete at least one GraphQL tutorial before applying",
      "Research the company's recent product launches",
      "Prepare examples of your experience with agile methodologies",
      "Update your LinkedIn profile to reflect your strongest skills",
    ],
    analysisTimestamp: new Date(),
    estimatedApplicationStrength: 75,
  };
};

const getMockTailoredResume = (): TailoredResumeResponse => {
  return {
    tailoredContent: "",
    changes: [
      "Enhanced professional summary to highlight e-commerce experience",
      "Reordered skills to prioritize React and TypeScript",
      "Added quantifiable metrics to experience section",
      "Included more keywords from the job description",
    ],
    beforeExample:
      "Frontend developer with experience in various technologies.",
    afterExample:
      "Senior Frontend Developer with 5+ years specializing in React and TypeScript, with extensive experience building scalable e-commerce platforms handling 10k+ daily users. Successfully improved page load performance by 40% and reduced bounce rate by 25%.",
  };
};

export const deleteJobApplication = async (id: string): Promise<void> => {
  await delay(500); // Simulate API call delay

  const index = mockApplications.findIndex((app) => app.id === id);
  if (index === -1) {
    throw new Error("Application not found");
  }

  mockApplications.splice(index, 1);
};
// Export all functions
export default {
  analyzeJobDescription,
  generateTailoredResume,
  saveJobApplication,
  getJobApplications,
  updateJobApplication,
  extractJobInfo,
  deleteJobApplication,
};
