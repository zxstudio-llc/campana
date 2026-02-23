'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { text: "About", active: true },
    { text: "Features", active: false },
    { text: "Technology", active: false },
    { text: "Product", active: false }
  ];

  return (
    <section className="w-full bg-secondary-background">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-4 lg:py-6">
          {/* Logo */}
          <div className="flex-shrink-0 mt-2">
            <img 
              src="/images/img_header_logo.svg" 
              alt="Logo" 
              className="w-[100px] sm:w-[120px] lg:w-[146px] h-auto"
            />
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-[68px]">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                role="menuitem"
                className={`text-base font-poppins transition-all duration-200 hover:opacity-80 ${
                  item?.active 
                    ? 'font-bold text-text-secondary' :'font-normal text-text-secondary'
                }`}
              >
                {item?.text}
              </button>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              text="Sign Up"
              text_font_size="16"
              text_font_family="Poppins"
              text_font_weight="400"
              text_line_height="24px"
              text_text_align="center"
              text_color="#ffffff"
              fill_background_color="#2d2d2d"
              border_border_radius="20px"
              padding="8px 24px"
              className="hover:opacity-90 focus:ring-2 focus:ring-gray-500"
            />
            <Button
              text="Login"
              text_font_size="16"
              text_font_family="Poppins"
              text_font_weight="400"
              text_line_height="24px"
              text_text_align="center"
              text_color="#ffffff"
              fill_background_color="#0050ff"
              border_border_radius="20px"
              padding="8px 24px"
              className="hover:opacity-90 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mobile Hamburger Menu */}
          <button 
            className="block lg:hidden p-3 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile Menu Overlay */}
          <div className={`${menuOpen ? 'block' : 'hidden'} lg:hidden absolute top-full left-0 w-full bg-secondary-background shadow-lg z-50 border-t border-border-primary`}>
            <nav className="flex flex-col p-4 space-y-4">
              {menuItems?.map((item, index) => (
                <button
                  key={index}
                  role="menuitem"
                  className={`text-left py-2 text-base font-poppins transition-all duration-200 hover:opacity-80 ${
                    item?.active 
                      ? 'font-bold text-text-secondary' :'font-normal text-text-secondary'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item?.text}
                </button>
              ))}
              
              {/* Mobile Action Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t border-border-primary">
                <Button
                  text="Sign Up"
                  text_font_size="16"
                  text_font_family="Poppins"
                  text_font_weight="400"
                  text_line_height="24px"
                  text_text_align="center"
                  text_color="#ffffff"
                  fill_background_color="#2d2d2d"
                  border_border_radius="20px"
                  padding="8px 24px"
                  className="w-full hover:opacity-90 focus:ring-2 focus:ring-gray-500"
                  onClick={() => setMenuOpen(false)}
                />
                <Button
                  text="Login"
                  text_font_size="16"
                  text_font_family="Poppins"
                  text_font_weight="400"
                  text_line_height="24px"
                  text_text_align="center"
                  text_color="#ffffff"
                  fill_background_color="#0050ff"
                  border_border_radius="20px"
                  padding="8px 24px"
                  className="w-full hover:opacity-90 focus:ring-2 focus:ring-blue-500"
                  onClick={() => setMenuOpen(false)}
                />
              </div>
            </nav>
          </div>
        </header>
      </div>
    </section>
  );
};

export default Header;