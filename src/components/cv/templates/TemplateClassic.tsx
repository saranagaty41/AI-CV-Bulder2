import { CvData } from '@/types';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';
import React from 'react';

interface TemplateClassicProps {
  data: CvData;
}

export const TemplateClassic: React.FC<TemplateClassicProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="bg-white text-gray-800 p-8 printable-area font-serif text-sm">
      <header className="text-center mb-8 border-b pb-4">
        <h1 className="text-4xl font-bold tracking-wider uppercase">{personalInfo.name}</h1>
        <p className="text-lg text-gray-600 mt-1">{personalInfo.jobTitle}</p>
        <div className="flex justify-center items-center space-x-4 text-xs mt-4 text-gray-500">
          {personalInfo.email && <div className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</div>}
          {personalInfo.address && <div className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.address}</div>}
        </div>
        <div className="flex justify-center items-center space-x-4 text-xs mt-2 text-gray-500">
           {personalInfo.linkedin && <div className="flex items-center gap-1"><Linkedin size={12} /> {personalInfo.linkedin}</div>}
           {personalInfo.website && <div className="flex items-center gap-1"><Globe size={12} /> {personalInfo.website}</div>}
        </div>
      </header>

      <section>
        <h2 className="section-title">Summary</h2>
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </section>

      <section>
        <h2 className="section-title">Experience</h2>
        {experience.map((exp, index) => (
          <div key={exp.id || index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-base">{exp.jobTitle}</h3>
              <div className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</div>
            </div>
            <div className="flex justify-between items-baseline text-sm">
                <p className="italic text-gray-700">{exp.company}</p>
                <p className="text-xs text-gray-500">{exp.location}</p>
            </div>
            <p className="mt-2 text-gray-600 leading-snug whitespace-pre-wrap">{exp.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="section-title">Education</h2>
        {education.map((edu, index) => (
          <div key={edu.id || index} className="mb-2">
            <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">{edu.degree}</h3>
                <div className="text-xs text-gray-500">{edu.graduationDate}</div>
            </div>
             <div className="flex justify-between items-baseline text-sm">
                <p className="italic text-gray-700">{edu.institution}</p>
                <p className="text-xs text-gray-500">{edu.location}</p>
             </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="section-title">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={skill.id || index} className="text-sm text-gray-700">
              {skill.name}{index < skills.length - 1 ? ' •' : ''}
            </span>
          ))}
        </div>
      </section>
      <style jsx>{`
        .section-title {
          font-size: 1.125rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
          margin-top: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
};
