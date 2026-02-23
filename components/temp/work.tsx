'use client';
export default function WorksSection() {
  const works = [
    {
      id: 0,
      title: "Retail Transformation",
      description: "40% increase in customer retention within 6 months.",
      bgColor: "#121416",
      textColor: "#ffffff",
      descColor: "#b1b6c5"
    },
    {
      id: 1,
      title: "Financial Growth", 
      description: "Reduced operational costs by 35% while improving compliance.",
      bgColor: "#e7e9f1",
      textColor: "#1e1e1e",
      descColor: "#1e1e1e"
    },
    {
      id: 2,
      title: "Global Expansion",
      description: "Expanded into 5 new countries in under a year.",
      bgColor: "#121416", 
      textColor: "#ffffff",
      descColor: "#b1b6c5"
    }
  ]

  return (
    <section className="w-full bg-[#f5f5f5] py-[100px] sm:py-[150px] lg:py-[176px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start w-full mb-[40px] sm:mb-[45px] lg:mb-[50px]">
          
          <button className="text-[18px] sm:text-[20px] font-poppins font-normal leading-[24px] sm:leading-[30px] text-left text-[#8a71fe] border border-[#8a71fe] rounded-[20px] px-5 py-[6px] hover:bg-[#8a71fe] hover:text-white transition-all duration-200">
            Works
          </button>
          
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0 w-full mt-[26px]">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-raleway font-normal leading-[38px] sm:leading-[52px] lg:leading-[62px] text-left text-[#1e1e1e] w-full lg:w-[52%]">
              Businesses Thriving Beyond Digital Boundaries
            </h2>
            
            <p className="text-[18px] sm:text-[20px] font-poppins font-normal leading-[22px] sm:leading-[24px] lg:leading-[26px] text-left text-[#4e4e4e] w-full lg:w-[30%] self-end">
              Results speak louder than promises. Here are examples of how our solutions transformed businesses.
            </p>
          </div>
        </div>

        {/* Works Grid */}
        <div className="flex flex-col lg:flex-row items-center gap-5 w-full mt-[50px]">
          
          {/* Left Column */}
          <div className="flex flex-col w-full lg:w-[49%]">
            
            {/* Top Section - Retail Transformation */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0 w-full mb-[20px] sm:mb-[25px] lg:mb-[30px]">
              
              <div className="flex flex-col items-center w-full lg:w-[48%] h-auto">
                <div className={`bg-[${works?.[0]?.bgColor}] rounded-[30px] p-4 w-full min-h-[250px] sm:min-h-[280px] lg:min-h-[302px] flex flex-col justify-end`}>
                  <div className="flex flex-col gap-4 items-start w-full mb-[30px] sm:mb-[35px] lg:mb-[38px] ml-3">
                    
                    <div className="flex items-center justify-between w-full mb-[80px] sm:mb-[100px] lg:mb-[112px]">
                      <h3 className={`text-[20px] sm:text-[22px] lg:text-[24px] font-poppins font-normal leading-[24px] sm:leading-[28px] lg:leading-[31px] text-left text-[${works?.[0]?.textColor}] w-[94%]`}>
                        {works?.[0]?.title}
                      </h3>
                      <img 
                        src="/images/img_rectangle_5.svg" 
                        alt="Icon" 
                        className="w-6 h-6" 
                      />
                    </div>
                    
                    <p className={`text-base font-poppins font-normal leading-tight text-left text-[${works?.[0]?.descColor}] w-[90%]`}>
                      {works?.[0]?.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[30%] h-[150px] sm:h-[170px] lg:h-[184px] bg-[#c4c4c4] rounded-[30px] self-end mb-5" />
            </div>

            {/* Bottom Section - Financial Growth */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0 w-full">
              
              <div className="w-full lg:w-[30%] h-[150px] sm:h-[170px] lg:h-[184px] bg-[#c4c4c4] rounded-[30px] self-end" />
              
              <div className="flex flex-col items-center w-full lg:w-[48%] h-auto">
                <div className={`bg-[${works?.[1]?.bgColor}] rounded-[30px] p-4 w-full min-h-[250px] sm:min-h-[280px] lg:min-h-[302px] flex flex-col justify-end`}>
                  <div className="flex flex-col gap-4 items-start w-full mb-3 ml-3">
                    
                    <div className="flex items-center justify-between w-full mb-[80px] sm:mb-[100px] lg:mb-[116px]">
                      <h3 className={`text-[20px] sm:text-[22px] lg:text-[24px] font-poppins font-normal leading-[24px] sm:leading-[28px] lg:leading-[31px] text-left text-[${works?.[1]?.textColor}] w-[70%] mt-3`}>
                        {works?.[1]?.title}
                      </h3>
                      <img 
                        src="/images/img_rectangle_5.svg" 
                        alt="Icon" 
                        className="w-6 h-6" 
                      />
                    </div>
                    
                    <p className={`text-base font-poppins font-normal leading-tight text-left text-[${works?.[1]?.descColor}] w-[90%]`}>
                      {works?.[1]?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="w-full lg:w-[24%] h-[400px] sm:h-[500px] lg:h-[606px] bg-[#c4c4c4] rounded-[30px]" />

          {/* Right Column - Global Expansion */}
          <div className="flex flex-col items-center w-full lg:w-[24%] h-auto self-end">
            <div className={`bg-[${works?.[2]?.bgColor}] rounded-[30px] p-4 w-full min-h-[250px] sm:min-h-[280px] lg:min-h-[302px] flex flex-col justify-end`}>
              <div className="flex flex-col gap-4 items-start w-full mb-3 ml-3">
                
                <div className="flex items-center justify-between w-full mb-[100px] sm:min-h-[120px] lg:mb-[138px]">
                  <h3 className={`text-[20px] sm:text-[22px] lg:text-[24px] font-poppins font-normal leading-[24px] sm:leading-[28px] lg:leading-[31px] text-left text-[${works?.[2]?.textColor}] w-[70%] mt-3`}>
                    {works?.[2]?.title}
                  </h3>
                  <img 
                    src="/images/img_rectangle_5.svg" 
                    alt="Icon" 
                    className="w-6 h-6" 
                  />
                </div>
                
                <p className={`text-base font-poppins font-normal leading-tight text-left text-[${works?.[2]?.descColor}] w-[90%]`}>
                  {works?.[2]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}