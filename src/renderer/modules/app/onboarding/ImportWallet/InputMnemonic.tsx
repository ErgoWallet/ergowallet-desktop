import * as React from 'react';
import {Button, TextField, Grid, Box, FormControlLabel, Checkbox, InputAdornment, IconButton} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Mnemonic from "../../../../../common/Mnemonic";


// ****************************************************************************
// Input mnemonic phrase, validate it and submit if valid
// ****************************************************************************
function InputMnemonic(props: {onSubmit?: any; onCancel?: any}) {
  const [mnemonic, setMnemonic] = React.useState('');
  const [useBip39Passphrase, setUseBip39Passphrase] = React.useState(false);
  const [bip39Passphrase, setBip39Passphrase] = React.useState('');
  const [showBip39Pass, setShowBip39Pass] = React.useState(false);

  function onBip39PassphraseChange(event: React.ChangeEvent<{ value: string }>) {
    const val = event.target.value;
    setBip39Passphrase(val);
  }

  function handleClickShowBip39Pass() {
    setShowBip39Pass(!showBip39Pass);
  }

  function handleCancel() {
    if (props.onCancel) {
      props.onCancel();
    }
  }

  function submit() {
    props.onSubmit(mnemonic, bip39Passphrase);
  }

  function handleInputChange(event: React.ChangeEvent<{ value: string }>) {
    const val = event.target.value;
    setMnemonic(val);
  }

  const handleUseBip39PassphraseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseBip39Passphrase(event.target.checked);
  };

  function isValidMnemonic(phrase: string): boolean {
    return Mnemonic.isValid(phrase);
  }

  const canProceed = isValidMnemonic(mnemonic)

  return (
    <React.Fragment>
      <Grid container direction={'column'} spacing={1}>
        <Grid item xs={12}>
          <TextField
            onChange={handleInputChange}
            value={mnemonic}
            required={true}
            label={'Mnemonic phrase'}
            multiline
            fullWidth={true}
            rows={4}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Box>
            Typically 12 words separated by single spaces
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              (<Checkbox
                checked={useBip39Passphrase}
                color="primary"
                onChange={handleUseBip39PassphraseChange}
              />)
            }
            label="Use BIP39 passphrase"
          />
          { useBip39Passphrase && (
            <TextField
              onChange={onBip39PassphraseChange}
              value={bip39Passphrase}
              required={true}
              label={'BIP39 passphrase'}
              fullWidth={true}
              variant="outlined"
              type={showBip39Pass ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowBip39Pass}
                  >
                    {showBip39Pass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>)
              }}
            />
          )}
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
              disabled={!canProceed}
              color={'primary'}
              variant={'contained'}
              onClick={submit}
            >
              Import
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default InputMnemonic;
