import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function ColorButtons({ onSave, onUpdate, isUpdateDisabled }) {
  return (
    <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
      {/* Register Button */}
      <Button
        variant="contained"
        color="success"
        size="large"
        fullWidth
        onClick={onSave}
        sx={{
          backgroundColor: "#4CAF50",
          "&:hover": {
            backgroundColor: "#388E3C",
          },
          padding: "12px 24px",
          fontSize: "16px",
        }}
      >
        Register
      </Button>

      {/* Update Button */}
      <Button
        variant="outlined"
        color="success"
        size="large"
        fullWidth
        onClick={onUpdate}
        disabled={isUpdateDisabled}
        sx={{
          borderColor: "#4CAF50",
          color: "#4CAF50",
          "&:hover": {
            borderColor: "#388E3C",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
          },
          padding: "12px 24px",
          fontSize: "16px",
        }}
      >
        Update
      </Button>
    </Stack>
  );
}
