'use client';

import React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonClasses = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'hover:opacity-90 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border-2 bg-transparent hover:bg-opacity-10 focus:ring-blue-500',
      },
      size: {
        small: 'text-sm px-3 py-1.5',
        medium: 'text-base px-4 py-2',
        large: 'text-lg px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

const Button = ({
  // Required parameters with defaults
  text = "Button",
  text_font_size = "16",
  text_font_family = "Poppins",
  text_font_weight = "400",
  text_line_height = "24px",
  text_text_align = "left",
  text_color = "#ffffff",
  fill_background_color = "#2d2d2d",
  border_border_radius = "20px",
  
  // Optional parameters (no defaults)
  border_border,
  text_text_transform,
  layout_align_self,
  layout_width,
  padding,
  position,
  margin,
  layout_gap,
  
  // Standard React props
  variant,
  size,
  disabled = false,
  className,
  children,
  onClick,
  type = "button",
  ...props
}) => {
  // Safe validation for optional parameters
  const hasValidBorder = border_border && typeof border_border === 'string' && border_border?.trim() !== '';
  const hasValidTextTransform = text_text_transform && typeof text_text_transform === 'string' && text_text_transform?.trim() !== '';
  const hasValidAlignSelf = layout_align_self && typeof layout_align_self === 'string' && layout_align_self?.trim() !== '';
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding?.trim() !== '';
  const hasValidMargin = margin && typeof margin === 'string' && margin?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap?.trim() !== '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidTextTransform ? `${text_text_transform}` : '',
    hasValidAlignSelf ? `self-${layout_align_self}` : '',
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidMargin ? `m-[${margin}]` : '',
    hasValidPosition ? position : '',
    hasValidGap ? `gap-[${layout_gap}]` : '',
  ]?.filter(Boolean)?.join(' ');

  // Map style values to Tailwind classes
  const getFontSize = (size) => {
    const mapping = {
      "16": "text-base",
      "14": "text-sm",
      "20": "text-lg",
      "24": "text-xl",
    };
    return mapping?.[size] || `text-[${size}px]`;
  };

  const getFontWeight = (weight) => {
    const mapping = {
      "400": "font-normal",
      "500": "font-medium",
      "600": "font-semibold",
      "700": "font-bold",
    };
    return mapping?.[weight] || `font-[${weight}]`;
  };

  const getLineHeight = (height) => {
    const mapping = {
      "24px": "leading-normal",
      "12px": "leading-tight",
      "30px": "leading-relaxed",
    };
    return mapping?.[height] || `leading-[${height}]`;
  };

  const getBorderRadius = (radius) => {
    const mapping = {
      "20px": "rounded-lg",
      "12px": "rounded-sm",
      "16px": "rounded-base",
      "18px": "rounded-md",
    };
    return mapping?.[radius] || `rounded-[${radius}]`;
  };

  const getBackgroundColor = (color) => {
    const mapping = {
      "#2d2d2d": "bg-accent-background",
      "#0050ff": "bg-primary-dark",
      "#8a71fe": "bg-primary-background",
    };
    return mapping?.[color] || `bg-[${color}]`;
  };

  const getTextColor = (color) => {
    const mapping = {
      "#ffffff": "text-primary-foreground",
      "#121416": "text-text-primary",
      "#353535": "text-text-secondary",
    };
    return mapping?.[color] || `text-[${color}]`;
  };

  // Build component classes
  const componentClasses = [
    getFontSize(text_font_size),
    `font-[${text_font_family}]`,
    getFontWeight(text_font_weight),
    getLineHeight(text_line_height),
    `text-${text_text_align}`,
    getTextColor(text_color),
    getBackgroundColor(fill_background_color),
    getBorderRadius(border_border_radius),
    hasValidBorder ? `border ${border_border}` : '',
  ]?.filter(Boolean)?.join(' ');

  // Safe click handler
  const handleClick = (event) => {
    if (disabled) return;
    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={twMerge(
        buttonClasses({ variant, size }),
        componentClasses,
        optionalClasses,
        className
      )}
      aria-disabled={disabled}
      {...props}
    >
      {children || text}
    </button>
  );
};

export default Button;