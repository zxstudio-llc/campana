import { createTheme, alpha, PaletteMode, Shadows, PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    highlighted: true;
  }
}
declare module '@mui/material/styles' {
  
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  }

  interface Palette {
    icon: PaletteColor;
    moss: ColorRange;
    sage: ColorRange;
    sand: ColorRange;
    baseShadow: string;
  }
  interface PaletteOptions {
    icon?: PaletteColorOptions;
    moss?: Partial<ColorRange>;
    sage?: Partial<ColorRange>;
    sand?: Partial<ColorRange>;
    baseShadow?: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    baseShadow: string;
  }
}

const defaultTheme = createTheme();

const customShadows: Shadows = [...defaultTheme.shadows];

export const navy = {
  50: 'hsl(208, 100%, 97%)',
  100: 'hsl(210, 94%, 94%)',
  200: 'hsl(207, 92%, 86%)',
  300: 'hsl(205, 93%, 74%)',
  400: 'hsl(204, 91%, 60%)',
  500: 'hsl(205, 87%, 48%)',
  600: 'hsl(206, 96%, 39%)',
  700: 'hsl(207, 94%, 32%)',
  800: 'hsl(207, 89%, 27%)',
  900: 'hsl(208, 79%, 24%)',
  950: 'hsl(209, 78%, 16%)',
};

export const olive = {
  50: 'hsl(60, 43%, 96%)',
  100: 'hsl(58, 41%, 90%)',
  200: 'hsl(59, 41%, 80%)',
  300: 'hsl(60, 39%, 67%)',
  400: 'hsl(60, 37%, 55%)',
  500: 'hsl(62, 35%, 44%)',
  600: 'hsl(62, 36%, 37%)',
  700: 'hsl(64, 34%, 27%)',
  800: 'hsl(64, 30%, 23%)',
  900: 'hsl(65, 26%, 20%)',
  950: 'hsl(67, 33%, 10%)',
};

export const tasman = {
  50: 'hsl(100, 11%, 96%)',
  100: 'hsl(100, 15%, 93%)',
  200: 'hsl(107, 13%, 85%)',
  300: 'hsl(107, 14%, 79%)',
  400: 'hsl(109, 15%, 58%)',
  500: 'hsl(109, 14%, 46%)',
  600: 'hsl(110, 16%, 37%)',
  700: 'hsl(111, 15%, 29%)',
  800: 'hsl(112, 14%, 24%)',
  900: 'hsl(111, 13%, 20%)',
  950: 'hsl(113, 18%, 10%)',
};

export const green = {
  50: 'hsl(160, 55%, 96%)',
  100: 'hsl(159, 61%, 89%)',
  200: 'hsl(163, 58%, 78%)',
  300: 'hsl(163, 51%, 65%)',
  400: 'hsl(164, 44%, 51%)',
  500: 'hsl(164, 52%, 40%)',
  600: 'hsl(166, 54%, 31%)',
  700: 'hsl(167, 50%, 26%)',
  800: 'hsl(167, 46%, 22%)',
  900: 'hsl(166, 39%, 17%)',
  950: 'hsl(170, 53%, 10%)',
};

export const botticelli ={
  50: 'hsl(206, 38%, 97%)',
  100: 'hsl(200, 47%, 94%)',
  200: 'hsl(200, 52%, 85%)',
  300: 'hsl(198, 48%, 74%)',
  400: 'hsl(198, 51%, 60%)',
  500: 'hsl(198, 44%, 49%)',
  600: 'hsl(200, 49%, 40%)',
  700: 'hsl(200, 49%, 32%)',
  800: 'hsl(200, 46%, 27%)',
  900: 'hsl(202, 41%, 24%)',
  950: 'hsl(203, 41%, 16%)',
}

export const beige = {
  50: 'hsl(45, 20%, 96%)',
  100: 'hsl(54, 17%, 89%)',
  200: 'hsl(56, 17%, 83%)',
  300: 'hsl(51, 19%, 72%)',
  400: 'hsl(47, 18%, 61%)',
  500: 'hsl(44, 18%, 53%)',
  600: 'hsl(40, 17%, 48%)',
  700: 'hsl(37, 16%, 41%)',
  800: 'hsl(36, 14%, 34%)',
  900: 'hsl(35, 13%, 28%)',
  950: 'hsl(30, 13%, 15%)',
}

export const cararra = {
  50: 'hsl(60, 11%, 96%)',
  100: 'hsl(66, 17%, 93%)',
  200: 'hsl(66, 13%, 83%)',
  300: 'hsl(66, 15%, 72%)',
  400: 'hsl(63, 14%, 61%)',
  500: 'hsl(60, 14%, 53%)',
  600: 'hsl(56, 15%, 48%)',
  700: 'hsl(53, 14%, 41%)',
  800: 'hsl(51, 12%, 34%)',
  900: 'hsl(48, 11%, 28%)',
  950: 'hsl(40, 13%, 15%)',
}

export const snow = {
  50: 'hsl(80, 14%, 96%)',
  100: 'hsl(86, 19%, 92%)',
  200: 'hsl(76, 17%, 83%)',
  300: 'hsl(74, 19%, 72%)',
  400: 'hsl(69, 19%, 61%)',
  500: 'hsl(65, 20%, 53%)',
  600: 'hsl(62, 20%, 48%)',
  700: 'hsl(58, 18%, 41%)',
  800: 'hsl(54, 16%, 34%)',
  900: 'hsl(56, 16%, 28%)',
  950: 'hsl(52, 17%, 15%)',
}

export const orange = {
  50: 'hsl(45, 100%, 97%)',
  100: 'hsl(45, 92%, 90%)',
  200: 'hsl(45, 94%, 80%)',
  300: 'hsl(45, 90%, 65%)',
  400: 'hsl(45, 90%, 40%)',
  500: 'hsl(45, 90%, 35%)',
  600: 'hsl(45, 91%, 25%)',
  700: 'hsl(45, 94%, 20%)',
  800: 'hsl(45, 95%, 16%)',
  900: 'hsl(45, 93%, 12%)',
};

export const red = {
  50: 'hsl(353, 82%, 97%)',
  100: 'hsl(353, 91%, 94%)',
  200: 'hsl(355, 90%, 89%)',
  300: 'hsl(355, 90%, 82%)',
  400: 'hsl(355, 87%, 71%)',
  500: 'hsl(355, 83%, 60%)',
  600: 'hsl(355, 70%, 51%)',
  700: 'hsl(355, 71%, 40%)',
  800: 'hsl(355, 68%, 35%)',
  900: 'hsl(355, 61%, 31%)',
  950: 'hsl(355, 72%, 15%)',
};

export const bluewood = {
  50: 'hsl(210, 25%, 97%)',
  100: 'hsl(214, 32%, 94%)',
  200: 'hsl(211, 32%, 86%)',
  300: 'hsl(210, 31%, 74%)',
  400: 'hsl(209, 32%, 60%)',
  500: 'hsl(209, 31%, 49%)',
  600: 'hsl(210, 35%, 39%)',
  700: 'hsl(211, 34%, 32%)',
  800: 'hsl(211, 31%, 27%)',
  900: 'hsl(212, 28%, 24%)',
  950: 'hsl(214, 28%, 16%)',
}

export const brandColors = {
  navy,
  botticelli,
  bluewood,
  olive,
  tasman,
  green,
  cararra,
  snow,
  beige,
  orange,
  red
};

export const getDesignTokens = (mode: PaletteMode) => {
  customShadows[1] =
    mode === 'dark'
      ? 'hsla(214, 28%, 16%, 0.7) 0px 4px 16px 0px, hsla(212, 28%, 24%, 0.8) 0px 8px 16px -5px'
      : 'hsla(214, 28%, 16%, 0.07) 0px 4px 16px 0px, hsla(212, 28%, 24%, 0.07) 0px 8px 16px -5px';

  return {
    palette: {
      mode,
      primary: {
        light: brandColors.cararra[500],
        main: brandColors.navy[400],
        dark: brandColors.navy[950],
        contrastText: brandColors.navy[50],
      },
      secondary: {
        light: brandColors.olive[200],
        main: brandColors.olive[400],
        dark: brandColors.olive[700],
        contrastText: brandColors.olive[50],
      },
      info: {
        light: brandColors.botticelli[200],
        main: brandColors.botticelli[400],
        dark: brandColors.botticelli[600],
        contrastText: brandColors.botticelli[950],
      },
      warning: {
        light: brandColors.orange[300],
        main: brandColors.orange[400],
        dark: brandColors.orange[800],
      },
      error: {
        light: brandColors.red[300],
        main: brandColors.red[400],
        dark: brandColors.red[800],
      },
      success: {
        light: brandColors.green[300],
        main: brandColors.green[400],
        dark: brandColors.green[800],
      },
      icon: {
        light: brandColors.snow[300],
        main: brandColors.snow[400],
        dark: brandColors.snow[800],
      },
      grey: {
        ...brandColors.bluewood,
      },
      divider: mode === 'dark' 
        ? alpha(brandColors.bluewood[700], 0.6) 
        : alpha(brandColors.bluewood[300], 0.4),
      background: {
        default: brandColors.cararra[200],
        paper: brandColors.snow[50],
      },
      text: {
        primary: brandColors.bluewood[950],
        secondary: brandColors.snow[50],
        warning: brandColors.orange[400],
        button: brandColors.bluewood[950],
      },
      action: {
        hover: alpha(brandColors.tasman[200], 0.2),
        selected: alpha(brandColors.tasman[200], 0.3),
      },
      neutralAlt: {
        ...brandColors.snow,
      }
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      h1: {
        fontSize: defaultTheme.typography.pxToRem(48),
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: -0.5,
      },
      h2: {
        fontSize: defaultTheme.typography.pxToRem(36),
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: defaultTheme.typography.pxToRem(30),
        lineHeight: 1.2,
      },
      h4: {
        fontSize: defaultTheme.typography.pxToRem(24),
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h5: {
        fontSize: defaultTheme.typography.pxToRem(20),
        fontWeight: 600,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
      },
      subtitle2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 500,
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(14),
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 400,
      },
      caption: {
        fontSize: defaultTheme.typography.pxToRem(12),
        fontWeight: 400,
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: customShadows,
  };
};

export const colorSchemes = {
  light: {
    palette: {
      primary: {
        light: brandColors.navy[200],
        main: brandColors.navy[400],
        dark: brandColors.navy[950],
        contrastText: brandColors.navy[50],
      },
      secondary: {
        light: brandColors.olive[200],
        main: brandColors.olive[400],
        dark: brandColors.olive[700],
        contrastText: brandColors.olive[50],
      },
      info: {
        light: brandColors.botticelli[200],
        main: brandColors.botticelli[400],
        dark: brandColors.botticelli[600],
        contrastText: '#ffffff',
      },
      warning: {
        light: brandColors.orange[300],
        main: brandColors.orange[400],
        dark: brandColors.orange[800],
      },
      error: {
        light: brandColors.red[300],
        main: brandColors.red[400],
        dark: brandColors.red[800],
      },
      success: {
        light: brandColors.green[300],
        main: brandColors.green[400],
        dark: brandColors.green[800],
      },
      grey: {
        ...brandColors.bluewood,
      },
      divider: alpha(brandColors.bluewood[300], 0.4),
      background: {
        default: brandColors.snow[50],
        paper: brandColors.beige[50],
      },
      icon: {
        light: brandColors.snow[300],
        main: brandColors.snow[400],
        dark: brandColors.snow[800],
      },
      text: {
        primary: brandColors.bluewood[900],
        secondary: brandColors.cararra[50],
        warning: brandColors.orange[400],
        button: brandColors.bluewood[950],
      },
      action: {
        hover: alpha(brandColors.tasman[200], 0.2),
        selected: `${alpha(brandColors.tasman[200], 0.3)}`,
      },
      moss: { ...brandColors.snow },
      sage: { ...brandColors.tasman },
      sand: { ...brandColors.beige },
      baseShadow:
        'hsla(212, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(212, 25%, 10%, 0.07) 0px 8px 16px -5px',
    },
  },
};

export const typography = {
  fontFamily: 'Inter, sans-serif',
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(30),
    lineHeight: 1.2,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(18),
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14),
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 400,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
  },
};

export const shape = {
  borderRadius: 8,
};

// @ts-ignore
const defaultShadows: Shadows = [
  'none',
  'var(--template-palette-baseShadow)',
  ...defaultTheme.shadows.slice(2),
];
export const shadows = defaultShadows;