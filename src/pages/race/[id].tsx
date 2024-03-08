import { Race } from "@/types/race";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import prisma from "lib/prisma";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { theme } from "../_app";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths = async () => {
  const races = await prisma.race.findMany();
  const paths = races.map((race) => ({
    params: { id: race.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id;
  const race = await prisma.race.findUnique({
    where: { id: parseInt(id as string) },
    include: {
      racecourse: true,
      raceResult: {
        include: {
          firstHorse: true,
          secondHorse: true,
          thirdHorse: true,
        },
      },
      horses: true,
    },
  });

  // DateオブジェクトをISO文字列に変換
  const serializedRace = JSON.parse(JSON.stringify(race));

  return {
    props: {
      race: serializedRace,
    },
  };
};

const headerStyle = {
  backgroundColor: theme.palette.secondary.main,
  color: "#fff",
};
const oddRowStyle = {
  backgroundColor: "#f5f5f5",
};

type Props = {
  race: Race;
};
export default function RaceDetail(props: Props) {
  const { race } = props;
  const router = useRouter();

  const handleBack = () => {
    router.push("/race");
  };

  return (
    <Stack spacing={3}>
      <Button onClick={handleBack} variant="outlined" sx={{ width: "80px" }}>
        もどる
      </Button>
      <Typography fontWeight="bold" fontSize="20px">
        レース詳細
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={headerStyle}>競馬場</TableCell>
              <TableCell style={headerStyle}>開催日</TableCell>
              <TableCell style={headerStyle}>馬場</TableCell>
              <TableCell style={headerStyle}>距離</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {race.racecourse.name}
              </TableCell>
              <TableCell>{race.eventDate.split("T")[0]}</TableCell>
              <TableCell>{race.racetrackCondition}</TableCell>
              <TableCell>{race.racetrackDistance}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {race.raceResult && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={headerStyle}>1着</TableCell>
                <TableCell style={headerStyle}>2着</TableCell>
                <TableCell style={headerStyle}>3着</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell scope="row">{race.raceResult.firstHorse.name}</TableCell>
                <TableCell scope="row">{race.raceResult.secondHorse.name}</TableCell>
                <TableCell scope="row">{race.raceResult.thirdHorse.name}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={headerStyle}>馬名</TableCell>
              <TableCell style={headerStyle}>馬番</TableCell>
              <TableCell style={headerStyle}>体重</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {race.horses.map((horse, index) => (
              <TableRow key={horse.id} style={index % 2 === 0 ? oddRowStyle : null}>
                <TableCell>{horse.name}</TableCell>
                <TableCell>{horse.entryNumber}</TableCell>
                <TableCell>{horse.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
