import { MenuItem, SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullwidth?: boolean;
  sx?: SxProps;
  placeholer?: string;
  required?: boolean;
  select?: boolean;
  options?: { label: string; value: string }[];
};

const CustomInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullwidth,
  placeholer,
  sx,
  required,
  select = false,
  options = [],
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullwidth}
          placeholder={label}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
          select={select}
        >
          {select &&
            options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
        </TextField>
      )}
    />
  );
};
export default CustomInput;
