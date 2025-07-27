// frontend/src/pages/_app.tsx

import type { AppProps } from 'next/app';
import { Providers } from '../providers/providers';
import '../globals.css'; // global styles if any
import Header from '../components/header';
import Footer from '../components/footer';
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </Providers>
  );
}
