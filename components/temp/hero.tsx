'use client';
import { useState } from 'react';
 import Button from'../components/ui/Button';

interface StatData {
  businesses: string;
  clients: string;
}

interface HeroSectionProps {
  statData: StatData;
  loading: boolean;
}

export default function HeroSection({ statData, loading }: HeroSectionProps) {
  const [currentSlide] = useState<number>(0)

  const handleDiscoverMore = (): void => {
    // Handle discover more action
  }

  const partnerLogos = [
    '/images/img_vector.svg',
    '/images/img_vector_gray_500.svg',
    '/images/img_vector_gray_500_40x52.svg',
    '/images/img_vector_gray_500_36x78.svg',
    '/images/img_vector_gray_500_40x42.svg',
    '/images/img_vector_gray_500_54x54.svg'
  ]

  return (
    <section className="w-full bg-[#f5f5f5] pt-[27px] sm:pt-[40px] lg:pt-[54px] pb-[20px] sm:pb-[30px] lg:pb-[40px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center w-full">
          
          {/* Hero Content Stack */}
          <div className="relative w-full h-[400px] sm:h-[600px] lg:h-[822px] mb-8 sm:mb-12 lg:mb-16">
            {/* Main Hero Content */}
            <div className="flex flex-col lg:flex-row items-start w-full h-full">
              {/* Left Content */}
              <div className="flex flex-col lg:flex-row items-start w-full lg:flex-1">
                <h1 className="text-[48px] sm:text-[60px] md:text-[75px] lg:text-[96px] font-raleway font-medium leading-[48px] sm:leading-[60px] md:leading-[75px] lg:leading-[96px] text-left text-[#2c2c2c] w-full lg:w-[46%] mt-[60px] sm:mt-[90px] lg:mt-[122px]">
                  Empowering Business Beyond.
                </h1>
                
                {/* Gradient Background */}
                <div className="w-full lg:w-[684px] h-[400px] sm:h-[600px] lg:h-[822px] bg-[linear-gradient(190deg,#ffffff00_0%,_#f5f5f5_100%)] lg:ml-[-272px] self-center" />
              </div>

              {/* Right Side Content */}
              <div className="flex flex-col gap-5 items-start self-end w-full lg:w-[22%] mb-[150px] sm:mb-[200px] lg:mb-[308px] lg:ml-[-24px]">
                <img 
                  src="/images/img_ui_element.svg" 
                  alt="UI Element" 
                  className="w-[44px] h-[44px]" 
                />
                <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-poppins font-normal leading-[24px] sm:leading-[27px] lg:leading-[30px] text-left text-[#4e4e4e] w-full">
                  We offer AI strategies to help your business thrive.
                </p>
              </div>
            </div>

            {/* Bottom Action Area */}
            <div className="absolute bottom-0 left-0 w-auto h-auto bg-[#121416] rounded-tr-[20px] mb-[140px] sm:mb-[200px] lg:mb-[288px]">
              <div className="flex items-center w-auto">
                <Button
                  text="Discover more"
                  text_font_size="16"
                  text_font_family="Poppins"
                  text_font_weight="400"
                  text_line_height="24px"
                  text_text_align="left"
                  text_color="#121416"
                  fill_background_color="#ffffff"
                  border_border_radius="20px"
                  border_border="1px solid #121416"
                  padding="18px"
                  onClick={handleDiscoverMore}
                />
                <img 
                  src="/images/img_stat_images_container.svg" 
                  alt="Stats" 
                  className="w-[90px] h-[36px] ml-[14px]" 
                />
                <img 
                  src="/images/img_arrow_right.svg" 
                  alt="Arrow" 
                  className="w-[14px] h-[14px] ml-[12px]" 
                />
              </div>
            </div>
          </div>

          {/* Partners & Stats Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-[116px] mb-8 lg:mb-[116px] px-4 sm:px-6 lg:px-[96px]">
            
            {/* Partners Section */}
            <div className="flex flex-col gap-[22px] items-start w-full lg:flex-1">
              <p className="text-base font-poppins font-normal leading-normal text-center text-[#4e4e4e]">
                Trusted partners rely on our safe services.
              </p>
              
              <div className="flex items-center w-full overflow-x-auto lg:overflow-x-visible">
                <div className="flex gap-8 lg:gap-[64px] min-w-max lg:w-full mr-[75px] sm:mr-[100px] lg:mr-[148px]">
                  {partnerLogos.map((logo, index) => (
                    <img 
                      key={index}
                      src={logo} 
                      alt={`Partner ${index + 1}`} 
                      className="w-[40px] sm:w-[50px] lg:w-auto h-auto flex-shrink-0" 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex items-center justify-end w-auto gap-7">
              <div className="flex flex-col items-start w-auto">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-[44px] w-[100px] rounded mb-2" />
                ) : (
                  <h3 className="text-[28px] sm:text-[32px] lg:text-[36px] font-raleway font-medium leading-[32px] sm:leading-[38px] lg:leading-[44px] text-left text-white uppercase">
                    <span className="text-white">{statData.businesses.slice(0, -1)}</span>
                    <span className="text-[#8a71fe]">+</span>
                  </h3>
                )}
                <p className="text-base font-poppins font-normal leading-normal text-left text-[#989898]">
                  Business
                </p>
              </div>

              <div className="w-[1px] h-[28px] bg-[#8a71fe]" />

              <div className="flex flex-col items-center w-auto ml-7">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-[44px] w-[100px] rounded mb-2" />
                ) : (
                  <h3 className="text-[28px] sm:text-[32px] lg:text-[36px] font-raleway font-medium leading-[32px] sm:leading-[38px] lg:leading-[44px] text-left text-white uppercase">
                    <span className="text-white">{statData.clients.slice(0, -1)}</span>
                    <span className="text-[#8a71fe]">+</span>
                  </h3>
                )}
                <p className="text-base font-poppins font-normal leading-normal text-left text-[#989898]">
                  Happy Client
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}