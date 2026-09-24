import * as React from 'react';
import {
  Button,
  Grid,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";


export enum WalletType {
  Mnemonic = 'mnemonic',
  PrivateKey = 'private-key'
}
// ****************************************************************************
// Select wallet type
// ****************************************************************************
function SelectWalletType(props: {onSubmit?: any; onCancel?: any}) {
  const [type, setType] = React.useState(WalletType.Mnemonic);
  const {onCancel, onSubmit } = props;

  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
  }

  function submit() {
    if (onSubmit) {
      onSubmit(type);
    }
  }

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setType(event.target.value as WalletType);
  };

  return (
    <React.Fragment>
      <Grid container direction="column" spacing={1}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Choose which wallet you want to import</FormLabel>
            <RadioGroup name="type" value={type} onChange={handleChange}>
              <FormControlLabel
                value={WalletType.Mnemonic}
                control={<Radio />}
                label="Mnemonic phrase"
              />
              <FormControlLabel
                value={WalletType.PrivateKey}
                control={<Radio />}
                label="Private Key" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box mt={2}>
            <Button
              variant={"outlined"}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              style={{marginLeft:"5px"}}
              color={'primary'}
              variant="contained"
              onClick={submit}
            >
              Continue
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SelectWalletType;
