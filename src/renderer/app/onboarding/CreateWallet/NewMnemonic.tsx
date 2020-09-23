import * as React from 'react';
import {Button, Checkbox, FormControlLabel, Grid} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab';
import {makeStyles} from "@material-ui/core/styles";
import * as backend from '../../../Backend';

// Generate new mnemonic phrase
// Show Warning message

const useStyles = makeStyles(() => ({
  phrase: {
    fontSize: 18,
    fontWeight: "bold"
  }
}));

function NewMnemonic(props: {onSubmit?: (mnemonic: string) => void}) {
  const classes = useStyles();
  const [mnemonic, setMnemonic] = React.useState('');

  React.useEffect(() => {
    const generate = async () => {
      const phrase: string = await backend.generateMnemonic();
      setMnemonic(phrase);
    };
    generate();
  }, []);

  const words = mnemonic.split(' ');
  const wordsInColumn = words.length / 3;
  return (
    <Grid container direction={'column'} spacing={1}>
      <Grid item xs={12}>
        <Alert severity="error" variant={'outlined'}>
          Write down these words in the right order and save them somewhere safe
        </Alert>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {/* Show 24 word in 3 columns with numbers */}
          {
            [0, 1, 2].map((i) => (
              <Grid item lg={4} md={4} sm={4} container direction={'column'}>
                { words.slice(i * wordsInColumn, (i + 1) * wordsInColumn).map((word: string, index: number) =>
                  (<div>{index+(i * wordsInColumn + 1)}. <span className={classes.phrase}>{word}</span></div>))
                }
              </Grid>
            ))
          }
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Alert severity={'info'} variant={'outlined'}>
          Never share recovery phrase with anyone, store it securely
        </Alert>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="I understand that if I lose my recovery phrase, I will not be able to access my wallet"
        />
        <Button
          disableElevation
          color={'primary'}
          variant={'contained'}
          onClick={() => props.onSubmit(mnemonic)}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}

export default NewMnemonic;
