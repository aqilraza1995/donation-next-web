import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CustomSelect = ({ options, value, onChange, label, labelKey, valueKey, name, fullWidth, variant = "outlined", size = "small", }) => {
  return (
    <FormControl fullWidth={fullWidth} variant={variant} size={size} sx={{ minWidth: 220 }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        name={name}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options?.map((option) => (
          <MenuItem key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;