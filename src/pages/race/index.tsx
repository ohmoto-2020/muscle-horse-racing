import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GetStaticProps } from "next";
import { Race } from "@/types/race";
import prisma from "lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const races = await prisma.race.findMany({
    include: {
      racecourse: true,
      racetrackCondition: true,
      racetrackDistance: true,
    },
  });

  const serializedRaces = races.map((race) => ({
    ...race,
    eventDate: race.eventDate.toISOString(),
    createdAt: race.createdAt.toISOString(),
    racecourse: {
      ...race.racecourse,
    },
    racetrackCondition: {
      ...race.racetrackCondition,
      createdAt: race.racetrackCondition.createdAt.toISOString(),
    },
    racetrackDistance: {
      ...race.racetrackDistance,
    },
  }));
  return {
    props: { races: serializedRaces },
    revalidate: 10,
  };
};

type Props = {
  races: Race[];
};

export default function RacePage(props: Props) {
  const { races } = props;

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "racecourse",
      headerName: "競馬場",
      width: 80,
      valueGetter: (params) => params.row.racecourse?.name || "",
    },
    {
      field: "eventDate",
      headerName: "開催日",
      width: 120,
      valueGetter: (params) => params.row.eventDate.split("T")[0],
    },
    { field: "raceNumber", headerName: "レース番号", width: 100 },
    {
      field: "racetrackCondition",
      headerName: "馬場",
      width: 70,
      valueGetter: (params) => params.row.racetrackCondition?.conditionName || "",
    },
    {
      field: "racetrackDistance",
      headerName: "距離",
      width: 70,
      valueGetter: (params) => params.row.racetrackDistance?.distance || "",
    },
  ];

  return (
    <>
      <Typography sx={{ mb: "8px" }}>レース一覧</Typography>
      <Box>
        <DataGrid rows={races} columns={columns} />
      </Box>
    </>
  );
}
