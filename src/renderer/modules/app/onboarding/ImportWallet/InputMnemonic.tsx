import * as React from 'react';
import {Button, TextField, Grid, Box} from "@material-ui/core";
import Mnemonic from "../../../../../common/Mnemonic";


// ****************************************************************************
// Input mnemonic phrase, validate it and submit if valid
// ****************************************************************************
function InputMnemonic(props: {onSubmit?: any; onCancel?: any}) {
  const [mnemonic, setMnemonic] = React.useState('');

  function handleCancel() {
    if (props.onCancel) {
      props.onCancel();
    }
  }

  function submit() {
    props.onSubmit(mnemonic);
  }

  function handleInputChange(event: React.ChangeEvent<{ value: string }>) {
    const val = event.target.value;
    setMnemonic(val);
  }

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
