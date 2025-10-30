import { FileText } from 'lucide-react';
import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-primary/10 rounded-lg">
        <FileText className="w-5 h-5 text-primary" />
      </div>
      <span className="font-headline text-lg font-semibold text-foreground">
        ResumeCraft AI
      </span>
    </div>
  );
}
