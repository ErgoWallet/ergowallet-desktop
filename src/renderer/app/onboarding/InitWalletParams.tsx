import * as React from 'react';
import {Box, Button, Grid} from "@material-ui/core";
import Input from '../../components/Input';

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
      <Grid container alignItems={'center'}>
        <Grid item lg={3} md={3} sm={3}>
          Wallet name
        </Grid>
        <Grid item lg={9} md={9} sm={9}>
          <Input
            error={nameError !== ''}
            errorText={nameError}
            value={walletName}
            onChange={handleNameChange}
            fullWidth={true}
            required={true}
          />
        </Grid>
      </Grid>
      <Grid container alignItems={'center'}>
        <Grid item lg={3} md={3} sm={3}>
          Wallet password
        </Grid>
        <Grid item lg={9} md={9} sm={9}>
          <Input value={password} onChange={handlePasswordChange} fullWidth={true} type='password' required={true} />
        </Grid>
      </Grid>
      <Grid container alignItems={'center'}>
        <Grid item lg={3} md={3} sm={3}>
          Confirm password
        </Grid>
        <Grid item lg={9} md={9} sm={9}>
          <Input fullWidth={true} type='password' required={true} />
        </Grid>
      </Grid>
      <Grid container alignItems={'center'}>
        <Grid item lg={3} md={3} sm={3}>
        </Grid>
        <Grid item lg={9} md={9} sm={9}>
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
