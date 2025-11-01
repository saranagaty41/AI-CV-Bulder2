'use client';

import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/auth-context';
import { Loader2, Trash2, Upload, User } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  value?: string;
  onChange: (value?: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Authentication Error', description: 'You must be logged in to upload images.' });
      return;
    }
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    setUploading(true);

    try {
      const { error: uploadError } = await supabase.storage.from('cv-assets').upload(filePath, file);
      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage.from('cv-assets').getPublicUrl(filePath);
      onChange(publicUrl);
      toast({ title: 'Image Uploaded', description: 'Your profile photo has been updated.' });

    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({ variant: 'destructive', title: 'Upload Failed', description: error.message });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    // The URL is in the format: .../storage/v1/object/public/cv-assets/avatars/user-id-timestamp.ext
    const filePath = 'avatars/' + value.split('/avatars/')[1];

    try {
      if (filePath) {
         await supabase.storage.from('cv-assets').remove([filePath]);
      }
      onChange('');
      toast({ title: 'Image Removed' });
    } catch (error: any) {
      console.error('Error removing image:', error);
      toast({ variant: 'destructive', title: 'Removal Failed', description: error.message });
    }
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
