'use client';
import { useState } from 'react';
 import Button from'../components/ui/Button';

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState<number>(1) // Cloud Scalability is active

  const features = [
    {
      id: 0,
      title: 'AI-Powered Automation',
      subtitle: 'intelligent automation',
      description: 'Streamline operations with intelligent automation'
    },
    {
      id: 1,
      title: 'Cloud Scalability',
      subtitle: 'cloud solutions',
      description: 'Scale your business with robust cloud infrastructure'
    },
    {
      id: 2,
      title: 'Data Intelligence',
      subtitle: 'Smarter decisions',
      description: 'Make data-driven decisions with advanced analytics'
    }
  ]

  const handleGetStarted = (): void => {
    // Handle get started action
  }

  const handleExploreMore = (): void => {
    // Handle explore more action
  }

  return (
    <section className="w-full relative" style={{
      backgroundImage: "url('/images/img_subtract.svg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="w-full bg-black bg-opacity-90 py-10 mt-[-64px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col gap-5 items-center w-full mb-[50px] sm:mb-[70px] lg:mb-[82px] px-4 sm:px-[120px] lg:px-[236px]">
            <Button
              text="Key Features"
              text_font_size="20"
              text_font_family="Poppins"
              text_font_weight="400"
              text_line_height="30px"
              text_text_align="center"
              text_color="#8a71fe"
              fill_background_color="transparent"
              border_border_radius="20px"
              border_border="1px solid #8a71fe"
              padding="6px 20px"
            />
            
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-raleway font-normal leading-[36px] sm:leading-[44px] lg:leading-[52px] text-center text-white w-full">
              Innovative Features Driving Businesses Beyond Digital Limits
            </h2>
          </div>

          {/* Features Slider */}
          <div className="flex flex-col lg:flex-row gap-5 items-end w-full mb-[30px] sm:mb-[50px] lg:mb-[70px] ml-[3px]">
            
            {/* Feature Cards */}
            {features.map((feature, index) => (
              <div 
                key={feature.id}
                className={`flex flex-col gap-4 items-center w-full ${
                  index === 1 ? 'lg:self-start' : index === 0 || index === 2 ? 'mt-[30px] sm:mt-[40px] lg:mt-[60px]' : ''
                } ${
                  activeFeature === feature.id ? 'h-auto' : 'h-auto'
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <div className="bg-[linear-gradient(180deg,#080a1400_0%,_#080a14_100%)] rounded-[30px] p-6 sm:p-8 lg:p-10 w-full cursor-pointer hover:bg-opacity-80 transition-all duration-300">
                  
                  {/* Feature Content */}
                  <div className="flex flex-col gap-4 items-center justify-end h-full min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
                    
                    <Button
                      text={feature.subtitle}
                      text_font_size="16"
                      text_font_family="Poppins"
                      text_font_weight="400"
                      text_line_height="24px"
                      text_text_align="center"
                      text_color="#ffffff"
                      fill_background_color="#ffffff38"
                      border_border_radius="16px"
                      border_border="1px solid #ffffff"
                      padding="4px 10px"
                      className="mt-auto"
                    />
                    
                    <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-poppins font-medium leading-[28px] sm:leading-[32px] lg:leading-[38px] text-center text-white capitalize">
                      {feature.title}
                    </h3>

                    {/* Get Started Button - Only show on active feature */}
                    {activeFeature === feature.id && feature.id === 1 && (
                      <Button
                        text="Get Started"
                        text_font_size="16"
                        text_font_family="Poppins"
                        text_font_weight="400"
                        text_line_height="24px"
                        text_text_align="left"
                        text_color="#ffffff"
                        fill_background_color="#8a71fea0"
                        border_border_radius="24px"
                        border_border="1px solid #8a71fe"
                        padding="14px 24px"
                        className="self-end mr-[34px] mt-[34px]"
                        onClick={handleGetStarted}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explore More Link */}
          <div className="flex justify-center w-full">
            <button 
              onClick={handleExploreMore}
              className="text-base font-inter font-normal leading-tight tracking-[3px] text-center underline uppercase text-[#8a71fe] hover:opacity-80 transition-opacity duration-200"
            >
              Explore More Features
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}