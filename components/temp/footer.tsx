'use client';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState<string>('')

  const handleNewsletterSubmit = (): void => {
    // Handle newsletter subscription
    setEmail('')
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const footerLinks = {
    info: [
      { text: "Contact Us", href: "#" },
      { text: "FAQs", href: "#", external: true }
    ],
    additional: [
      { text: "Our Work", href: "#" },
      { text: "Expert Team", href: "#" },
      { text: "Testimonials", href: "#" }
    ]
  }

  const contactInfo = [
    {
      title: "Corporate Office",
      value: "+62 899 077 632"
    },
    {
      title: "PHONE", 
      value: "+62 556 783 472"
    },
    {
      title: "Email",
      value: "yourwebsite@gmail.com"
    }
  ]

  return (
    <footer className="w-full bg-[#0f1326] py-[50px] sm:py-[70px] lg:py-[144px] px-4 sm:px-6 lg:px-10">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="bg-[#0f1326] rounded-[30px] p-6 sm:p-8 lg:p-[58px] w-full">
          
          <div className="flex flex-col gap-[40px] sm:gap-[45px] lg:gap-[50px] items-center w-full">
            
            {/* Main Footer Content */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 w-full mt-[22px]">
              
              {/* Newsletter Section */}
              <div className="flex flex-col gap-[200px] sm:gap-[250px] lg:gap-[308px] items-start w-full lg:w-[26%] self-center h-auto">
                
                <h3 className="text-[24px] sm:text-[26px] lg:text-[28px] font-poppins font-normal leading-[27px] sm:leading-[30px] lg:leading-[33px] text-left text-white w-[86%] mt-6">
                  Subscribe to our newsletter
                </h3>
                
                <div className="bg-[#161d3a] rounded-xl p-6 w-full">
                  <div className="flex flex-col gap-2 items-center w-full">
                    <div className="flex justify-between items-center w-full">
                      <input
                        type="email"
                        placeholder="e.g jhonmail@email.co"
                        value={email}
                        onChange={handleEmailChange}
                        className="text-sm font-inter font-normal leading-tight text-left text-[#c9c9c9] bg-transparent border-none outline-none flex-1"
                      />
                      <button 
                        onClick={handleNewsletterSubmit}
                        className="hover:opacity-80 transition-opacity duration-200"
                      >
                        <img 
                          src="/images/img_arrow_right_white_a700.svg" 
                          alt="Submit" 
                          className="w-3 h-auto" 
                        />
                      </button>
                    </div>
                    <div className="w-full h-[1px] bg-white" />
                  </div>
                </div>
              </div>

              {/* Navigation Links Section */}
              <div className="flex flex-col gap-10 items-center w-full lg:w-[66%] mt-[18px]">
                
                {/* Tab Navigation */}
                <div className="flex items-center gap-6 w-full">
                  <p className="text-[18px] sm:text-[20px] font-poppins font-normal leading-[24px] sm:leading-[30px] text-left text-[#c9c9c9]">
                    For applicants
                  </p>
                  <span className="text-[18px] sm:text-[20px] font-inter font-normal leading-tight text-left text-white mx-6">
                    /
                  </span>
                  <p className="text-[18px] sm:text-[20px] font-poppins font-normal leading-[24px] sm:leading-[30px] text-left text-[#c9c9c9]">
                    For Customer
                  </p>
                </div>

                {/* Categories */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 w-full">
                  <h4 className="text-xs font-public-sans font-medium leading-tight text-left uppercase text-[#c9c9c9]">
                    Info
                  </h4>
                  <h4 className="text-xs font-poppins font-medium leading-snug text-left uppercase text-[#c9c9c9] sm:mr-[332px]">
                    Additional Link
                  </h4>
                </div>

                {/* Links Grid */}
                <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-0 w-full">
                  
                  {/* Info Links */}
                  <div className="flex flex-col gap-0 items-start w-full sm:w-[52%]">
                    {footerLinks.info.map((link, index) => (
                      <div key={index} className="flex items-start gap-2 mb-4">
                        <a 
                          href={link.href}
                          className="text-base font-poppins font-normal leading-normal text-left text-[#c9c9c9] hover:text-white transition-colors duration-200"
                        >
                          {link.text}
                        </a>
                        {link.external && (
                          <img 
                            src="/images/img_external.svg" 
                            alt="External" 
                            className="w-[10px] h-[10px] mt-1.5 ml-2" 
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Additional Links */}
                  <div className="flex flex-col items-start self-center w-auto">
                    {footerLinks.additional.map((link, index) => (
                      <a 
                        key={index}
                        href={link.href}
                        className="text-base font-poppins font-normal leading-normal text-left text-[#c9c9c9] hover:text-white transition-colors duration-200 mb-2"
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Content */}
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-0 w-full">
              
              {/* Logo */}
              <img 
                src="/images/img_vector_white_a700.svg" 
                alt="Footer Logo" 
                className="w-[100px] sm:w-[115px] lg:w-[130px] h-auto" 
              />

              {/* Contact Information */}
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-[46px] items-center self-center w-full lg:flex-1 px-0 sm:px-8 lg:px-14">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex flex-col gap-2 items-start w-auto">
                    <h5 className="text-sm font-poppins font-medium leading-tight uppercase text-white">
                      {info.title}
                    </h5>
                    <p className="text-base font-poppins font-normal leading-normal text-left text-[#c9c9c9]">
                      {info.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 w-full">
              
              <p className="text-xs font-public-sans font-normal leading-tight text-left text-[#c9c9c9] mb-4 lg:mb-0">
                © 2026 — Copyright
              </p>

              {/* Address */}
              <div className="flex flex-col gap-2 items-start self-start w-full lg:flex-1 mb-5 lg:mb-0 ml-0 lg:ml-[336px]">
                <h5 className="text-sm font-poppins font-medium leading-tight uppercase text-white">
                  Address
                </h5>
                <p className="text-base font-poppins font-normal leading-normal text-left text-[#c9c9c9]">
                  123 Fashion Street, Jakarta, NY 10001, Indonesia
                </p>
              </div>

              {/* Language Options */}
              <div className="flex items-center justify-end gap-6 w-auto">
                <span className="text-base font-inter font-medium leading-tight uppercase text-[#c9c9c9]">
                  En
                </span>
                <span className="text-base font-inter font-medium leading-tight uppercase text-[#c9c9c9]">
                  Se  
                </span>
                <span className="text-base font-inter font-medium leading-tight uppercase text-[#c9c9c9]">
                  De
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}