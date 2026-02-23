import { alpha, Theme, Components } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import { toggleButtonClasses } from '@mui/material/ToggleButton';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { tasman, navy } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const inputsCustomizations: Components<Theme> = {
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        boxSizing: 'border-box',
        transition: 'all 100ms ease-in',
        '&:focus-visible': {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderRadius: (theme.vars || theme).shape.borderRadius,
        textTransform: 'none',
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.25rem',
              padding: '8px 12px',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem',
            },
          },
          {
            props: {
              color: 'primary',
              variant: 'contained',
            },
            style: {
              color: 'white',
              backgroundColor: tasman[900],
              backgroundImage: `linear-gradient(to bottom, ${tasman[700]}, ${tasman[800]})`,
              boxShadow: `inset 0 1px 0 ${tasman[600]}, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
              border: `1px solid ${tasman[700]}`,
              '&:hover': {
                backgroundImage: 'none',
                backgroundColor: tasman[700],
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: tasman[800],
              },
              ...theme.applyStyles('dark', {
                color: 'black',
                backgroundColor: tasman[50],
                backgroundImage: `linear-gradient(to bottom, ${tasman[100]}, ${tasman[50]})`,
                boxShadow: 'inset 0 -1px 0  hsl(220, 30%, 80%)',
                border: `1px solid ${tasman[50]}`,
                '&:hover': {
                  backgroundImage: 'none',
                  backgroundColor: tasman[300],
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: tasman[400],
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'contained',
            },
            style: {
              color: (theme.vars || theme).palette.text.secondary,
              backgroundColor: (theme.vars || theme).palette.primary.dark,
              backgroundImage: 'none',
              boxShadow: 'none',
              border: `1px solid ${navy[950]}`,
              '&:hover': {
                backgroundColor: navy[900],
                border: `1px solid ${navy[900]}`,
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: navy[700],
                border: `1px solid ${navy[700]}`,
                backgroundImage: 'none',
              },
            },
          },
          {
            props: {
              variant: 'outlined',
            },
            style: {
              color: (theme.vars || theme).palette.text.primary,
              border: '1px solid',
              borderColor: tasman[200],
              backgroundColor: alpha(tasman[50], 0.3),
              '&:hover': {
                backgroundColor: tasman[100],
                borderColor: tasman[300],
              },
              '&:active': {
                backgroundColor: tasman[200],
              },
              ...theme.applyStyles('dark', {
                backgroundColor: tasman[800],
                borderColor: tasman[700],

                '&:hover': {
                  backgroundColor: tasman[900],
                  borderColor: tasman[600],
                },
                '&:active': {
                  backgroundColor: tasman[900],
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'outlined',
            },
            style: {
              color: navy[700],
              border: '1px solid',
              borderColor: navy[200],
              backgroundColor: navy[50],
              '&:hover': {
                backgroundColor: navy[100],
                borderColor: navy[400],
              },
              '&:active': {
                backgroundColor: alpha(navy[200], 0.7),
              },
              ...theme.applyStyles('dark', {
                color: navy[50],
                border: '1px solid',
                borderColor: navy[900],
                backgroundColor: alpha(navy[900], 0.3),
                '&:hover': {
                  borderColor: navy[700],
                  backgroundColor: alpha(navy[900], 0.6),
                },
                '&:active': {
                  backgroundColor: alpha(navy[900], 0.5),
                },
              }),
            },
          },
          {
            props: {
              variant: 'text',
            },
            style: {
              color: tasman[600],
              '&:hover': {
                backgroundColor: tasman[100],
              },
              '&:active': {
                backgroundColor: tasman[200],
              },
              ...theme.applyStyles('dark', {
                color: tasman[50],
                '&:hover': {
                  backgroundColor: tasman[700],
                },
                '&:active': {
                  backgroundColor: alpha(tasman[700], 0.7),
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'text',
            },
            style: {
              color: navy[700],
              '&:hover': {
                backgroundColor: alpha(navy[100], 0.5),
              },
              '&:active': {
                backgroundColor: alpha(navy[200], 0.7),
              },
              ...theme.applyStyles('dark', {
                color: navy[100],
                '&:hover': {
                  backgroundColor: alpha(navy[900], 0.5),
                },
                '&:active': {
                  backgroundColor: alpha(navy[900], 0.3),
                },
              }),
            },
          },
        ],
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderRadius: (theme.vars || theme).shape.borderRadius,
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 0,
        color: (theme.vars || theme).palette.text.secondary,
        border: '1px solid ',
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },
        '&:active': {
          backgroundColor: 'transparent',
        },
        ...theme.applyStyles('dark', {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          },
          '&:active': {
            backgroundColor: 'transparent',
          },
        }),
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              width: '2.25rem',
              height: '2.25rem',
              padding: '0.25rem',
              [`& .${svgIconClasses.root}`]: { fontSize: '1rem' },
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              width: '2.5rem',
              height: '2.5rem',
            },
          },
        ],
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '10px',
        boxShadow: `0 4px 16px ${alpha(tasman[400], 0.2)}`,
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: navy[500],
        },
        ...theme.applyStyles('dark', {
          [`& .${toggleButtonGroupClasses.selected}`]: {
            color: '#fff',
          },
          boxShadow: `0 4px 16px ${alpha(navy[700], 0.5)}`,
        }),
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '12px 16px',
        textTransform: 'none',
        borderRadius: '10px',
        fontWeight: 500,
        ...theme.applyStyles('dark', {
          color: tasman[400],
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
          [`&.${toggleButtonClasses.selected}`]: {
            color: navy[300],
          },
        }),
      }),
    },
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      icon: (
        <CheckBoxOutlineBlankRoundedIcon sx={{ color: 'hsla(210, 0%, 0%, 0.0)' }} />
      ),
      checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
      indeterminateIcon: <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        margin: 10,
        height: 16,
        width: 16,
        borderRadius: 5,
        border: '1px solid ',
        borderColor: alpha(tasman[300], 0.8),
        boxShadow: '0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset',
        backgroundColor: alpha(tasman[100], 0.4),
        transition: 'border-color, background-color, 120ms ease-in',
        '&:hover': {
          borderColor: navy[300],
        },
        '&.Mui-focusVisible': {
          outline: `3px solid ${alpha(navy[500], 0.5)}`,
          outlineOffset: '2px',
          borderColor: navy[400],
        },
        '&.Mui-checked': {
          color: 'white',
          backgroundColor: navy[500],
          borderColor: navy[500],
          boxShadow: `none`,
          '&:hover': {
            backgroundColor: navy[600],
          },
        },
        ...theme.applyStyles('dark', {
          borderColor: alpha(tasman[700], 0.8),
          boxShadow: '0 0 0 1.5px hsl(210, 0%, 0%) inset',
          backgroundColor: alpha(tasman[900], 0.8),
          '&:hover': {
            borderColor: navy[300],
          },
          '&.Mui-focusVisible': {
            borderColor: navy[400],
            outline: `3px solid ${alpha(navy[500], 0.5)}`,
            outlineOffset: '2px',
          },
        }),
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: 'none',
      },
      input: {
        '&::placeholder': {
          opacity: 0.7,
          color: tasman[500],
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: 0,
      },
      root: ({ theme }) => ({
        padding: '8px 12px',
        color: (theme.vars || theme).palette.text.primary,
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundColor: (theme.vars || theme).palette.background.default,
        transition: 'border 120ms ease-in',
        '&:hover': {
          borderColor: tasman[400],
        },
        [`&.${outlinedInputClasses.focused}`]: {
          outline: `3px solid ${alpha(navy[500], 0.5)}`,
          borderColor: navy[400],
        },
        ...theme.applyStyles('dark', {
          '&:hover': {
            borderColor: tasman[500],
          },
        }),
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.25rem',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem',
            },
          },
        ],
      }),
      notchedOutline: {
        border: 'none',
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.grey[500],
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[400],
        }),
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        typography: theme.typography.caption,
        marginBottom: 8,
      }),
    },
  },
};