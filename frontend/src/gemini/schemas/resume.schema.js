const ResumeSchema = {
    type: "object",
    properties: {
        personal_info: {
            type: "object",
            properties: {
                name: { type: "string" },
                address: { type: "string" },
                phone: { type: "string" },
                email: { type: "string" },
                linkedin: { type: "string" },
                github: { type: "string" }
            },
            required: ["name", "address", "phone", "email", "linkedin", "github"]
        },
        education: {
            type: "object",
            properties: {
                institution: { type: "string" },
                degree: { type: "string" },
                gpa: { type: "string" },
                graduation_date: { type: "string" },
                location: { type: "string" }
            },
            required: ["institution", "degree", "gpa", "graduation_date", "location"]
        },
        technical_skills: {
            type: "object",
            properties: {
                programming_languages: { type: "array", items: { type: "string" } },
                frontend: { type: "array", items: { type: "string" } },
                backend: { type: "array", items: { type: "string" } },
                databases: { type: "array", items: { type: "string" } },
                cloud_platforms: { type: "array", items: { type: "string" } },
                tools: { type: "array", items: { type: "string" } }

            },
            required: [
                "programming_languages",
                "frontend",
                "backend",
                "databases",
                "cloud_platforms",
                "tools",
            ]
        },
        experiences: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    company: { type: "string" },
                    position: { type: "string" },
                    start_date: { type: "string" },
                    end_date: { type: "string" },
                    location: { type: "string" },
                    responsibilities: { type: "array", items: { type: "string" } }
                },
                required: ["id", "company", "position", "start_date", "end_date", "location", "responsibilities"]
            }
        },
        projects: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                    technologies: { type: "array", items: { type: "string" } },
                    date: { type: "string" },
                    description: { type: "array", items: { type: "string" } },
                    github: { type: "string" }
                },
                required: ["id", "name", "technologies", "date", "description", "github"]
            }
        },
        achievements: {
            type: "array",
            items: { type: "string" }
        }
    },
    required: ["personal_info", "education", "technical_skills", "experiences", "projects", "achievements"]
};

export default ResumeSchema;