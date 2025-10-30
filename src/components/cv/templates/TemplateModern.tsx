import { CvData } from '@/types';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';
import React from 'react';

interface TemplateModernProps {
  data: CvData;
}

export const TemplateModern: React.FC<TemplateModernProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="bg-white text-gray-800 flex printable-area font-sans text-sm">
      <aside className="w-1/3 bg-gray-100 p-6 text-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 font-headline">{personalInfo.name}</h1>
        <p className="text-md text-primary mt-1">{personalInfo.jobTitle}</p>
        
        <div className="mt-8 space-y-4">
          <h2 className="section-title-side">Contact</h2>
          {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} className="text-primary" /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} className="text-primary" /> {personalInfo.phone}</div>}
          {personalInfo.address && <div className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> {personalInfo.address}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={14} className="text-primary" /> {personalInfo.linkedin}</div>}
          {personalInfo.website && <div className="flex items-center gap-2"><Globe size={14} className="text-primary" /> {personalInfo.website}</div>}
        </div>

        <div className="mt-8">
            <h2 className="section-title-side">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                    <span key={skill.id || index} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {skill.name}
                    </span>
                ))}
            </div>
        </div>

        <div className="mt-8">
            <h2 className="section-title-side">Education</h2>
            {education.map((edu, index) => (
                <div key={edu.id || index} className="mt-2">
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-xs">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.location} | {edu.graduationDate}</p>
                </div>
            ))}
        </div>
      </aside>
      
      <main className="w-2/3 p-8">
        <section>
          <h2 className="section-title-main">Summary</h2>
          <p className="leading-relaxed text-gray-600">{summary}</p>
        </section>
        
        <section>
          <h2 className="section-title-main">Experience</h2>
          {experience.map((exp, index) => (
            <div key={exp.id || index} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                <div className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="flex justify-between items-baseline text-sm">
                <p className="font-semibold text-primary">{exp.company}</p>
                <p className="text-xs text-gray-500">{exp.location}</p>
              </div>
              <p className="mt-2 text-gray-600 leading-snug whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </section>
      </main>
      <style jsx>{`
        .section-title-main {
          font-size: 1.25rem;
          font-weight: bold;
          color: #16a34a; /* A green color from the gradient */
          margin-bottom: 0.75rem;
          margin-top: 1.5rem;
          padding-bottom: 0.25rem;
          border-bottom: 2px solid #16a34a;
          font-family: 'Space Grotesk', sans-serif;
        }
        .section-title-side {
          font-size: 1.1rem;
          font-weight: bold;
          color: #16a34a;
          margin-bottom: 0.75rem;
          font-family: 'Space Grotesk', sans-serif;
        }
        main > section:first-child .section-title-main,
        aside > div:first-of-type .section-title-side {
          margin-top: 0;
        }
      `}</style>
    </div>
  );
};
