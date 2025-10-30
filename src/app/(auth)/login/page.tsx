'use client';
import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

function LoginPageContent() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

export default function LoginPage() {
  return <LoginPageContent />;
}
