import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { GetStaticProps } from "next";
import { Race } from "@/types/race";
import prisma from "lib/prisma";
import { useRouter } from "next/router";
import { useState } from "react";
import { ScrapingDialog } from "@/components/scraping-dialog";
import { Racecourse } from "@/types/racecourse";

export const getStaticProps: GetStaticProps = async () => {
  const races = await prisma.race.findMany({
    include: {
      racecourse: true,
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
  }));
  return {
    props: { races: serializedRaces, racecourses },
    revalidate: 10,
  };
};

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
      width: 100,
      valueGetter: (params) => params.row.eventDate.split("T")[0],
    },
    { field: "raceNumber", headerName: "レース", sortable: false, width: 70 },
    {
      field: "racetrackCondition",
      headerName: "馬場",
      sortable: false,
      width: 50,
    },
    {
      field: "racetrackDistance",
      headerName: "距離",
      sortable: false,
      width: 70,
    },
  ];

  const handleClick = (params: GridRowParams) => {
    router.push(`/race/${params.row.id}`);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleGet = async (racecourseCode: number, raceNumber: number) => {
    const response = await fetch("/api/scrapeRace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ racecourseCode, raceNumber }),
    });

    if (response.ok) {
      const data = await response.json();
      const scrapedData = {
        racecourseCode,
        raceNumber,
        racetrackCondition: data.raceInfo.condition,
        racetrackDistance: data.raceInfo.distance,
        horses: data.horseDate,
      };
      const saveResponse = await fetch("/api/saveScrapedData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scrapedData),
      });

      if (saveResponse.ok) {
        console.log("データの保存に成功しました");
      } else {
        console.error("データの保存に失敗しました");
      }
    } else {
      console.error("スクレイピングに失敗しました");
    }
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
          rows={races}
          columns={columns}
          disableColumnMenu
          onRowClick={(e) => handleClick(e)}
          hideFooterSelectedRowCount={true}
          disableRowSelectionOnClick
          pagination
          sx={{
            "& .MuiTablePagination-selectLabel": {
              display: "none",
            },
            "& .MuiTablePagination-input": {
              display: "none",
            },
          }}
        />
      </Box>
    </>
  );
}
