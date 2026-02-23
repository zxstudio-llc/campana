'use client';
import { useState } from 'react';
 import Button from'../components/ui/Button';

export default function WhyChooseUsSection() {
  const [expandedItem, setExpandedItem] = useState<number>(0) // First item expanded

  const whyChooseItems = [
    {
      id: 0,
      number: "01",
      title: "Proven Expertise",
      description: "Years of experience in digital transformation.",
      expanded: true
    },
    {
      id: 1,
      number: "02", 
      title: "Cutting-Edge Technology",
      description: "",
      expanded: false
    },
    {
      id: 2,
      number: "03",
      title: "Tailored Strategies", 
      description: "",
      expanded: false
    },
    {
      id: 3,
      number: "04",
      title: "Global Reach",
      description: "",
      expanded: false
    }
  ]

  const handleItemClick = (itemId: number): void => {
    setExpandedItem(expandedItem === itemId ? -1 : itemId)
  }

  const handleDiscoverAdvantage = (): void => {
    // Handle discover advantage action
  }

  return (
    <section className="w-full bg-[#f5f5f5] py-[100px] sm:py-[150px] lg:py-[200px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 w-full mb-[60px] sm:mb-[70px] lg:mb-[80px]">
          
          <Button
            text="Why choose us"
            text_font_size="20"
            text_font_family="Poppins"
            text_font_weight="400"
            text_line_height="30px"
            text_text_align="left"
            text_color="#8a71fe"
            fill_background_color="transparent"
            border_border_radius="20px"
            border_border="1px solid #8a71fe"
            padding="6px 20px"
            className="mb-2"
          />
          
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-raleway font-normal leading-[38px] sm:leading-[48px] lg:leading-[57px] text-left text-[#272727] w-full lg:w-[42%] self-center">
            Empower Your Business with Future Solutions
          </h2>
          
          <p className="text-[18px] sm:text-[20px] font-poppins font-normal leading-[24px] sm:leading-[30px] text-left text-[#484848] w-full lg:w-[24%] self-end">
            Choose us for innovation and reliability. We transform businesses into leaders.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-5 items-center w-full">
          
          {/* Left Section - Expandable List */}
          <div className="bg-white rounded-[30px] w-full lg:w-[74%] p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full">
              
              {/* Expandable Items */}
              <div className="flex flex-col gap-[60px] sm:gap-[70px] lg:gap-[76px] w-full lg:w-[48%]">
                {whyChooseItems.map((item, index) => (
                  <div key={item.id} className="flex flex-col gap-5 w-full">
                    
                    {/* Header */}
                    <div 
                      className="flex items-center justify-between w-full cursor-pointer group"
                      onClick={() => handleItemClick(item.id)}
                    >
                      <div className="flex items-center gap-5">
                        {/* Number Circle */}
                        <div className="flex items-center justify-center w-9 h-9 border border-[#2c2c2c] rounded-[18px]">
                          <span className="text-base font-poppins font-normal text-center text-[#2c2c2c]">
                            {item.number}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-[20px] sm:text-[24px] font-poppins font-normal leading-[24px] sm:leading-[36px] text-left text-[#2c2c2c] ml-5">
                          {item.title}
                        </h3>
                      </div>
                      
                      {/* Expand/Collapse Icon */}
                      <div className="ml-auto">
                        {expandedItem === item.id ? (
                          <img 
                            src="/images/img_feature_title.png" 
                            alt="Collapse" 
                            className="w-2 h-auto mt-2" 
                          />
                        ) : (
                          <img 
                            src="/images/img_feature_title_blue_gray_900_02.svg" 
                            alt="Expand" 
                            className="w-3 h-3 mt-2" 
                          />
                        )}
                      </div>
                    </div>
                    
                    {/* Expandable Content */}
                    {expandedItem === item.id && item.description && (
                      <div className="ml-14 mr-14">
                        <p className="text-base font-poppins font-normal leading-normal text-left text-[#484848] w-full">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Section - Background Image */}
              <div className="flex flex-col items-end w-full lg:w-[46%] h-[400px] sm:h-[500px] lg:h-[558px]">
                <div className="bg-[#c4c4c4] rounded-[30px] p-7 w-full h-full flex items-start justify-end">
                  <div className="bg-[#8a71fe] rounded-[26px] p-[18px] mb-[400px] sm:mb-[450px]">
                    <img 
                      src="/images/img_group_5.svg" 
                      alt="Feature Icon" 
                      className="w-4 h-4" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Performance Stats */}
          <div className="flex flex-col gap-5 items-center w-full lg:w-[24%]">
            
            {/* Top Image */}
            <div className="w-full h-[200px] sm:h-[250px] lg:h-[304px] bg-[#c4c4c4] rounded-[20px]" />
            
            {/* Stats Card */}
            <div className="bg-[#121416] rounded-[20px] p-5 w-full">
              <div className="flex flex-col gap-[30px] sm:gap-[35px] lg:gap-[38px] items-start w-full">
                
                {/* Performance Metric */}
                <div className="flex flex-col items-start w-full mt-5">
                  <p className="text-base font-poppins font-normal leading-normal text-left text-[#c9c9c9] mb-1">
                    Faster Transactions
                  </p>
                  <h3 className="text-[36px] sm:text-[42px] lg:text-[48px] font-poppins font-semibold leading-[54px] sm:leading-[63px] lg:leading-[72px] text-left text-white">
                    300%
                  </h3>
                </div>

                {/* Action Button */}
                <div className="bg-[#8a71fe] rounded-[22px] p-2">
                  <p className="text-base font-poppins font-normal leading-normal text-left text-white px-2">
                    Discover The Advantage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}