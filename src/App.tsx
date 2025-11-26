import { useState } from "react";
import { Hero } from "./components/Hero";
import { ForSoldiers } from "./components/ForSoldiers";
import { ForFamilies } from "./components/ForFamilies";
import { ForCitizens } from "./components/ForCitizens";
import { HowItWorks } from "./components/HowItWorks";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { MobileMenu } from "./components/MobileMenu";
import { AccessibilityMenu } from "./components/AccessibilityMenu";
import { Navigation } from "./components/Navigation";
import { Chat } from "./components/Chat";
import { useSpeech } from "./hooks/useSpeech";

export default function App() {
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  
  // Подключаем глобальную озвучку
  useSpeech();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation 
        onNavigate={scrollToSection} 
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
      />
      <AccessibilityMenu 
        isOpen={isAccessibilityOpen} 
        onClose={() => setIsAccessibilityOpen(false)}
      />
      <MobileMenu onNavigate={scrollToSection} />
      <Hero onNavigate={scrollToSection} />
      <ForSoldiers onNavigate={scrollToSection} />
      <ForFamilies onNavigate={scrollToSection} />
      <ForCitizens onNavigate={scrollToSection} />
      <Chat />
      <HowItWorks />
      <ContactForm />
      <Footer />
    </div>
  );
}