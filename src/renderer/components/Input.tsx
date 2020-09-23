import * as React from 'react';
import {TextField} from "@material-ui/core";

interface InputProps {
  label?: string;
  required?: boolean;
  type?: string;
  fullWidth?: boolean;
  value?: any;
  onChange?: any;
  error?: boolean;
  focused?: boolean;
  errorText?: string;
}

function Input(props: InputProps): React.ReactElement {
  return (
    <TextField
      size="small"
      focused={props.focused}
      error={props.error}
      helperText={props.errorText}
      onChange={props.onChange}
      value={props.value}
      fullWidth={props.fullWidth}
      required={props.required}
      label={props.label}
      variant="outlined"
      margin="dense"
      type={props.type}
    />
  );
}

export default Input;
