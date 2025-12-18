import { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { LeftNav } from './LeftNav';
import { Footer } from './Footer';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <div className="flex flex-1">
        <LeftNav />
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
