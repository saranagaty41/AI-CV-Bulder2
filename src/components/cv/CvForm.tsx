'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CvData } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Bot, Loader2, PlusCircle, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateCvFromPrompt } from '@/ai/flows/generate-cv-from-prompt';

const personalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  address: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
});

const experienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().min(1, 'Description is required'),
});

const educationSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  location: z.string().optional(),
  graduationDate: z.string().min(1, 'Graduation date is required'),
});

const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Skill name is required'),
});

const cvSchema = z.object({
  personalInfo: personalInfoSchema,
  summary: z.string().min(1, 'Summary is required'),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
});

interface CvFormProps {
  initialData: CvData;
  onSave: (data: CvData) => Promise<void>;
  isSaving: boolean;
}

export const CvForm: React.FC<CvFormProps> = ({ initialData, onSave, isSaving }) => {
  const form = useForm<CvData>({
    resolver: zodResolver(cvSchema),
    // The form is initialized with the initialData prop.
    // It will not be re-initialized on subsequent renders unless initialData changes reference,
    // which we now control in the parent.
    defaultValues: initialData,
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control: form.control,
    name: "experience",
  });
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: "education",
  });
  const { fields: skillsFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: "skills",
  });
  
  // This effect ensures that if the user logs out and logs in as another user,
  // or if the initial data is loaded asynchronously, the form is reset with the new data.
  // It only runs when the initialData prop itself changes, not on every render.
  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateCv = async () => {
    if (!aiPrompt) {
        toast({
            variant: "destructive",
            title: "Prompt is empty",
            description: "Please enter a prompt to generate your CV.",
        });
        return;
    }
    setIsGenerating(true);
    try {
        const result = await generateCvFromPrompt({ prompt: aiPrompt });
        const currentData = form.getValues();
        // Update only the summary field with the AI-generated content
        const updatedData = { ...currentData, summary: result.cvDraft };
        form.reset(updatedData); // Reset the form with the new summary
        toast({
            title: "CV Draft Generated!",
            description: "Your summary has been updated. You can now edit the details.",
        });
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Generation Failed",
            description: error.message || "Could not generate CV from prompt.",
        });
    } finally {
        setIsGenerating(false);
    }
  };

  // The form's submit handler now calls the onSave prop passed from the parent.
  const handleFormSubmit = (data: CvData) => {
    onSave(data);
  };


  return (
    <Form {...form}>
      {/* 
        The onSubmit handler is now `form.handleSubmit(handleFormSubmit)`.
        `handleSubmit` is a react-hook-form utility that validates the form
        and then calls our `handleFormSubmit` function with the form data.
      */}
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <Accordion type="multiple" defaultValue={['ai-generator', 'personal-info']} className="w-full">
          <AccordionItem value="ai-generator">
            <AccordionTrigger className="font-headline text-lg">AI Assistant</AccordionTrigger>
            <AccordionContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Describe your ideal role, experience, and skills. Our AI will generate a professional summary to get you started.
                </p>
                <Textarea 
                    placeholder="e.g., 'A senior software engineer with 8 years of experience in full-stack development, specializing in React and Node.js...'"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                />
                <Button type="button" onClick={handleGenerateCv} disabled={isGenerating} className="w-full">
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                    Generate with AI
                </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="personal-info">
            <AccordionTrigger className="font-headline text-lg">Personal Information</AccordionTrigger>
            <AccordionContent className="space-y-4">
              {Object.keys(form.getValues().personalInfo).map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={`personalInfo.${key as keyof CvData['personalInfo']}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="summary">
            <AccordionTrigger className="font-headline text-lg">Summary</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormControl><Textarea className="min-h-[120px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          
          <DynamicFieldArray
            title="Experience"
            fields={experienceFields}
            control={form.control}
            name="experience"
            append={() => appendExperience({id: crypto.randomUUID(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: ''})}
            remove={removeExperience}
          />
          <DynamicFieldArray
            title="Education"
            fields={educationFields}
            control={form.control}
            name="education"
            append={() => appendEducation({id: crypto.randomUUID(), degree: '', institution: '', location: '', graduationDate: ''})}
            remove={removeEducation}
          />
          <DynamicFieldArray
            title="Skills"
            fields={skillsFields}
            control={form.control}
            name="skills"
            append={() => appendSkill({id: crypto.randomUUID(), name: ''})}
            remove={removeSkill}
          />
        </Accordion>
        <div className="sticky bottom-0 bg-card py-4 border-t border-border">
          <Button type="submit" disabled={isSaving} className="w-full">
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save CV
          </Button>
        </div>
      </form>
    </Form>
  );
};

interface DynamicFieldArrayProps {
    title: string;
    fields: any[];
    control: Control<CvData>;
    name: "experience" | "education" | "skills";
    append: () => void;
    remove: (index: number) => void;
}

const DynamicFieldArray: React.FC<DynamicFieldArrayProps> = ({ title, fields, control, name, append, remove }) => (
    <AccordionItem value={name}>
        <AccordionTrigger className="font-headline text-lg">{title}</AccordionTrigger>
        <AccordionContent className="space-y-6">
            {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    {Object.keys(field).filter(k => k !== 'id').map(prop => (
                        <FormField
                            key={prop}
                            control={control}
                            name={`${name}.${index}.${prop as any}`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="capitalize">{prop.replace(/([A-Z])/g, ' $1')}</FormLabel>
                                    <FormControl>
                                        {prop === 'description' ? <Textarea {...field} /> : <Input {...field} />}
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                            )}
                        />
                    ))}
                </div>
            ))}
            <Button type="button" variant="outline" onClick={append} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Add {title.slice(0, -1)}
            </Button>
        </AccordionContent>
    </AccordionItem>
);
