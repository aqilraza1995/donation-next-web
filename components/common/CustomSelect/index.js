import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";

const CustomSelect = ({outerLabel,  options, value, onChange, label, labelKey, valueKey, name, fullWidth, variant = "outlined", size = "small", }) => {
  return (
    <Box sx={{mt:1}}>
    {outerLabel && (
            <Box sx={{ display: "flex", justifyContent: "space-between", px: 1.5, mb: 1 }}>
              <InputLabel htmlFor={name}>{outerLabel}</InputLabel>
            </Box>
          )}
    <FormControl fullWidth={fullWidth} variant={variant} size={size} sx={{ minWidth: 220, }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        name={name}
        value={value}
        label={label}
        onChange={onChange}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: size === 'small' ? '20px' : '30px',
          },
        }}
      >
        {options?.map((option) => (
          <MenuItem key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Box>
  );
}

export default CustomSelect;