const ResumeSchema = {
  type: "object",
  properties: {
    basics: {
      type: "object",
      properties: {
        name: { type: "string" },
        label: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        location: {
          type: "object",
          properties: {
            city: { type: "string" },
            region: { type: "string" },
            countryCode: { type: "string" },
            postalCode: { type: "string" },
          },
          required: ["city", "countryCode"],
        },
        website: { type: "string" },
        profiles: {
          type: "array",
          items: {
            type: "object",
            properties: {
              network: { type: "string" },
              username: { type: "string" },
              url: { type: "string" },
            },
            required: ["network", "username"],
          },
        },
      },
      required: ["name", "email"],
    },
    summary: { type: "string" },
    workExperience: {
      type: "array",
      items: {
        type: "object",
        properties: {
          company: { type: "string" },
          position: { type: "string" },
          location: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          summary: { type: "string" },
          highlights: {
            type: "array",
            items: { type: "string" },
          },
          keywords: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["company", "position", "startDate"],
      },
    },
    education: {
      type: "array",
      items: {
        type: "object",
        properties: {
          institution: { type: "string" },
          area: { type: "string" },
          studyType: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          gpa: { type: "string" },
          courses: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["institution", "area", "studyType", "startDate"],
      },
    },
    skills: {
      type: "array",
      items: {
        type: "object",
        properties: {
          category: { type: "string" },
          keywords: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["category", "keywords"],
      },
    },
    projects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          summary: { type: "string" },
          technologies: {
            type: "array",
            items: { type: "string" },
          },
          highlights: {
            type: "array",
            items: { type: "string" },
          },
          url: { type: "string" },
          repository: { type: "string" },
        },
        required: ["name", "summary"],
      },
    },
    achievements: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          date: { type: "string" },
          description: { type: "string" },
          url: { type: "string" },
        },
        required: ["title", "description"],
      },
    },
    certifications: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          issuer: { type: "string" },
          date: { type: "string" },
          url: { type: "string" },
        },
        required: ["name", "issuer", "date"],
      },
    },
    languages: {
      type: "array",
      items: {
        type: "object",
        properties: {
          language: { type: "string" },
          fluency: { type: "string" },
        },
        required: ["language", "fluency"],
      },
    },
    interests: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          keywords: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["name"],
      },
    },
    references: {
      type: "array",
      items: {
        type: "object",
        properties: {
          note: { type: "string" },
        },
        required: ["note"],
      },
    },
  },
  required: ["basics", "summary", "workExperience", "education", "skills"],
};

export default ResumeSchema;
