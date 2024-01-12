import { Autocomplete as MuiAutocomplete, TextField, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Autocomplete = ({ label, options, field, form }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { name, value, onChange, onBlur } = field;
  const { touched, errors } = form;

  return (
    <Box mb="20px">
      <MuiAutocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        value={options.find((option) => option.label === value) || null}
        onChange={(event, newValue) => {
          form.setFieldValue(name, newValue ? newValue.label : "");
          form.setFieldTouched(name, true, true);
        }}
        onBlur={onBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            required
            fullWidth
            name={name}
            value={value}
            onChange={onChange}
            error={touched[name] && !!errors[name]}
            helperText={touched[name] && errors[name]}
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
        )}
      />
    </Box>
  );
};

export default Autocomplete;
