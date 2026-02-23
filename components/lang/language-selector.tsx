"use client";

import * as React from "react";
import {
  List,
  ListItemButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter, usePathname } from "next/navigation";

type Language = {
  code: string;
  name: string;
  flag: string;
};

export function LanguageSelector({ languages }: { languages: Language[] }) {
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split("/");
  const currentLang =
    ["en", "es", "zh"].includes(segments[1]) ? segments[1] : "en";

  const currentLanguage =
    languages.find((l) => l.code === currentLang) ?? languages[0];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleSelect = (langCode: string) => {
    const segments = pathname.split("/");

    if (["en", "es", "zh"].includes(segments[1])) {
      segments[1] = langCode;
    } else {
      segments.splice(1, 0, langCode);
    }

    router.push(segments.join("/"));
    setAnchorEl(null);
  };

  return (
    <>
      <List component="nav" sx={{ p: 0 }}>
      <ListItemButton
  disableRipple
  onClick={(e) => setAnchorEl(e.currentTarget)}
  sx={{
    gap: 1,
    px: 0,
    "&:hover": { backgroundColor: "transparent" },
  }}
>
  <Box
    component="img"
    src={currentLanguage.flag}
    width={20}
    alt={currentLanguage.name}
  />

  {!isMobile && (
    <Typography
      fontWeight={600}
      color="primary.dark"
      variant="body2"
    >
      {currentLanguage.name}
    </Typography>
  )}
</ListItemButton>
      </List>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          list: {
            role: "listbox",
          },
        }}
      >
        {languages.map((lang) => {
          const isActive = lang.code === currentLang;

          return (
            <MenuItem
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              disableRipple
              sx={{
                gap: 2,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Box component="img" src={lang.flag} width={20} />

              <Typography variant="body2">
                {lang.name}
              </Typography>

              {isActive && (
                <CheckIcon
                  fontSize="small"
                  sx={{ ml: "auto", color: "primary.main" }}
                />
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
