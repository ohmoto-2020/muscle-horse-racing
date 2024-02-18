import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { GetStaticProps } from "next";
import { Race } from "@/types/race";
import prisma from "lib/prisma";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { useState } from "react";
import { ScrapingDialog } from "@/components/scraping-dialog";
import { Racecourse } from "@/types/racecourse";

export const getStaticProps: GetStaticProps = async () => {
  const races = await prisma.race.findMany({
    include: {
      racecourse: true,
      racetrackCondition: true,
      racetrackDistance: true,
    },
  });
  const racecourses = await prisma.racecourse.findMany();

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
    props: { races: serializedRaces, racecourses },
    revalidate: 10,
  };
};

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiTablePagination-selectLabel": {
      display: "none",
    },
    "& .MuiTablePagination-input": {
      display: "none",
    },
  },
}));

type Props = {
  races: Race[];
  racecourses: Racecourse[];
};

export default function RacePage(props: Props) {
  const { races, racecourses } = props;
  const router = useRouter();

  const columns = [
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

  const handleClick = (params: GridRowParams) => {
    router.push(`/race/${params.row.id}`);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleGet = async (racecourseCode: number, raceNumber: number) => {
    console.log(raceNumber, racecourseCode);
    // try {
    //   const response = await fetch('/api/races', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       racecourseCode,
    //       raceNumber,
    //     }),
    //   });
    //   if (!response.ok) {
    //     throw new Error('スクレイピングに失敗しました');
    //   }
    //   // スクレイピング結果の処理...
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <ScrapingDialog
        isOpen={isOpen}
        onGet={handleGet}
        onClose={() => setIsOpen(false)}
        racecourses={racecourses}
      />

      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "20px" }}
      >
        <Typography sx={{ fontWeight: "bold" }}>レース一覧</Typography>
        <Button variant="contained" onClick={handleOpen}>
          レース情報取得
        </Button>
      </Box>
      <Box maxHeight="90vh">
        <DataGrid
          className={useStyles().root}
          rows={races}
          columns={columns}
          onRowClick={(e) => handleClick(e)}
          hideFooterSelectedRowCount={true}
          disableRowSelectionOnClick
          pagination
        />
      </Box>
    </>
  );
}
