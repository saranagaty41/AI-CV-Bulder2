'use client';
import { Suspense } from 'react';
import { SignupForm } from '@/components/auth/SignupForm';

function SignupPageContent() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}

export default function SignupPage() {
  return <SignupPageContent />;
}
