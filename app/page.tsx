import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Impact } from '@/components/Impact';
import { SelectedWork } from '@/components/SelectedWork';
import { LifecycleOps } from '@/components/LifecycleOps';
import { Capabilities } from '@/components/Capabilities';
import { Recognition } from '@/components/Recognition';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Impact />
        <SelectedWork />
        <LifecycleOps />
        <Capabilities />
        <Recognition />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
