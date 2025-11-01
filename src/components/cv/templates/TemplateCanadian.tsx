import { CvData } from '@/types';
import React from 'react';

interface TemplateCanadianProps {
  data: CvData;
}

// CV Canadian: تصميم سيرة ذاتية متوافقة مع أنظمة الفلترة الخاصة بالشركات الدولية.
// (Canadian CV: A CV design compatible with the filtering systems of international companies.)
// Note: Canadian resumes are typically ATS-friendly, avoiding photos, and personal details like age/nationality.
export const TemplateCanadian: React.FC<TemplateCanadianProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="bg-white text-gray-800 p-10 printable-area font-['Calibri',_sans-serif] text-sm">
      <header className="text-center mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-4xl font-bold tracking-tight">{personalInfo.name}</h1>
        <div className="flex justify-center items-center space-x-3 text-xs text-gray-600 mt-2">
          <span>{personalInfo.address}</span>
          <span>&bull;</span>
          <span>{personalInfo.phone}</span>
          <span>&bull;</span>
          <span>{personalInfo.email}</span>
          {personalInfo.linkedin && <><span>&bull;</span><span>linkedin.com/in/{personalInfo.linkedin}</span></>}
          {personalInfo.website && <><span>&bull;</span><span>{personalInfo.website}</span></>}
        </div>
      </header>

      <section className="mb-5">
        <h2 className="section-title">SUMMARY</h2>
        <p className="leading-normal">{summary}</p>
      </section>

      <section className="mb-5">
        <h2 className="section-title">PROFESSIONAL EXPERIENCE</h2>
        {experience.map((exp, index) => (
          <div key={exp.id || index} className="mb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base">{exp.company}</h3>
              <span className="text-xs font-medium">{exp.startDate} - {exp.endDate}</span>
            </div>
            <div className="flex justify-between items-center italic">
              <span>{exp.jobTitle}</span>
              <span className="text-xs">{exp.location}</span>
            </div>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {exp.description.split('\\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-5">
        <h2 className="section-title">EDUCATION</h2>
        {education.map((edu, index) => (
          <div key={edu.id || index} className="mb-2">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-base">{edu.degree}, {edu.institution}</h3>
                <span className="text-xs font-medium">{edu.graduationDate}</span>
            </div>
             <p className="italic text-xs">{edu.location}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="section-title">KEY SKILLS</h2>
        <p className="leading-normal">
          {skills.map((skill) => skill.name).join(' | ')}
        </p>
      </section>
      
      <style jsx>{`
        .section-title {
          font-size: 0.875rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid #d1d5db;
          padding-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
};
