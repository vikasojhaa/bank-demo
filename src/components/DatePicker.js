import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function MaterialUIPickers({
  device,
  lable,
  selectedDate,
  setSelectedDate,
  error,
}) {
  const date = dayjs(selectedDate || new Date());
  console.log("selectedDate", date);
  const handleChange = (newValue) => {
    console.log("newValue", dayjs(newValue).format("YYYY-MM-DD"));
    setSelectedDate(dayjs(newValue).format("YYYY-MM-DD"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        {device === "mobile" ? (
          <MobileDatePicker
            label={lable}
            inputFormat="MM/DD/YYYY"
            value={date}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                size="small"
                style={{ width: "9rem" }}
                {...params}
                error={error || false}
              />
            )}
          />
        ) : (
          <DesktopDatePicker
            label={lable}
            inputFormat="MM/DD/YYYY"
            value={date}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                size="small"
                style={{ width: "13rem" }}
                {...params}
                error={error || false}
              />
            )}
          />
        )}
      </Stack>
    </LocalizationProvider>
  );
}
