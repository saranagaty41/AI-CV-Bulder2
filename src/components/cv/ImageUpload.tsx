'use client';

import { Loader2, Trash2, Upload, User } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  value?: string;
  onChange: (value?: string) => void;
}

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    // Check file size (e.g., limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
        toast({
            variant: 'destructive',
            title: 'File too large',
            description: 'Please upload an image smaller than 2MB.',
        });
        return;
    }

    setUploading(true);

    try {
      const base64 = await toBase64(file);
      onChange(base64);
      toast({ title: 'Image Selected', description: 'Your profile photo is ready to be saved.' });

    } catch (error: any) {
      console.error('Error converting image to Base64:', error);
      toast({ variant: 'destructive', title: 'Upload Failed', description: 'Could not process the image.' });
    } finally {
      setUploading(false);
       // Reset file input
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = async () => {
    onChange('');
    toast({ title: 'Image Removed' });
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          {value ? (
            <Image src={value} alt="Profile Photo" width={96} height={96} className="object-cover h-full w-full" />
          ) : (
            <User className="w-12 h-12 text-muted-foreground" />
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          disabled={uploading}
          accept="image/png, image/jpeg"
          className="hidden"
        />
        <div className="flex flex-col gap-2">
            <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
            >
                {uploading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Upload className="mr-2 h-4 w-4" />
                )}
                Upload
            </Button>
            {value && (
                <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleRemove}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                </Button>
            )}
        </div>
      </div>
    </div>
  );
};
