import { CvData } from '@/types';
import React from 'react';

interface TemplateATSProps {
  data: CvData;
}

// CV ATS: تصميم سيرة ذاتية متوافقة مع أنظمة الفلترة الخاصة بالشركات الدولية.
// (ATS CV: A CV design compatible with the filtering systems of international companies.)
export const TemplateATS: React.FC<TemplateATSProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="bg-white text-gray-900 p-8 printable-area font-sans text-base">
      <header className="text-left mb-6">
        <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
        <p className="text-lg text-gray-700">{personalInfo.jobTitle}</p>
        <div className="text-sm text-gray-600 mt-2">
          <span>{personalInfo.phone}</span> | <span>{personalInfo.email}</span> | <span>{personalInfo.address}</span>
          {personalInfo.linkedin && ` | linkedin.com/in/${personalInfo.linkedin}`}
          {personalInfo.website && ` | ${personalInfo.website}`}
        </div>
      </header>

      <section className="mb-6">
        <h2 className="section-title">PROFESSIONAL SUMMARY</h2>
        <p className="text-gray-700 leading-normal">{summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="section-title">SKILLS</h2>
        <p className="text-gray-700 leading-normal">
            {skills.map(skill => skill.name).join(', ')}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="section-title">EXPERIENCE</h2>
        {experience.map((exp, index) => (
          <div key={exp.id || index} className="mb-4">
            <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
            <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{exp.company} | {exp.location}</span>
                <span>{exp.startDate} - {exp.endDate}</span>
            </div>
            <ul className="list-disc list-inside mt-1 text-gray-700 space-y-1">
                {exp.description.split('\\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2 className="section-title">EDUCATION</h2>
        {education.map((edu, index) => (
          <div key={edu.id || index} className="mb-2">
            <h3 className="text-lg font-semibold">{edu.degree}</h3>
            <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{edu.institution}, {edu.location}</span>
                <span>{edu.graduationDate}</span>
            </div>
          </div>
        ))}
      </section>
      
      <style jsx>{`
        .section-title {
          font-size: 1rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          margin-top: 1rem;
          border-bottom: 2px solid #000000;
          padding-bottom: 0.25rem;
        }
        ul {
          padding-left: 1rem;
        }
      `}</style>
    </div>
  );
};
