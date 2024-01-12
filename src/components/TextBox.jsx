import { TextField, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const TextBox = ({ field, form, label, placeholder, type, onBlur }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { name, value, onChange, onBlur: fieldBlur } = field;
  const { touched, errors } = form;

  return (
    <Box mb="20px">
      <TextField
        label={label}
        placeholder={placeholder}
        variant="outlined"
        required
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        type={type}
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
      />
    </Box>
  );
};

export default TextBox;
