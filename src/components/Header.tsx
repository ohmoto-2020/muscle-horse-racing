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
        position: "fixed", // ヘッダーを固定
        top: 0, // 上部から0の位置に
        left: 0, // 左端から0の位置に
        width: "100%", // 幅を100%に設定
        zIndex: 1100, // 他の要素より上に表示
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
    </Box>
  );
};

export default Header;
