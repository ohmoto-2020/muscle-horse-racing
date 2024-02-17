import React from "react";
import { Box, Typography } from "@mui/material";
import { HorseIcon } from "./icons/horse";
import { useRouter } from "next/router";
import { theme } from "@/pages/_app";

const Header = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  return (
    <Box
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
        <HorseIcon color="white" />
        <Typography sx={{ fontSize: "24px", ml: "8px", color: "white", fontWeight: "bold" }}>
          キンニクケイバ
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "10px", color: "white" }}>でログイン中</Typography>
    </Box>
  );
};

export default Header;
