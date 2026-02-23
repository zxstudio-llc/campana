'use client';
import Button from'../components/ui/Button';

export default function SolutionsSection() {
  const solutions = [
    {
      id: 0,
      title: "Digital Transformation",
      description: "Transform your business with cutting-edge digital solutions"
    },
    {
      id: 1,
      title: "AI & Automation", 
      description: "Leverage artificial intelligence for business automation"
    },
    {
      id: 2,
      title: "Cloud Business Solutions",
      description: "Scale your operations with cloud-based infrastructure"
    }
  ]

  const handleLearnMore = (solutionId: number): void => {
    // Handle learn more for specific solution
  }

  return (
    <section className="w-full bg-[#f5f5f5] py-[100px] sm:py-[150px] lg:py-[232px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-[60px] sm:gap-[64px] items-center w-full">
          
          {/* Header Content */}
          <div className="flex flex-col gap-6 items-start w-full">
            <Button
              text="Solution"
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
            />
            
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0 w-full">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-raleway font-normal leading-[38px] sm:leading-[48px] lg:leading-[56px] text-left text-[#1f2327] w-full lg:w-[50%]">
                Smarter Pathways to Business Beyond Borders
              </h2>
              
              <p className="text-base font-poppins font-normal leading-normal text-left text-[#5a5a5a] w-full lg:w-[26%] self-end">
                We provide future-ready solutions designed to help businesses transform, scale, and thrive in a limitless digital world.
              </p>
            </div>
          </div>

          {/* Solutions Grid */}
          <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
            
            {/* First Solution - Digital Transformation */}
            <div className="border border-[#d9d9d9] rounded-[20px] p-[18px] w-full lg:w-1/3 mt-[50px] sm:mt-[80px] lg:mt-[104px]">
              <div className="flex flex-col gap-[100px] sm:gap-[120px] lg:gap-[140px] items-start w-full h-auto min-h-[220px] sm:min-h-[250px] lg:min-h-[284px]">
                
                <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-raleway font-normal leading-[27px] sm:leading-[31px] lg:leading-[35px] text-left text-[#1f2327] w-[72%] mt-[6px] ml-[10px]">
                  Digital Transformation
                </h3>
                
                <div className="flex items-center justify-end w-full">
                  <button 
                    onClick={() => handleLearnMore(0)}
                    className="text-base font-poppins font-normal leading-normal text-left text-[#1f2327] hover:underline mr-4"
                  >
                    Learn more
                  </button>
                  <img 
                    src="/images/img_button_background.svg" 
                    alt="Arrow" 
                    className="w-[22px] h-[22px]" 
                  />
                </div>
              </div>
            </div>

            {/* Second Solution - AI & Automation */}
            <div className="flex flex-col gap-[10px] items-center w-full lg:w-1/3 self-center">
              
              {/* Image Placeholder */}
              <div className="w-full h-[200px] sm:h-[250px] lg:h-[284px] bg-[#c4c4c4] rounded-[20px]" />
              
              {/* Content Card */}
              <div className="border border-[#d9d9d9] rounded-[20px] p-[18px] w-full">
                <div className="flex flex-col gap-[120px] sm:gap-[150px] lg:gap-[170px] items-start w-full h-auto min-h-[220px] sm:min-h-[250px] lg:min-h-[284px]">
                  
                  <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-raleway font-normal leading-[29px] sm:leading-[34px] lg:leading-[38px] text-left text-[#1f2327] ml-[10px]">
                    AI & Automation
                  </h3>
                  
                  <div className="flex items-center justify-end w-full">
                    <button 
                      onClick={() => handleLearnMore(1)}
                      className="text-base font-poppins font-normal leading-normal text-left text-[#1f2327] hover:underline mr-4"
                    >
                      Learn more
                    </button>
                    <img 
                      src="/images/img_button_background.svg" 
                      alt="Arrow" 
                      className="w-[22px] h-[22px]" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Third Solution - Cloud Business Solutions */}
            <div className="border border-[#d9d9d9] rounded-[20px] p-[18px] w-full lg:w-1/3 self-end mb-[50px] sm:mb-[70px] lg:mb-[90px]">
              <div className="flex flex-col gap-[100px] sm:gap-[120px] lg:gap-[140px] items-start w-full h-auto min-h-[220px] sm:min-h-[250px] lg:min-h-[284px]">
                
                <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-raleway font-normal leading-[27px] sm:leading-[31px] lg:leading-[35px] text-left text-[#1f2327] w-[74%] mt-[6px] ml-[10px]">
                  Cloud Business Solutions
                </h3>
                
                <div className="flex items-center justify-end w-full">
                  <button 
                    onClick={() => handleLearnMore(2)}
                    className="text-base font-poppins font-normal leading-normal text-left text-[#1f2327] hover:underline mr-4"
                  >
                    Learn more
                  </button>
                  <img 
                    src="/images/img_button_background.svg" 
                    alt="Arrow" 
                    className="w-[22px] h-[22px]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}