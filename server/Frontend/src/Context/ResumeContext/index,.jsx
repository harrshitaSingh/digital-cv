import { createContext, useEffect, useState } from "react";

import resumeData from "../../../src/Configs/ResumConfig/config.json";

export const ResumeContext = createContext();

//Add comments Here

const ResumeProvider = ({ children }) => {
    const [resumes, setResumes] = useState([]);
    const [loading , setLoading] = useState(false)

    /**
     * @name fetchResume
     * @description Fetches All the user resumes
     *
     * @returns {Array} The resume data Array.
     */
    function fetchResume() {
        return resumeData;
    }

    useEffect(() => {
        const fetchResumeData = fetchResume();
        setResumes(fetchResumeData);
    }, []);


    // Add comments here
    const updateResume = (resumeId, field, value) => {
        const clonedResume = structuredClone(resumes); // read about this 

        const updatedResume = clonedResume.map((resume) =>
            resume.id === resumeId ? { ...resume, [field]: value } : resume
        );

        setResumes(updatedResume);
    };


    // Add comments
    // const AddResume = () => {

    // }

    // Add comments 
    // const deleteResume = () => { 
        
    // }

    return (
        <ResumeContext.Provider value={{ resumes, updateResume, setResumes, loading , setLoading }}>
            {children}
        </ResumeContext.Provider>
    );
};
export default ResumeProvider;
