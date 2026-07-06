import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
} from "@mui/material";
import CustomButton from "../CustomButton";

const CustomDialog = ({
	open,
	handleClose,
	fullScreen,
	title,
	children,
	handleSubmit,
	submitLabel,
	maxWidth = "xs",
	fullWidth = true,
}) => {
	return (
		<Dialog
			fullScreen={fullScreen}
			open={open}
			onClose={handleClose}
			fullWidth={fullWidth}
			maxWidth={maxWidth}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle id="responsive-dialog-title">
				{title}
			</DialogTitle>

			<Divider />

			<DialogContent>
				{children}
			</DialogContent>

			<DialogActions>
				<CustomButton
					label={submitLabel}
					onClick={handleSubmit}
				/>
				<CustomButton
					label="Cancel"
					onClick={handleClose}
					backgroundColor="#060606"
				/>
			</DialogActions>
		</Dialog>
	);
};

export default CustomDialog;