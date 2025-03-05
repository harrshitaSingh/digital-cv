import { createContext, useEffect, useState } from "react";

export const ResumeContext = createContext();

/**
 * @name decodeToken
 * @description Decodes a JWT token to extract the payload.
 * @param {string} token - The JWT token.
 * @returns {object|null} - Decoded token data or null if invalid.
 */
const decodeToken = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

const ResumeProvider = ({ children }) => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(false);

    /**
     * @name fetchResume
     * @description Fetches resumes that match the logged-in user's ID
     */
    const fetchResume = async () => {
        const token = localStorage.getItem("token");
        const userId = token ? decodeToken(token)?.id : null;

        if (!userId) {
            console.error("No userId found");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/resume/yourProj", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setResumes(data);
        } catch (error) {
            console.error("Error fetching resumes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResume();
    }, []); 

    /**
     * @name updateResume
     * @description Updates a specific resume field by ID
     * @param {string} resumeId - ID of the resume to update
     * @param {string} field - The field to update
     * @param {any} value - The new value for the field
     */
    const updateResume = (resumeId, field, value) => {
        const updatedResume = resumes.map((resume) =>
            resume.id === resumeId ? { ...resume, [field]: value } : resume
        );
        setResumes(updatedResume);
    };

    return (
        <ResumeContext.Provider value={{ resumes, updateResume, setResumes, loading, setLoading }}>
            {children}
        </ResumeContext.Provider>
    );
};

export default ResumeProvider;
