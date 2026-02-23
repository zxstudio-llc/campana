'use client';
import { useState, useEffect } from 'react';
 import Header from'../components/common/Header';
 import HeroSection from'./HeroSection';
 import FeaturesSection from'./FeaturesSection';
 import AboutSection from'./AboutSection';
 import WhyChooseUsSection from'./WhyChooseUsSection';
 import SolutionsSection from'./SolutionsSection';
 import WorksSection from'./WorksSection';
 import TestimonialsSection from'./TestimonialsSection';
 import Footer from'./Footer';

interface StatData {
  businesses: string;
  clients: string;
}

export default function HomePage() {
  const [statData, setStatData] = useState<StatData>({
    businesses: '',
    clients: ''
  })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Initialize stats data after client hydration
    const timer = setTimeout(() => {
      setStatData({
        businesses: '320M+',
        clients: '590K+'
      })
      setLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="bg-[#f5f5f5]">
      <Header />
      <HeroSection statData={statData} loading={loading} />
      <FeaturesSection />
      <AboutSection />
      <WhyChooseUsSection />
      <SolutionsSection />
      <WorksSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}