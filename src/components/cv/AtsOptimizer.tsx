'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { optimizeCvForAts, OptimizeCvForAtsInput } from '@/ai/flows/optimize-cv-for-ats';
import { Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const atsSchema = z.object({
  cvContent: z.string().min(100, "CV content must be at least 100 characters."),
  jobDescription: z.string().min(50, "Job description must be at least 50 characters."),
});

type AtsFormValues = z.infer<typeof atsSchema>;

interface AtsOptimizerProps {
  currentCvText: string;
}

export const AtsOptimizer: React.FC<AtsOptimizerProps> = ({ currentCvText }) => {
  const [loading, setLoading] = useState(false);
  const [optimizedContent, setOptimizedContent] = useState('');
  const { toast } = useToast();

  const form = useForm<AtsFormValues>({
    resolver: zodResolver(atsSchema),
    defaultValues: {
      cvContent: currentCvText,
      jobDescription: '',
    },
  });

  React.useEffect(() => {
    form.setValue('cvContent', currentCvText);
  }, [currentCvText, form]);

  const onSubmit = async (data: AtsFormValues) => {
    setLoading(true);
    setOptimizedContent('');
    try {
      const input: OptimizeCvForAtsInput = {
        cvContent: data.cvContent,
        jobDescription: data.jobDescription,
      };
      const result = await optimizeCvForAts(input);
      setOptimizedContent(result.optimizedCvContent);
      toast({
        title: 'Optimization Complete!',
        description: 'Your CV has been optimized for ATS.',
      });
    } catch (error) {
      console.error('ATS Optimization failed', error);
      toast({
        variant: 'destructive',
        title: 'Optimization Failed',
        description: 'Could not optimize the CV. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="cvContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CV Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your current CV content here."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the job description you are applying for."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Optimize for ATS
          </Button>
        </form>
      </Form>
      {loading && (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">AI is working its magic...</p>
          </CardContent>
        </Card>
      )}
      {optimizedContent && (
        <Card>
          <CardContent className="p-6">
             <h3 className="font-headline text-lg mb-2">Optimized CV Content</h3>
             <Textarea readOnly value={optimizedContent} className="min-h-[300px] bg-secondary" />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
