import * as React from 'react';
import {InputAdornment, TextField} from "@mui/material";

export interface AssetValueInputState {
  value: string;
  isValid: boolean;
}

export interface AssetValueInputProps {
  assetDecimals: number;
  assetSymbol: string;
  initialValue: string;
  maxValue?: string;
  onChange?: (state: AssetValueInputState) => void;
}

function AssetValueInput(props: AssetValueInputProps, ref: any): React.ReactElement {
  const { assetDecimals, assetSymbol, initialValue, onChange } = props;
  const valueInputRegex = assetDecimals > 0 ?
    new RegExp("^\\d*(\\.\\d{0,"+assetDecimals+"})?$") :
    new RegExp("^\\d*$");

  const valueValidRegex = assetDecimals > 0 ?
    new RegExp("^\\d+(\\.\\d{1,"+assetDecimals+"})?$") :
    new RegExp("^\\d+$");

  const [state, setState] = React.useState<AssetValueInputState>({
    value: initialValue,
    isValid: valueValidRegex.test(initialValue)
  });

  function setCurrentValue(value: string): void {
    if (!valueInputRegex.test(value)) {
      return;
    }
    const nextState = {
      value,
      isValid: valueValidRegex.test(value)
    };

    setState(nextState);
    if (onChange) {
      onChange(nextState);
    }
  }

  React.useImperativeHandle(ref, () => ({
    setValue: (value: string) => setCurrentValue(value)
  }));

  function handleChange(event: React.ChangeEvent<{ value: string }>): void {
    const value = event.target.value;
    setCurrentValue(value);
  }

  return (
    <TextField
      size="small"
      error={!state.isValid}
      required={true}
      onChange={handleChange}
      value={state.value}
      InputProps={{
        endAdornment: <InputAdornment position="end">{assetSymbol}</InputAdornment>,
      }}
      variant="outlined"
    />
  );
}

export default React.forwardRef(AssetValueInput);
