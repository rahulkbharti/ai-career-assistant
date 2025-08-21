const jobDescriptionSchema = {
    type: "object",
    properties: {
        job_title: { type: "string" },
        company_name: { type: "string" },
        location: { type: "string" },
        employment_type: {
            type: "string",
            enum: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"]
        },
        job_description: { type: "string" },
        responsibilities: {
            type: "array",
            items: { type: "string" }
        },
        qualifications: {
            type: "array",
            items: { type: "string" }
        },
        skills_analysis: {
            type: "object",
            properties: {
                required: {
                    type: "array",
                    items: { type: "string" }
                },
                preferred: {
                    type: "array",
                    items: { type: "string" }
                },
                nicetohave: {
                    type: "array",
                    items: { type: "string" }
                }
            }
        },
        salary_range: {
            type: "object",
            properties: {
                min_salary: { type: "number" },
                max_salary: { type: "number" }
            },
            required: ["min_salary", "max_salary"]
        }
    },
    required: [
        "job_title",
        "company_name",
        "location",
        "employment_type",
        "job_description",
        "responsibilities",
        "qualifications",
        "skills_analysis",
        "salary_range"
    ]
}

export default jobDescriptionSchema;