import { theme } from "@/pages/_app";
import { Racecourse } from "@/types/racecourse";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onGet: (racecourseCode: number, raceNumber: number) => void;
  racecourses: Racecourse[];
}
export const ScrapingDialog = (props: Props) => {
  const { isOpen, onClose, onGet, racecourses } = props;
  const [racecourseCode, setRacecourseCode] = useState<number>(racecourses[0].code);
  const [raceNumber, setRaceNumber] = useState<number>(1);

  const handleGetClick = () => {
    onGet(racecourseCode, raceNumber);
    onClose();
  };

  const handleClose = () => {
    onClose();
    setRaceNumber(1);
    setRacecourseCode(racecourses[0].code);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs">
      <DialogTitle
        sx={{
          mb: "16px",
          fontSize: "18px",
          backgroundColor: theme.palette.secondary.main,
          color: "#fff",
        }}
      >
        取得したいレースの情報を入力してください
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
          <Typography width="50%" textAlign="center">
            競馬場
          </Typography>
          <Select
            value={racecourses[0].code}
            onChange={(e) => setRacecourseCode(Number(e.target.value))}
            disabled
            variant="standard"
            sx={{ width: "50%" }}
          >
            {racecourses.map((racecourse) => (
              <option key={racecourse.id} value={racecourse.code}>
                {racecourse.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography width="50%" textAlign="center">
            レース番号
          </Typography>
          <TextField
            type="number"
            onChange={(e) => setRaceNumber(Number(e.target.value))}
            value={raceNumber}
            InputProps={{ inputProps: { min: 1, max: 10 } }}
            sx={{
              width: "50%",
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="inherit">
          キャンセル
        </Button>
        <Button
          disabled={raceNumber === 0 || raceNumber > 10}
          onClick={handleGetClick}
          variant="contained"
        >
          取得する
        </Button>
      </DialogActions>
    </Dialog>
  );
};
