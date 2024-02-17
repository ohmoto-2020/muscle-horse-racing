import React from "react";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const handleClick = (pathName: string) => {
    router.push(`/${pathName}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={() => handleClick("race")}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" textAlign="center">
                レース一覧
              </Typography>
              <Typography variant="body2" color="text.secondary">
                レース一覧を確認できます
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={() => alert()}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" textAlign="center">
                みんなの得点
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ユーザー全員の得点を確認できます
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
