import { useState, useEffect } from "react";
import { extractResumeInformation } from "../../../gemini/system.ts";
import { useDispatch } from "react-redux";
import { addResume as _addResume } from "../../../store/features/resumeSlice.ts";

export interface Resume {
  id: string;
  name: string;
  role: string;
  uploadDate: Date;
  file: File;
  content?: string; // Extracted text content for analysis
}

export interface SocialLink {
  platform: "linkedin" | "github" | "leetcode" | "hackerrank" | "portfolio";
  url: string;
  username: string;
  validated: boolean;
}

export interface ProfileData {
  resumes: Resume[];
  socialLinks: SocialLink[];
  skills: string[];
  experience: number; // years of experience
  preferredRoles: string[];
}

const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    resumes: [],
    socialLinks: [],
    skills: [],
    experience: 0,
    preferredRoles: [],
  });

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Convert string dates back to Date objects
        const resumesWithDates = parsedData.resumes.map((resume: any) => ({
          ...resume,
          uploadDate: new Date(resume.uploadDate),
        }));
        setProfileData({ ...parsedData, resumes: resumesWithDates });
      } catch (error) {
        console.error("Error parsing profile data:", error);
      }
    }
    setLoading(false);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("profileData", JSON.stringify(profileData));
    }
  }, [profileData, loading]);

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          const base64 = result.split(",")[1];
          if (base64) {
            resolve(base64); // Get only base64 part
          } else {
            reject(new Error("Failed to convert file to base64"));
          }
        } else {
          reject(new Error("FileReader result is not a string"));
        }
      };
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  const addResume = async (resume: Omit<Resume, "id">) => {
    try {
      const data_string: string = await fileToBase64(resume.file);
      const resume_data = await extractResumeInformation(data_string);
      const resume_json_data = JSON.parse(resume_data.response || "{}");
      dispatch(_addResume(resume_json_data));
    } catch (error) {
      console.error("Error extracting resume information:", error);
    }
    const newResume = {
      ...resume,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProfileData((prev) => ({
      ...prev,
      resumes: [...prev.resumes, newResume],
    }));
  };

  const removeResume = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      resumes: prev.resumes.filter((resume) => resume.id !== id),
    }));
  };

  const updateSocialLinks = (links: SocialLink[]) => {
    setProfileData((prev) => ({
      ...prev,
      socialLinks: links,
    }));
  };

  const updateSkills = (skills: string[]) => {
    setProfileData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const updateExperience = (experience: number) => {
    setProfileData((prev) => ({
      ...prev,
      experience,
    }));
  };

  const updatePreferredRoles = (roles: string[]) => {
    setProfileData((prev) => ({
      ...prev,
      preferredRoles: roles,
    }));
  };

  return {
    profileData,
    loading,
    addResume,
    removeResume,
    updateSocialLinks,
    updateSkills,
    updateExperience,
    updatePreferredRoles,
  };
};

export default useProfileData;
