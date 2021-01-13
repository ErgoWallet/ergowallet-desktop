import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

// Generate new mnemonic phrase
// Show Warning message

const useStyles = makeStyles(() => ({
  root: {
    border: 'none',
    backgroundColor: 'inherit'
  },
  phrase: {
    fontSize: 18,
    fontWeight: "bold"
  }
}));

interface Props {
  onSubmit?: (mnemonic: string, passphrase: string) => void;
  onCancel? : any;
  backendApi?: any;
}

function NewMnemonic(props: Props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const [mnemonic, setMnemonic] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = () => {
    if (props.onSubmit) {
      props.onSubmit(mnemonic, '');
    }
  };

  const handleCancel = () => {
    if (props.onCancel) {
      props.onCancel();
    }
  }

  React.useEffect(() => {
    const generate = async () => {
      if (props.backendApi) {
        const phrase: string = await props.backendApi.generateMnemonic();
        setMnemonic(phrase);
      }
    };
    generate();
  }, []);

  const words = mnemonic.split(' ');
  const wordsInColumn = words.length / 3;
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title={"Your recovery phrase"} />
      <CardContent>
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12}>
            <Box m={1} ml={0}>
              Write down these words in the right order and save them somewhere safe.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              {/* Show 24 word in 3 columns with numbers */}
              {
                [0, 1, 2].map((i) => (
                  <Grid key={i} item lg={4} md={4} sm={4} container direction={'column'}>
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
              control={<Checkbox checked={checked} value="remember" color="primary" onChange={handleChange}/>}
              label="I understand that if I lose my recovery phrase, I will not be able to access my wallet"
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          disableElevation
          variant={"outlined"}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={!checked}
          disableElevation
          color={'primary'}
          variant={'contained'}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </CardActions>
    </Card>

  );
}

export default NewMnemonic;
