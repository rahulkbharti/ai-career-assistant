const JobAnalysisResult = {
    type: "object",
    properties: {
        job_role: { type: "string" },
        company_name: { type: "string" },
        skills_analysis: {
            type: "object",
            properties: {
                required: {
                    type: "array",
                    items: { type: "object", properties: { skill: { type: "string" }, match: { type: "boolean" } } }
                },
                preferred: {
                    type: "array",
                    items: { type: "object", properties: { skill: { type: "string" }, match: { type: "boolean" } } }
                },
                nicetohave: {
                    type: "array",
                    items: { type: "object", properties: { skill: { type: "string" }, match: { type: "boolean" } } }
                },
                missing: {
                    type: "array",
                    items: { type: "object", properties: { skill: { type: "string" }, match: { type: "boolean" } } }
                }
            }
        },
        gap_analysis: {
            type: "array",
            items: { type: "string" }
        },
        area_of_improvements: {
            type: "array",
            items: { type: "string" }
        },
        suggestions: {
            type: "array",
            items: { type: "object", properties: { actual: { type: "string" }, suggestion: { type: "string" } } }
        },
        recomendations: {
            type: "array",
            items: { type: "string" }
        }
    }
}
export default JobAnalysisResult;