import { VpnKey, VpnKeyOff } from "@mui/icons-material";
import { Box, FormControl, InputAdornment, InputLabel, TextField } from "@mui/material"
import { useState } from "react";


const CustomInput = ({
  name,
  outerLabel,
  placeholder,
  label,
  size,
  variant = "outlined",
  onChange,
  value,
  icon,
  fullWidth = false,
  type = "text",
  helperText
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl fullWidth={fullWidth}>
      {outerLabel && (
        <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
          <InputLabel htmlFor={name}>{outerLabel}</InputLabel>
        </Box>
      )}
      <TextField
        size={size}
        type={type === "password" ? showPassword ? "text" : "password" : type}
        id={name}
        placeholder={placeholder}
        label={label}
        variant={variant}
        onChange={onChange}
        value={value}
        error={!!helperText}
        helperText={helperText}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end" sx={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
              {type === "password" ?
                showPassword ?
                  <VpnKeyOff sx={{ height: "16px", width: "16px" }} />
                  : <VpnKey sx={{ height: "16px", width: "16px" }} />
                : icon}
            </InputAdornment>,
          },
        }}
        sx={{
          '& .MuiInputBase-root': {
            minHeight: size === 'small' ? '40px' : '50px',
            borderRadius: size === 'small' ? '20px' : '30px',
            fontSize: "14px"
          },
        }}
      />
    </FormControl>
  )
}

export default CustomInput