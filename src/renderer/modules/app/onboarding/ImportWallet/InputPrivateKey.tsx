import * as React from 'react';
import {Button, TextField, Grid, Box} from "@material-ui/core";


// ****************************************************************************
// Input private key as hex string, validate it and submit if valid
// ****************************************************************************
function InputPrivateKey(props: {onSubmit?: any; onCancel?: any}) {
  const [privateKey, setPrivateKey] = React.useState('');

  function handleCancel() {
    if (props.onCancel) {
      props.onCancel();
    }
  }

  function submit() {
    props.onSubmit(privateKey);
  }

  function handleInputChange(event: React.ChangeEvent<{ value: string }>) {
    const val = event.target.value;
    setPrivateKey(val);
  }

  function isValidPrivateKey(hex: string): boolean {
    //TODO: validate hex string format
    return true;
  }

  const canProceed = isValidPrivateKey(privateKey)

  return (
    <React.Fragment>
      <Grid container direction={'column'} spacing={1}>
        <Grid item xs={12}>
          <TextField
            onChange={handleInputChange}
            value={privateKey}
            required={true}
            label={'Private Key'}
            fullWidth={true}
            variant="outlined"
          />
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

export default InputPrivateKey;
