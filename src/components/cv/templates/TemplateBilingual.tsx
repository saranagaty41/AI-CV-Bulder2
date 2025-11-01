import { CvData } from '@/types';
import React from 'react';

interface TemplateBilingualProps {
  data: CvData;
}

// CV Bilingual: تصميم سيرة ذاتية مزدوجة اللغة بتنسيق منظم وواضح لسهولة الفهم باللغتين
// (Bilingual CV: A bilingual CV design with a clear and organized format for easy understanding in both languages.)
export const TemplateBilingual: React.FC<TemplateBilingualProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="bg-white text-gray-800 p-8 printable-area font-sans text-sm">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
        <p className="text-md text-gray-600">{personalInfo.jobTitle}</p>
        <div className="flex justify-center items-center space-x-4 text-xs mt-2 text-gray-500">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.address}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column (e.g., English) */}
        <div>
          <section className="mb-6">
            <h2 className="section-title">Summary</h2>
            <p className="leading-relaxed text-gray-700">{summary}</p>
          </section>

          <section className="mb-6">
            <h2 className="section-title">Experience</h2>
            {experience.map((exp, index) => (
              <div key={exp.id || index} className="mb-4">
                <h3 className="font-semibold">{exp.jobTitle}</h3>
                <p className="text-sm italic">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                <p className="mt-1 text-xs whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </section>

          <section className="mb-6">
            <h2 className="section-title">Education</h2>
            {education.map((edu, index) => (
              <div key={edu.id || index} className="mb-2">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm italic">{edu.institution}</p>
                <p className="text-xs text-gray-500">{edu.graduationDate}</p>
              </div>
            ))}
          </section>

           <section>
            <h2 className="section-title">Skills</h2>
            <p className="text-xs leading-relaxed">{skills.map(s => s.name).join(' | ')}</p>
          </section>
        </div>

        {/* Right Column (e.g., Arabic) */}
        <div dir="rtl">
          <section className="mb-6">
            <h2 className="section-title-ar">الملخص</h2>
            <p className="leading-relaxed text-gray-700">{summary}</p>
          </section>

          <section className="mb-6">
            <h2 className="section-title-ar">الخبرة العملية</h2>
            {experience.map((exp, index) => (
              <div key={exp.id || index} className="mb-4">
                <h3 className="font-semibold">{exp.jobTitle}</h3>
                <p className="text-sm italic">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                <p className="mt-1 text-xs whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </section>

          <section className="mb-6">
            <h2 className="section-title-ar">التعليم</h2>
            {education.map((edu, index) => (
              <div key={edu.id || index} className="mb-2">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm italic">{edu.institution}</p>
                <p className="text-xs text-gray-500">{edu.graduationDate}</p>
              </div>
            ))}
          </section>
          
          <section>
            <h2 className="section-title-ar">المهارات</h2>
            <p className="text-xs leading-relaxed">{skills.map(s => s.name).join(' | ')}</p>
          </section>
        </div>
      </div>
      <style jsx>{`
        .section-title {
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          padding-bottom: 0.25rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .section-title-ar {
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          padding-bottom: 0.25rem;
          border-bottom: 1px solid #e5e7eb;
          text-align: right;
        }
      `}</style>
    </div>
  );
};
