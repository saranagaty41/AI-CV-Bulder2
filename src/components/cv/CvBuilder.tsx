'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CvData } from '@/types';
import { CvForm } from './CvForm';
import { CvPreview } from './CvPreview';
import { AtsOptimizer } from './AtsOptimizer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useDebounce } from '@/hooks/use-debounce';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';

const initialCvData: CvData = {
  personalInfo: {
    name: 'John Doe',
    jobTitle: 'Software Engineer',
    email: 'john.doe@email.com',
    phone: '123-456-7890',
    address: 'City, Country',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.dev',
  },
  summary: 'A passionate software engineer with a knack for creating elegant and efficient solutions.',
  experience: [
    { id: '1', jobTitle: 'Senior Developer', company: 'Tech Corp', location: 'San Francisco, CA', startDate: 'Jan 2020', endDate: 'Present', description: '- Building cool stuff with React and Node.js.\\n- Mentoring junior developers.' },
  ],
  education: [
    { id: '1', degree: 'B.S. in Computer Science', institution: 'State University', location: 'City, ST', graduationDate: 'May 2019' },
  ],
  skills: [
    { id: '1', name: 'JavaScript' },
    { id: '2', name: 'React' },
    { id: '3', name: 'Node.js' },
  ],
};

const CV_TABLE = 'cvs';

export default function CvBuilder() {
  const [cvData, setCvData] = useState<CvData>(initialCvData);
  const [currentCvText, setCurrentCvText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const debouncedCvData = useDebounce(cvData, 1500);

  useEffect(() => {
    if (user) {
      const loadData = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
          .from(CV_TABLE)
          .select('data')
          .eq('user_id', user.id)
          .single();
        
        if (data) {
          const loadedData = data.data as CvData;
          setCvData(loadedData);
          setCurrentCvText(JSON.stringify(loadedData, null, 2));
        } else if (error && error.code !== 'PGRST116') { // PGRST116: no rows found
          console.error("Error loading CV data:", error.message || JSON.stringify(error));
        }
        setIsLoading(false);
      };
      loadData();
    }
  }, [user]);

  const saveCvData = useCallback(async (userId: string, data: CvData) => {
    try {
      const { error } = await supabase
        .from(CV_TABLE)
        .upsert({ user_id: userId, data: data }, { onConflict: 'user_id' });
      
      if (error) throw error;
      
      toast({ title: 'Saved!', description: 'Your CV has been auto-saved.' });
    } catch (err: any) {
      console.error("Error saving CV data:", err.message || JSON.stringify(err));
      toast({ variant: 'destructive', title: 'Save failed', description: 'Could not save your CV data.' });
    }
  }, [toast]);


  useEffect(() => {
    if (user && !isLoading && debouncedCvData !== initialCvData) {
      saveCvData(user.id, debouncedCvData);
    }
  }, [debouncedCvData, user, isLoading, saveCvData]);


  const handleDataChange = useCallback((newData: CvData) => {
    setCvData(newData);
    setCurrentCvText(JSON.stringify(newData, null, 2));
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-56px)] w-full items-center justify-center">
         <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.5fr] h-[calc(100vh-57px)]">
      <div className="overflow-y-auto p-6 bg-card border-r">
        <Tabs defaultValue="editor">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="editor"><Edit className="mr-2 h-4 w-4"/> Editor</TabsTrigger>
            <TabsTrigger value="optimizer"><Sparkles className="mr-2 h-4 w-4"/>ATS Optimizer</TabsTrigger>
          </TabsList>
          <TabsContent value="editor">
            <CvForm initialData={cvData} onDataChange={handleDataChange} />
          </TabsContent>
          <TabsContent value="optimizer">
            <AtsOptimizer currentCvText={currentCvText} />
          </TabsContent>
        </Tabs>
      </div>
      <div className="overflow-hidden">
        <CvPreview data={cvData} />
      </div>
    </div>
  );
}
