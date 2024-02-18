import React from "react";
import { AppBar, Box, Typography } from "@mui/material";
import { HorseIcon } from "./icons/horse";
import { useRouter } from "next/router";
import { theme } from "@/pages/_app";

const Header = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  return (
    <AppBar
      onClick={handleClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.palette.primary.main,
        p: "10px 20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <HorseIcon color="#fff" />
        <Typography sx={{ fontSize: "24px", ml: "8px", color: "#fff", fontWeight: "bold" }}>
          キンニクケイバ
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "10px", color: "#fff" }}>でログイン中</Typography>
    </AppBar>
  );
};

export default Header;
