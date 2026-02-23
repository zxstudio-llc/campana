'use client';
import Button from'../components/ui/Button';

export default function AboutSection() {
  const handleGetStarted = (): void => {
    // Handle get started action
  }

  const handleLearnMore = (): void => {
    // Handle learn more action
  }

  return (
    <section className="w-full bg-[#f5f5f5] py-[100px] sm:py-[150px] lg:py-[200px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Content */}
        <div className="flex flex-col lg:flex-row items-center w-full gap-8 lg:gap-0">
          
          {/* Left Content - Images and Features */}
          <div className="flex flex-col items-start w-full lg:w-[82%]">
            
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row gap-5 items-start w-full mb-[30px]">
              
              {/* Left Column */}
              <div className="flex flex-col gap-8 items-center w-full lg:w-[48%] mt-3">
                
                {/* Futuristic Solutions Header */}
                <div className="flex items-center w-full">
                  <p className="text-base font-poppins font-normal leading-normal text-left text-[#1e1e1e] w-[42%]">
                    Futuristic solutions
                  </p>
                  
                  <div className="flex items-center justify-end align-end w-full gap-5 ml-auto">
                    <div className="flex items-center justify-center w-[44px] h-[44px] border border-[#1e1e1e] rounded-[22px] p-3">
                      <img 
                        src="/images/img_vector_176.svg" 
                        alt="Navigation" 
                        className="w-5 h-auto" 
                      />
                    </div>
                    <div className="flex items-center justify-center w-[44px] h-[44px] border border-[#1e1e1e] rounded-[22px] p-3">
                      <img 
                        src="/images/img_arrow_right_gray_900_02.svg" 
                        alt="Arrow" 
                        className="w-5 h-auto" 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Image Placeholder */}
                <div className="w-full h-[200px] sm:h-[230px] lg:h-[256px] bg-[#c4c4c4] rounded-[30px]" />
              </div>

              {/* Right Column - Global Connectivity */}
              <div className="flex flex-col lg:flex-row justify-between items-end w-full lg:w-[52%] self-center">
                <div className="bg-[#c4c4c4] rounded-[30px] p-4 lg:p-[18px] w-full min-h-[300px] sm:min-h-[350px] lg:min-h-[408px] flex flex-col justify-end">
                  <div className="flex justify-between items-end w-full">
                    <h3 className="text-[18px] sm:text-[20px] font-poppins font-medium leading-normal text-left text-[#1e1e1e] w-[54%] mb-[10px] ml-3">
                      Global Connectivity
                    </h3>
                    
                    <div className="bg-[#8a71fea0] border border-[#8a71fe] rounded-[24px] p-5 mt-[200px] sm:mt-[250px] lg:mt-[308px]">
                      <img 
                        src="/images/img_feature_detail.svg" 
                        alt="Feature Detail" 
                        className="w-[24px] sm:w-[30px] lg:w-[62px] h-auto" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Image */}
            <div className="w-full h-[200px] sm:h-[250px] lg:h-[318px] bg-[#c4c4c4] rounded-[30px]" />
          </div>

          {/* Right Content - About Info */}
          <div className="flex flex-col gap-[80px] sm:gap-[90px] lg:gap-[110px] items-center w-full lg:w-[40%]">
            
            {/* About Section */}
            <div className="flex flex-col gap-[70px] sm:gap-[80px] lg:gap-[88px] items-center w-full">
              
              {/* Header */}
              <div className="flex flex-col gap-7 items-start w-full">
                <Button
                  text="About us"
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
                
                <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-raleway font-normal leading-[38px] sm:leading-[48px] lg:leading-[57px] text-left text-[#1e1e1e] w-full">
                  Shaping the Future of Business Beyond Digital Frontiers
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
                <Button
                  text="Get Started"
                  text_font_size="16"
                  text_font_family="Poppins"
                  text_font_weight="600"
                  text_line_height="24px"
                  text_text_align="center"
                  text_color="#ffffff"
                  fill_background_color="#8a71fe"
                  border_border_radius="32px"
                  border_border="1px solid #8a71fe"
                  padding="20px 44px 20px 32px"
                  onClick={handleGetStarted}
                  className="flex items-center gap-5"
                >
                  <span>Get Started</span>
                  <img 
                    src="/images/img_vector_168.svg" 
                    alt="Arrow" 
                    className="w-3 h-3" 
                  />
                </Button>
                
                <div className="bg-[#cfc5ff] rounded-[30px] p-6">
                  <img 
                    src="/images/img_text_container.svg" 
                    alt="Text Container" 
                    className="w-[40px] sm:w-[50px] lg:w-[66px] h-auto" 
                  />
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex flex-col gap-12 items-center w-full">
              
              {/* People Join Section */}
              <div className="flex flex-col sm:flex-row gap-6 items-center w-full">
                <div className="w-full sm:w-[38%]">
                  <p className="text-[18px] sm:text-[20px] font-poppins leading-[24px] sm:leading-[30px] text-left">
                    <span className="font-normal text-[#4e4e4e]">/100k+<br /></span>
                    <span className="font-medium text-[#1e1e1e]">People Join</span>
                  </p>
                </div>
                
                <img 
                  src="/images/img_image_container.svg" 
                  alt="People" 
                  className="w-full sm:w-[60%] h-auto" 
                />
              </div>

              {/* Description */}
              <p className="text-[18px] sm:text-[20px] font-poppins font-normal leading-[24px] sm:leading-[30px] text-left text-[#4e4e4e] w-full">
                We empower businesses with innovative solutions. We help organizations unlock opportunities in a rapidly evolving world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}