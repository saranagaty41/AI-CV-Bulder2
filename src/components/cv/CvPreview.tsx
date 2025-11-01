'use client';

import React, { useRef, useState } from 'react';
import { CvData } from '@/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { TemplateATS } from './templates/TemplateATS';
import { TemplateBilingual } from './templates/TemplateBilingual';
import { TemplateCanadian } from './templates/TemplateCanadian';
import { TemplateEuropass } from './templates/TemplateEuropass';
import { TemplateStandard } from './templates/TemplateStandard';

interface CvPreviewProps {
  data: CvData | null;
}

type Template = 'bilingual' | 'canadian' | 'europass' | 'standard' | 'ats';

const templateConfig = {
  bilingual: { name: 'Bilingual', component: TemplateBilingual },
  canadian: { name: 'Canadian', component: TemplateCanadian },
  europass: { name: 'Europass', component: TemplateEuropass },
  standard: { name: 'Standard', component: TemplateStandard },
  ats: { name: 'ATS', component: TemplateATS },
};

export const CvPreview: React.FC<CvPreviewProps> = ({ data }) => {
  const [activeTemplate, setActiveTemplate] = useState<Template>('standard');
  const [isDownloading, setIsDownloading] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!printableRef.current) return;
    setIsDownloading(true);
    try {
        const canvas = await html2canvas(printableRef.current, {
            scale: 2,
            useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        
        const width = pdfWidth;
        const height = width / ratio;

        if (height > pdfHeight) {
            console.warn("CV content might be too long for a single PDF page.");
        }

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(`${data?.personalInfo.name.replace(' ', '_') || 'CV'}_${activeTemplate}.pdf`);
    } catch (error) {
        console.error("Failed to download PDF", error);
    } finally {
        setIsDownloading(false);
    }
  };

  if (!data) {
    return (
        <div className="flex items-center justify-center h-full bg-secondary">
            <p className="text-muted-foreground">No CV data to display.</p>
        </div>
    );
  }

  const renderTemplate = () => {
    const TemplateComponent = templateConfig[activeTemplate].component;
    return <TemplateComponent data={data} />;
  };

  return (
    <div className="flex flex-col h-full bg-secondary">
      <div className="flex items-center justify-between p-4 border-b bg-card rounded-t-lg no-print flex-wrap gap-2">
        <Tabs value={activeTemplate} onValueChange={(value) => setActiveTemplate(value as Template)}>
          <TabsList className="h-auto flex-wrap">
            {Object.keys(templateConfig).map((key) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                {templateConfig[key as Template].name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Download PDF
        </Button>
      </div>
      <div className="flex-grow p-8 overflow-auto">
        <div ref={printableRef} className="mx-auto w-[210mm] bg-white shadow-lg printable-container">
           <Card className="shadow-none border-none">
              <CardContent className="p-0">
                   {renderTemplate()}
              </CardContent>
           </Card>
        </div>
      </div>
       <style jsx global>{`
        @media print {
          .printable-container {
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  );
};
