import { CvData } from '@/types';
import { Mail, Phone, Linkedin, Globe, MapPin, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface TemplateStandardProps {
  data: CvData;
}

// CV Standard: سير ذاتية بتنسيق بسيط مع صورة وألوان لجذب الانتباه.
// (Standard CV: Resumes in a simple format with a photo and colors to attract attention.)
export const TemplateStandard: React.FC<TemplateStandardProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="bg-white text-gray-800 flex printable-area font-sans text-sm">
      <aside className="w-1/3 bg-slate-50 p-6 text-slate-800">
        <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-slate-200 mb-4 flex items-center justify-center overflow-hidden">
              {personalInfo.photoUrl ? (
                <Image src={personalInfo.photoUrl} alt={personalInfo.name} width={128} height={128} className="object-cover w-full h-full" />
              ) : (
                <User className="w-16 h-16 text-slate-400" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-headline">{personalInfo.name}</h1>
            <p className="text-md text-teal-600 mt-1">{personalInfo.jobTitle}</p>
        </div>
        
        <div className="mt-8 space-y-3">
          <h2 className="section-title-side">CONTACT</h2>
          {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} className="text-teal-600" /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} className="text-teal-600" /> {personalInfo.phone}</div>}
          {personalInfo.address && <div className="flex items-center gap-2"><MapPin size={14} className="text-teal-600" /> {personalInfo.address}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={14} className="text-teal-600" /> {personalInfo.linkedin}</div>}
          {personalInfo.website && <div className="flex items-center gap-2"><Globe size={14} className="text-teal-600" /> {personalInfo.website}</div>}
        </div>

        <div className="mt-8">
            <h2 className="section-title-side">SKILLS</h2>
            <ul className="mt-2 space-y-1">
                {skills.map((skill) => (
                    <li key={skill.id} className="text-slate-700">{skill.name}</li>
                ))}
            </ul>
        </div>

        <div className="mt-8">
            <h2 className="section-title-side">EDUCATION</h2>
            {education.map((edu) => (
                <div key={edu.id} className="mt-2">
                    <h3 className="font-semibold text-slate-800">{edu.degree}</h3>
                    <p className="text-xs">{edu.institution}</p>
                    <p className="text-xs text-slate-500">{edu.location} | {edu.graduationDate}</p>
                </div>
            ))}
        </div>
      </aside>
      
      <main className="w-2/3 p-8">
        <section>
          <h2 className="section-title-main">SUMMARY</h2>
          <p className="leading-relaxed text-slate-600">{summary}</p>
        </section>
        
        <section>
          <h2 className="section-title-main">EXPERIENCE</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                <div className="text-xs text-slate-500 font-medium">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="flex justify-between items-baseline text-sm">
                <p className="font-semibold text-teal-700">{exp.company}</p>
                <p className="text-xs text-slate-500">{exp.location}</p>
              </div>
              <ul className="mt-2 text-slate-600 leading-snug space-y-1 list-disc pl-4">
                {exp.description.split('\\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </section>
      </main>
      <style jsx>{`
        .section-title-main {
          font-size: 1.2rem;
          font-weight: bold;
          color: #0d9488; /* teal-600 */
          margin-bottom: 0.75rem;
          margin-top: 1.5rem;
          padding-bottom: 0.25rem;
          border-bottom: 2px solid #0d9488;
          font-family: 'Space Grotesk', sans-serif;
          text-transform: uppercase;
        }
        .section-title-side {
          font-size: 1rem;
          font-weight: bold;
          color: #0d9488;
          margin-bottom: 0.75rem;
          font-family: 'Space Grotesk', sans-serif;
          text-transform: uppercase;
        }
        main > section:first-child .section-title-main {
          margin-top: 0;
        }
      `}</style>
    </div>
  );
};
