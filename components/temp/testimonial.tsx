'use client';
import { useState, useEffect } from 'react';
 import Button from'../components/ui/Button';

interface Testimonial {
  id: number;
  name: string;
  rating: string;
  review: string;
  avatar: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Initialize testimonials data after client hydration
    const timer = setTimeout(() => {
      setTestimonials([
        {
          id: 1,
          name: "Mario M.",
          rating: "4.9",
          review: "I have always loved streetwear, and this brand nails it! The graphic t-shirts and hoodies are not only comfortable but also make a bold statement.",
          avatar: "/images/avatar1.jpg"
        },
        {
          id: 2,
          name: "Emily R.",
          rating: "4.9", 
          review: "The boho dresses from this collection are simply stunning. The vibrant prints and flowing fabrics make me feel like I am on a permanent vacation.",
          avatar: "/images/avatar2.jpg"
        },
        {
          id: 3,
          name: "Rina S.",
          rating: "4.9",
          review: "Minimalist fashion has always been my go-to, and this brand does it flawlessly. The clean lines and neutral colors create such an elegant look.",
          avatar: "/images/avatar3.jpg"
        }
      ])
      setLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="w-full relative mt-[100px] sm:mt-[130px] lg:mt-[188px]">
      
      {/* Background Section */}
      <div className="relative w-full h-[600px] sm:h-[700px] lg:h-[768px]">
        
        {/* Header Content */}
        <div className="absolute top-[50px] sm:top-[70px] lg:top-[86px] right-4 sm:right-8 lg:right-[120px] w-full max-w-[500px] sm:max-w-[550px] lg:max-w-[626px] h-auto z-20">
          <div className="flex flex-col items-start w-full">
            
            <Button
              text="Testimonials"
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
            
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-raleway font-normal leading-[36px] sm:leading-[44px] lg:leading-[52px] text-left text-[#2c2c2c] w-[98%] mt-[18px]">
              Trust Voices From Businesses We have Helped Transcend Boundaries
            </h2>
            
            <p className="text-[18px] sm:text-[20px] font-poppins font-normal leading-[24px] sm:leading-[27px] lg:leading-[30px] text-left text-[#545454] w-full mt-[50px] sm:mt-[60px] lg:mt-[70px]">
              Our clients are at the heart of everything we do. Hear how we have empowered their businesses to go beyond limits and achieve lasting success.
            </p>
          </div>
        </div>

        {/* Background Image */}
        <div className="absolute top-0 left-0 w-full h-[400px] sm:h-[500px] lg:h-[608px] overflow-hidden">
          <img 
            src="/images/img_vector_indigo_50_01.svg" 
            alt="Background" 
            className="w-full lg:w-[70%] h-full object-cover" 
          />
        </div>

        {/* Testimonials Slider */}
        <div className="absolute bottom-0 left-0 w-full overflow-x-auto">
          <div className="flex gap-6 w-max px-4 sm:px-6 lg:px-0 pb-4">
            
            {loading ? (
              // Loading State
              <>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-[#e7eaf1] rounded-2xl p-6 sm:p-8 lg:p-10 w-[300px] sm:w-[400px] lg:w-[590px] flex-shrink-0 animate-pulse">
                    <div className="flex gap-6 sm:gap-8 lg:gap-[34px] items-start w-full">
                      <div className="w-14 h-14 bg-gray-300 rounded-full flex-shrink-0 mt-3" />
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="h-6 bg-gray-300 rounded w-24" />
                        <div className="h-20 bg-gray-300 rounded w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              // Actual Testimonials
              <>
                {/* First Testimonial - Simple Layout */}
                <div className="bg-[#e7eaf1] rounded-2xl p-6 sm:p-8 lg:p-10 w-[300px] sm:w-[400px] lg:w-[590px] flex-shrink-0 ml-[-70px] sm:ml-[-100px] lg:ml-[-139px]">
                  <div className="flex gap-6 sm:gap-8 lg:gap-[34px] items-start w-full">
                    <div className="w-14 h-14 bg-[#c4c4c4] rounded-full flex-shrink-0 mt-3" />
                    <div className="flex flex-col gap-1 flex-1">
                      <h4 className="text-base font-poppins font-bold leading-normal text-left text-[#252525]">
                        {testimonials[0]?.name}
                      </h4>
                      <p className="text-base font-poppins font-normal leading-[28px] text-left text-[#252525]">
                        {testimonials[0]?.review}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Second Testimonial - With Rating */}
                <div className="bg-[#e7eaf1] rounded-2xl p-6 sm:p-8 lg:p-10 w-[300px] sm:w-[400px] lg:w-[590px] flex-shrink-0">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col gap-1 items-center w-auto">
                      <div className="w-14 h-14 bg-[#c4c4c4] rounded-full" />
                      <div className="flex gap-2 items-center">
                        <img 
                          src="/images/img_vector_deep_orange_a400.svg" 
                          alt="Star" 
                          className="w-5 h-auto self-start rounded-sm" 
                        />
                        <span className="text-base font-poppins font-semibold text-center text-[#252525]">
                          {testimonials[1]?.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-0 flex-1 ml-6">
                      <h4 className="text-base font-poppins font-bold leading-normal text-left text-[#252525]">
                        {testimonials[1]?.name}
                      </h4>
                      <p className="text-base font-poppins font-normal leading-[28px] text-left text-[#252525]">
                        {testimonials[1]?.review}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Third Testimonial - With Rating */}
                <div className="bg-[#e7eaf1] rounded-2xl p-6 sm:p-8 lg:p-10 w-[280px] sm:w-[380px] lg:w-[556px] flex-shrink-0">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col gap-1 items-center w-auto">
                      <div className="w-14 h-14 bg-[#c4c4c4] rounded-full" />
                      <div className="flex gap-2 items-center">
                        <img 
                          src="/images/img_vector_deep_orange_a400.svg" 
                          alt="Star" 
                          className="w-5 h-auto self-start rounded-sm" 
                        />
                        <span className="text-base font-poppins font-semibold text-center text-[#252525]">
                          {testimonials[2]?.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1 flex-1 ml-6">
                      <h4 className="text-base font-poppins font-bold leading-normal text-left text-[#252525]">
                        {testimonials[2]?.name}
                      </h4>
                      <p className="text-base font-poppins font-normal leading-[28px] text-left text-[#252525]">
                        {testimonials[2]?.review}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}