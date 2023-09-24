import AppTextField from "@/components/AppFormComponents/AppTextField";
import { Field } from "../type";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({
  fieldItem,
  disabled,
}: {
  fieldItem: Field;
  disabled?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <AppTextField
      type={showPassword ? "text" : "password"}
      name={fieldItem.name}
      sx={{
        width: "100%",
      }}
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onShowPassword}
              onMouseDown={onDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      label={fieldItem.label}
    />
  );
};

export default PasswordField;
