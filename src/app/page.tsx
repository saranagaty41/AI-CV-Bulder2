'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Download, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Logo } from '@/components/common/Logo';

const features = [
  {
    icon: <Bot className="w-6 h-6" />,
    name: 'AI-Powered CV Generation',
    description: 'Describe your experience and let our AI craft a professional CV draft for you in seconds.',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    name: 'Professional Templates',
    description: 'Choose from a selection of modern, ATS-friendly templates and switch between them instantly.',
  },
  {
    icon: <Download className="w-6 h-6" />,
    name: 'PDF Downloads',
    description: 'Download a pixel-perfect PDF of your resume, ready to be sent to recruiters.',
  },
];

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || user) {
     return (
       <div className="flex h-screen w-full items-center justify-center">
         <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
       </div>
     );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Logo />
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container pt-16 pb-24 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight font-headline lg:text-6xl bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Craft Your Future, Faster.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            Build your perfect, ATS-friendly resume with the power of AI. Go
            from prompt to professional in minutes.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">
                Create Your CV Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
        <section className="container">
          <div className="relative rounded-xl overflow-hidden border shadow-lg">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={800}
                className="w-full"
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        </section>
        <section className="container py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
              Everything You Need to Get Hired
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our tools are designed to give you a competitive edge in today's job market.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3 lg:gap-x-12">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center text-center p-6 border rounded-lg bg-card shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-7 font-headline">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="container py-8">
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ResumeCraft AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
