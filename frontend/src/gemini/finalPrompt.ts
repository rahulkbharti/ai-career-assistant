import type { JobDescription } from "../schema/types/jd.types";
import type { ResumeSchema } from "../schema/types/resume.types";

const JobPrompt = (jd: JobDescription) => {
  const prompt = `
# ${jd.jobTitle}

**Company:** ${jd.companyName}  
**Location:** ${jd.location}  
**Job Type:** ${jd.jobType}

## Job Summary
${jd.jobSummary}



## Keywords
${jd.keywords.join(", ")}

## Technical Skills
**Must Have:**  :
${jd.technicalSkills.mustHave.map((skill) => `${skill}, `)}

**Nice to Have:** : 
${jd.technicalSkills.niceToHave.map((skill) => `${skill}, `)}



## Core Responsibilities
${jd.coreResponsibilities.map((item) => `- ${item}`).join("\n")}

## Required Qualifications
${jd.qualifications.required.map((item) => `- ${item}`).join("\n")}

${
  jd.qualifications.preferred.length > 0
    ? `## Preferred Qualifications\n${jd.qualifications.preferred
        .map((item) => `- ${item}`)
        .join("\n")}\n`
    : ""
}


`;
  return prompt;
};

const ResumePrompt = (Resume: ResumeSchema) => {
  const prompt = `
## BASIC DETAILS
**Name:** ${Resume.basics.name} \n
**Summary:** ${Resume.summary} \n

## EDUCATIONS
${Resume.education
  .map(
    (edu) => `
### ${edu.institution}
 ${edu.studyType} in ${edu.area} (CGPA ${edu.gpa}) -  (${edu.startDate} to ${edu.endDate})
`
  )
  .join("\n")}


## SKILLS
${Resume.skills
  .map(
    (skill) => `
**${skill.category}** : ${skill.keywords.join(", ")} 
`
  )
  .join("\n")}

## WORK EXPERIENCES
${Resume.workExperience
  .map(
    (exp) => `
### ${exp.company} - ${exp.location}  - (${exp.startDate} to ${exp.endDate})
${exp.position}
- ${exp.highlights.join("\n- ")}
`
  )
  .join("\n")}


## PROJECTS
${Resume.projects
  .map(
    (project) => `
### ${project.name}
${project.summary}
Github ${project.url}
- ${project.highlights.map((h) => h).join("\n- ")}
- Technologies Used: ${project.technologies.join(", ")}
`
  )
  .join("\n")}

## ACHIEVEMENTS 
${Resume.achievements.map((a) => `- ${a.title}: ${a.description}`).join("\n")}

`;
  return prompt;
};

const Analyse_Promt = (jd: JobDescription, Resume: ResumeSchema) => () => {
  const jobPrompt = JobPrompt(jd);
  const resumePrompt = ResumePrompt(Resume);
  return `
   ${jobPrompt}\n\n${resumePrompt}
   `;
};

export default Analyse_Promt;
