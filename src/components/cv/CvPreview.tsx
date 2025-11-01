'use client';

import React, { useRef, useState } from 'react';
import { CvData } from '@/types';
import { TemplateModern } from './templates/TemplateModern';
import { TemplateClassic } from './templates/TemplateClassic';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Monitor, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CvPreviewProps {
  data: CvData | null;
}

type Template = 'modern' | 'classic';

export const CvPreview: React.FC<CvPreviewProps> = ({ data }) => {
  const [activeTemplate, setActiveTemplate] = useState<Template>('modern');
  const [isDownloading, setIsDownloading] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!printableRef.current) return;
    setIsDownloading(true);
    try {
        const canvas = await html2canvas(printableRef.current, {
            scale: 2, // Higher scale for better quality
            useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');
        
        // A4 dimensions in mm: 210 x 297
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

        // If height exceeds page, we might need to handle multi-page,
        // but for a CV we assume it fits on one page.
        if (height > pdfHeight) {
            console.warn("CV content might be too long for a single PDF page.");
        }

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(`${data?.personalInfo.name.replace(' ', '_')}_CV.pdf`);
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
    switch (activeTemplate) {
      case 'modern':
        return <TemplateModern data={data} />;
      case 'classic':
        return <TemplateClassic data={data} />;
      default:
        return <TemplateModern data={data} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-secondary">
      <div className="flex items-center justify-between p-4 border-b bg-card rounded-t-lg no-print">
        <Tabs value={activeTemplate} onValueChange={(value) => setActiveTemplate(value as Template)}>
          <TabsList>
            <TabsTrigger value="modern" className="flex items-center gap-2">
              <Monitor size={16} /> Modern
            </TabsTrigger>
            <TabsTrigger value="classic" className="flex items-center gap-2">
              <BookOpen size={16} /> Classic
            </TabsTrigger>
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
        <div ref={printableRef} className="mx-auto w-[210mm] bg-white shadow-lg">
           <Card className="shadow-none border-none">
              <CardContent className="p-0">
                   {renderTemplate()}
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
};
