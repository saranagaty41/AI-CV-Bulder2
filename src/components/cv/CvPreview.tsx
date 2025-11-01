'use client';

import React, { useRef, useState } from 'react';
import { CvData } from '@/types';
import { TemplateModern } from './templates/TemplateModern';
import { TemplateClassic } from './templates/TemplateClassic';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Monitor, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CvPreviewProps {
  data: CvData;
}

type Template = 'modern' | 'classic';

export const CvPreview: React.FC<CvPreviewProps> = ({ data }) => {
  const [activeTemplate, setActiveTemplate] = useState<Template>('modern');
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

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
        <Button onClick={handlePrint}>
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </div>
      <div className="flex-grow p-8 overflow-auto">
        {/* The ref is attached to the printable area */}
        <div ref={componentRef}>
            <Card className="mx-auto w-[210mm] shadow-lg print:shadow-none print:border-none">
               <CardContent className="p-0">
                    {renderTemplate()}
               </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};
