import { TextField, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const DatePicker = ({ field, form, label, onBlur }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { name, value, onChange, onBlur: fieldBlur } = field;
  const { touched, errors } = form;

  return (
    <Box mb="20px">
      <TextField
        label={label}
        type="date"
        variant="outlined"
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        error={touched[name] && !!errors[name]}
        helperText={touched[name] && errors[name]}
        onBlur={onBlur || fieldBlur}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: colors.grey[400],
            },
            "&:hover fieldset": {
              borderColor: colors.grey[400],
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.greenAccent[400],
            },
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
};

export default DatePicker;
