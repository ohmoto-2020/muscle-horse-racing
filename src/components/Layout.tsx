import React, { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import { useRouter } from "next/router";
import { CircularProgress, Container } from "@mui/material";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <div>
      <Header />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Container maxWidth="xs" sx={{ mt: "75px", py: "20px" }}>
          {props.children}
        </Container>
      )}
    </div>
  );
};

export default Layout;
