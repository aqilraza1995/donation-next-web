import { Button } from "@mui/material"

const CustomButton = ({
  label,
  onClick,
  variant = "contained",
  backgroundColor = "#ff8e29",
  size = "medium",
  fullWidth = false,
  disabled = false,
  loading = false,
  type = "submit"
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      type={type}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      loading={loading}
      sx={{
        minHeight: size === 'small' ? '40px' : '50px',
        borderRadius: size === 'small' ? '20px' : '30px',
        backgroundColor: backgroundColor,
        textTransform: "none",
        fontSize: "16px",
      }}
    >
      {label}
    </Button>
  )
}

export default CustomButton