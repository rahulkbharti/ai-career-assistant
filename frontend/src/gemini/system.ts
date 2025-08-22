import { GoogleGenerativeAI } from "@google/generative-ai";
import jobDescriptionSchema from "./schemas/job_descriptions.schema.js";
import ResumeSchema from "./schemas/resume.schema.js";
import JobAnalysisResult from "./schemas/job_analysis.schema.js";

// Define interfaces for the expected response types
interface ApiResponse<T = any> {
  success: boolean;
  response?: T;
  error?: string;
}

interface JobInfo {
  // Define based on your jobDescriptionSchema structure
  [key: string]: any;
}

interface ResumeInfo {
  // Define based on your ResumeSchema structure
  [key: string]: any;
}

// interface JobAnalysis {
//   // Define based on your JobAnalysisResult structure
//   [key: string]: any;
// }

const API_KEY = "AIzaSyDtdrmGEg14TMExvW0yPZ5Z28CplTYCfgo"; // You should get this from environment variables

if (!API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export const extractJobInformation = async (
  prompt: string = ""
): Promise<ApiResponse<string>> => {
  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Extract the information from the following job description text. if Data not found keep Empty",
            },
            { text: prompt },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: jobDescriptionSchema,
      },
    });

    const response = result.response.text();
    console.log("The Result", response);
    return { success: true, response };
  } catch (error: any) {
    console.error("Error generating content:", error);
    return { success: false, error: error.message };
  }
};

export const extractResumeInformation = async (
  data_string: string = ""
): Promise<ApiResponse<string>> => {
  try {
    // const pdfBuffer = fs.readFileSync(path);
    // const pdfBase64 = pdfBuffer.toString("base64");
    // console.log("PDF Base64 Length:", pdfBase64.length);
    // console.log("Size (in bytes):", pdfBuffer.length);
    if (!data_string) {
      return { success: false, error: "Data not found" };
    }
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: "Extract the Information from the file." },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: data_string,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: ResumeSchema,
      },
    });

    const response = result.response.text();
    console.log("The Result", response);
    return { success: true, response };
  } catch (error: any) {
    console.error("Error generating content:", error);
    return { success: false, error: error.message };
  }
};

export const jobAnalysis = async (
  jobInfo: JobInfo,
  resumeInfo: ResumeInfo
): Promise<ApiResponse<string>> => {
  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Analyse the jobInfo based on the resumeInfo and Give Analysis and Recommendations",
            },
            {
              text: `{"jobInfo": ${JSON.stringify(
                jobInfo
              )}, "resumeInfo": ${JSON.stringify(resumeInfo)}}`,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: JobAnalysisResult,
      },
    });

    const response = result.response.text();
    console.log("The Result", response);
    return { success: true, response };
  } catch (error: any) {
    console.error("Error generating content:", error);
    return { success: false, error: error.message };
  }
};

// const job_description = `
// Visdum
// Share
// Show more options
// React Developer
// Noida, Uttar Pradesh, India · Reposted 1 day ago · Over 100 applicants
// Promoted by hirer · Actively reviewing applicants

//  On-site
// Matches your job preferences, workplace type is On-site.

//  Full-time
// Matches your job preferences, job type is Full-time.

// Easy Apply

// Save
// Save React Developer at Visdum
// React Developer
// Visdum · Noida, Uttar Pradesh, India (On-site)

// Easy Apply

// Save
// Save React Developer at Visdum
// Show more options
// How your profile and resume fit this job
// Get AI-powered advice on this job and more exclusive features with Premium. Try Premium for ₹0

// Tailor my resume to this job

// Am I a good fit for this job?

// How can I best position myself for this job?

// Meet the hiring team
// Saumya Choudhary is hiring
// Saumya Choudhary
//  2nd
// HR executive at Visdum Tech
// Job poster · 1 mutual connection

// Message
// About the job
// About Visdum:

// Headquartered in Delaware, USA, Visdum is the world's leading SaaS Solution for Sales Compensation Management.

// Founded in 2020 by ex-Oracle, Naukri, JP Morgan executives who have 50+ years of experience in the IT industry, we're an early-stage SaaS startup with a mission to democratize sales commissions.

// Visdum helps Finance, Revenue Operations, and Sales teams manage and optimize sales incentive compensation process, giving real-time visibility to payouts and a decrease in calculation errors. SaaS teams around the world save hundreds of hours by automating commissions and drive higher sales revenue with a motivated sales team by using our sales compensation software.

// We are ISO 27001 and SOC2 certified and adhere to top global standards in cloud based product development and information security.

// Our Impact So Far:

// 13+ Countries Served
// $50M+ Commissions Processed

// The Opportunity:

// We are seeking a highly skilled React.js Developer with 1-4 years of experience to join our dynamic team. The ideal candidate will be responsible for developing high-quality web applications using React.js and will be able to work collaboratively with other developers, designers, and project managers.

// Responsibilities:

// ● Develop high-quality, responsive web applications using React.js
// ● Collaborate with cross functional teams to define, design, and ship new
// features.
// ● Ensure the technical feasibility of UI/UX designs
// ● Optimize web applications for maximum speed and scalability
// ● Implement automated testing and deployment processes
// ● Participate in code reviews and provide constructive feedback to other
// developers

// Requirements:

// ● 1-3 years of experience in React.js development
// ● Thorough understanding of React.js and its core principles
// ● Strong proficiency in JavaScript, HTML, CSS and related web technologies
// ● Understanding of RESTful API design and implementation
// ● Familiarity with version control systems (Git, SVN, etc.)
// ● Experience with popular React.js workflows (such as Flux or Redux)
// ● Familiarity with code versioning tools.(such as git)
// ● Experience with modern build pipelines e.g., Webpack or Babel
// `;

// const _main = async (): Promise<void> => {
//   try {
//     const job_info = await extractJobInformation(job_description);
//     console.log("Job Information:", job_info);

//     const resume = await extractResumeInformation();
//     console.log("Generated Resume:", resume);

//     if (
//       job_info.success &&
//       resume.success &&
//       job_info.response &&
//       resume.response
//     ) {
//       const analysis = await jobAnalysis(
//         JSON.parse(job_info.response),
//         JSON.parse(resume.response)
//       );
//       console.log("Job Analysis Result:", analysis);

//       if (analysis.success && analysis.response) {
//         try {
//           const parse_result: JobAnalysis = JSON.parse(analysis.response);
//           console.log("Parsed Job Analysis Result:", parse_result);
//         } catch (e: any) {
//           console.error("Error parsing job analysis:", e);
//         }
//       }
//     }
//   } catch (error: any) {
//     console.error("Error in main function:", error);
//   }
// };
