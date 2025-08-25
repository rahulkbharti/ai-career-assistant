import { Type } from "@google/genai";

const resumeSchema = {
  name: "resume_data",
  description: "A schema to structure the extracted details from a resume.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      basics: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          label: { type: Type.STRING },
          email: { type: Type.STRING },
          phone: { type: Type.STRING },
          location: {
            type: Type.OBJECT,
            properties: {
              city: { type: Type.STRING },
              region: { type: Type.STRING },
              countryCode: { type: Type.STRING },
              postalCode: { type: Type.STRING },
            },
            required: ["city", "region", "countryCode", "postalCode"],
          },
          website: { type: Type.STRING },
          profiles: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                network: { type: Type.STRING },
                username: { type: Type.STRING },
                url: { type: Type.STRING },
              },
              required: ["network", "username", "url"],
            },
          },
        },
        required: [
          "name",
          "label",
          "email",
          "phone",
          "location",
          "website",
          "profiles",
        ],
      },
      summary: { type: Type.STRING },
      workExperience: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            company: { type: Type.STRING },
            position: { type: Type.STRING },
            location: { type: Type.STRING },
            startDate: { type: Type.STRING },
            endDate: { type: Type.STRING },
            summary: { type: Type.STRING },
            highlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            "company",
            "position",
            "location",
            "startDate",
            "endDate",
            "summary",
            "highlights",
            "keywords",
          ],
        },
      },
      education: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            institution: { type: Type.STRING },
            area: { type: Type.STRING },
            studyType: { type: Type.STRING },
            startDate: { type: Type.STRING },
            endDate: { type: Type.STRING },
            gpa: { type: Type.STRING },
            courses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            "institution",
            "area",
            "studyType",
            "startDate",
            "endDate",
            "gpa",
            "courses",
          ],
        },
      },
      skills: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["category", "keywords"],
        },
      },
      projects: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            summary: { type: Type.STRING },
            technologies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            highlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            url: { type: Type.STRING },
            repository: { type: Type.STRING },
          },
          required: [
            "name",
            "summary",
            "technologies",
            "highlights",
            "url",
            "repository",
          ],
        },
      },
      achievements: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            date: { type: Type.STRING },
            description: { type: Type.STRING },
            url: { type: Type.STRING },
          },
          required: ["title", "date", "description", "url"],
        },
      },
      certifications: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            issuer: { type: Type.STRING },
            date: { type: Type.STRING },
            url: { type: Type.STRING },
          },
          required: ["name", "issuer", "date", "url"],
        },
      },
      languages: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            language: { type: Type.STRING },
            fluency: { type: Type.STRING },
          },
          required: ["language", "fluency"],
        },
      },
      interests: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["name", "keywords"],
        },
      },
      references: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            note: { type: Type.STRING },
          },
          required: ["note"],
        },
      },
    },
    required: [
      "basics",
      "summary",
      "workExperience",
      "education",
      "skills",
      "projects",
      "achievements",
      "certifications",
      "languages",
      "interests",
      "references",
    ],
  },
};

export default resumeSchema;
