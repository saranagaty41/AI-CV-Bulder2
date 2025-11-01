import { CvData } from '@/types';
import { Mail, Phone, Globe, MapPin, Linkedin, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface TemplateEuropassProps {
  data: CvData;
}

// CV Europass: تنسيق مخصص للوظائف الأوروبية.
// (Europass CV: A custom format for European jobs.)
export const TemplateEuropass: React.FC<TemplateEuropassProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="bg-white text-[#333] p-0 printable-area font-['Arial',_sans-serif]">
        <div className="flex">
            {/* Left Blue Column */}
            <div className="w-1/3 bg-[#1B4E8D] text-white p-6">
                <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-gray-300 mx-auto rounded-full mb-4 flex items-center justify-center overflow-hidden">
                        {personalInfo.photoUrl ? (
                            <Image src={personalInfo.photoUrl} alt={personalInfo.name} width={96} height={96} className="object-cover w-full h-full" />
                        ) : (
                            <User className="w-12 h-12 text-gray-500" />
                        )}
                    </div>
                    <h1 className="text-2xl font-light uppercase tracking-wider">{personalInfo.name}</h1>
                </div>

                <h2 className="section-title-side">Contact</h2>
                <div className="space-y-2 text-xs">
                    {personalInfo.address && <div className="flex items-start gap-2"><MapPin size={14} className="mt-0.5"/>{personalInfo.address}</div>}
                    {personalInfo.phone && <div className="flex items-start gap-2"><Phone size={14} className="mt-0.5"/>{personalInfo.phone}</div>}
                    {personalInfo.email && <div className="flex items-start gap-2"><Mail size={14} className="mt-0.5"/>{personalInfo.email}</div>}
                    {personalInfo.website && <div className="flex items-start gap-2"><Globe size={14} className="mt-0.5"/>{personalInfo.website}</div>}
                    {personalInfo.linkedin && <div className="flex items-start gap-2"><Linkedin size={14} className="mt-0.5"/>{`linkedin.com/in/${personalInfo.linkedin}`}</div>}
                </div>

                <h2 className="section-title-side mt-6">Skills</h2>
                <ul className="list-disc list-inside text-xs space-y-1">
                    {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                </ul>

            </div>

            {/* Right White Column */}
            <div className="w-2/3 p-8">
                <div className="flex items-center mb-8">
                    <div className="w-16 h-16 mr-4">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#1B4E8D" d="M2,2 L98,2 L98,98 L2,98 Z" />
                            <path fill="white" d="M10,10 L90,10 L90,90 L10,90 Z" />
                            <path fill="#1B4E8D" d="M18,18 L82,18 L82,82 L18,82 Z" />
                            <path fill="white" d="M26,26 L74,26 L74,74 L26,74 Z" />
                        </svg>
                    </div>
                     <div>
                        <h1 className="text-3xl font-light uppercase tracking-wider text-[#1B4E8D]">Curriculum Vitae</h1>
                        <p className="text-lg font-light text-[#1B4E8D]">Europass</p>
                    </div>
                </div>

                 <section className="mb-6">
                    <h2 className="section-title-main">Job Applied For</h2>
                    <p className="text-lg font-semibold">{personalInfo.jobTitle}</p>
                </section>

                <section className="mb-6">
                    <h2 className="section-title-main">Personal Statement</h2>
                    <p className="text-sm leading-relaxed">{summary}</p>
                </section>

                <section className="mb-6">
                    <h2 className="section-title-main">Work Experience</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="grid grid-cols-[120px_1fr] gap-x-4 mb-4 text-sm">
                            <div className="font-semibold">{exp.startDate} - {exp.endDate}</div>
                            <div>
                                <p className="font-bold">{exp.jobTitle}</p>
                                <p>{exp.company}, {exp.location}</p>
                                <ul className="list-disc list-inside mt-1 text-xs">
                                     {exp.description.split('\\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                </ul>
                            </div>
                        </div>
                    ))}
                </section>

                <section>
                    <h2 className="section-title-main">Education and Training</h2>
                    {education.map(edu => (
                         <div key={edu.id} className="grid grid-cols-[120px_1fr] gap-x-4 mb-3 text-sm">
                            <div className="font-semibold">{edu.graduationDate}</div>
                            <div>
                                <p className="font-bold">{edu.degree}</p>
                                <p>{edu.institution}, {edu.location}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>

        <style jsx>{`
            .section-title-side {
                font-size: 1rem;
                font-weight: 300; /* light */
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-top: 1.5rem;
                margin-bottom: 0.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.5);
                padding-bottom: 0.25rem;
            }
            .section-title-main {
                font-size: 1.1rem;
                font-weight: 300; /* light */
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #1B4E8D;
                margin-bottom: 0.75rem;
                border-bottom: 1px solid #1B4E8D;
                padding-bottom: 0.25rem;
            }
        `}</style>
    </div>
  );
};
