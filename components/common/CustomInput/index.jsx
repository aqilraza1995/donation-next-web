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
  helperText,
  position = "end"
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
            ...position === "start"
              ? {
                startAdornment: (
                  <InputAdornment position="start">
                    {type === "password"
                      ? showPassword
                        ? <VpnKeyOff sx={{ height: 16, width: 16 }} />
                        : <VpnKey sx={{ height: 16, width: 16 }} />
                      : icon}
                  </InputAdornment>
                ),
              }
              : {
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ cursor: type === "password" ? "pointer" : "default" }}
                    onClick={() => {
                      if (type === "password") {
                        setShowPassword(!showPassword);
                      }
                    }}
                  >
                    {type === "password"
                      ? showPassword
                        ? <VpnKeyOff sx={{ height: 16, width: 16 }} />
                        : <VpnKey sx={{ height: 16, width: 16 }} />
                      : icon}
                  </InputAdornment>
                ),
              },
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