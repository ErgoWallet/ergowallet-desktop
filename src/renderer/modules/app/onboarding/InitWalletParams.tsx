import * as React from 'react';
import {Box, Button, Grid} from "@mui/material";
import Input from '../../../components/Input';

// ****************************************************************************
// Set Wallet Name and Password
// We use this widget for new wallet creation and import existing one
// ****************************************************************************

interface InitWalletProps {
  onCancel?: any;
  onSetParams?: (name: string, password: string) => void;
  isNameAvailable?: (name: string) => Promise<boolean>;
}

function InitWalletParams (props: InitWalletProps) {
  const [walletName, setWalletName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [nameError, setNameError] = React.useState('');

  function handleContinue() {
    if (props.onSetParams) {
      props.onSetParams(walletName, password);
    }
  }

  function handleCancel() {
    if (props.onCancel) {
      props.onCancel();
    }
  }

  function isValidForm() {
    return nameError === '' && walletName.length > 0;
  }

  async function handleNameChange (event: any) {
    const newName = event.target.value;
    setWalletName(newName);

    let error = '';
    if (!(newName && newName.length > 0)) {
      error = 'Wallet name is required';
    } else {
      if (props.isNameAvailable) {
        // check if wallet name is available
        const available = await props.isNameAvailable(newName);
        if (!available) {
          error = 'Wallet name already exists';
        }
      }
    }
    setNameError(error);
  }

  function handlePasswordChange (event: any) {
    setPassword(event.target.value);
  }

  const canProceed = isValidForm();
  return (
    <Box>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} alignItems={'center'}>
        <Grid item xs={4} md={3} sm={2}>
          Wallet name
        </Grid>
        <Grid item xs={4} md={9} sm={6}>
          <Input
            error={nameError !== ''}
            errorText={nameError}
            value={walletName}
            onChange={handleNameChange}
            fullWidth={true}
            required={true}
          />
        </Grid>
        <Grid item xs={4} md={3} sm={2}>
          Wallet password
        </Grid>
        <Grid item xs={4} md={9} sm={6}>
          <Input 
            value={password} 
            onChange={handlePasswordChange} 
            fullWidth={true} 
            type='password' 
            required={true} 
          />
        </Grid>
        <Grid item xs={4} md={3} sm={2}>
          Confirm password
        </Grid>
        <Grid item xs={4} md={9} sm={6}>
          <Input fullWidth={true} type='password' required={true} />
        </Grid>
        <Grid item xs={4} md={3} sm={2}>
        </Grid>
        <Grid item xs={4} md={9} sm={6}>
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
              disableElevation
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default InitWalletParams;
