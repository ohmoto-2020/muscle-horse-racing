import React from "react";
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const handleClick = (pathName: string) => {
    router.push(`/${pathName}`);
  };

  return (
    <Container maxWidth="xs">
      <Grid container spacing={4} direction="column">
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => handleClick("race")}>
              <CardContent>
                <Typography gutterBottom component="div" textAlign="center">
                  レース一覧
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  レース一覧を確認できます
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => alert()}>
              <CardContent>
                <Typography gutterBottom component="div" textAlign="center">
                  みんなの得点
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  ユーザー全員の得点を確認できます
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
