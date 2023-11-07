import * as React from 'react';
import { Container, Chip, Button, Grid, Box, Card, CardActions, CardContent, CardHeader } from "@mui/material";
import * as _ from "lodash";

const unselectedChipsStyle = (theme: any) => ({
  paddingTop: theme.spacing(0.5),
  '& > *': {
    margin: theme.spacing(0.5),
  },
  minHeight: '100px'
})

const verifiedBoxStyle = (theme: any) => ({
  border: "1px solid ".concat(theme.palette.divider),
  minHeight: '200px',
  paddingTop: theme.spacing(0.5),
  '& > *': {
    margin: theme.spacing(0.5),
  }
})

interface ConfirmMnemonicProps {
  mnemonic: string;
  onConfirmed?: any;
  onCancel?: any;
}

function ConfirmMnemonic(props: ConfirmMnemonicProps) {
  // const classes = useStyles();
  const original = props.mnemonic.split(' ');
  const words = _.shuffle(original);
  const [state, setState] = React.useState({
    selected: new Array<string>(),
    unselected: new Array<string>().concat(words)
  })

  function addWord(word: string) {
    const { selected, unselected } = state;

    const newSelected = selected.concat([word]);
    _.remove(unselected, (w: string) => w === word);
    setState({
      selected: newSelected,
      unselected: unselected
    });
  }

  function removeWord(word: string) {
    const { selected, unselected } = state;
    // const newSelected = remove<string>(selected, word);
    _.remove(selected, (w: string) => w === word);
    const newUnselected = unselected.concat([word]);

    setState({
      selected: selected,
      unselected: newUnselected
    });
  }

  const { selected, unselected } = state;

  // Compare original phrase with confirmed one
  const isValid = (selected.length === original.length) &&
    selected.every((value, index) => value === original[index]);

  const handleCancel = () => {
    if (props.onCancel) {
      props.onCancel();
    }
  }

  return (
    <Card variant="outlined" sx={{ border: 'none', backgroundColor: 'inherit' }}>
      <CardHeader title={"Verify recovery phrase"} />
      <CardContent>
        <Box display="flex" flexDirection="column" >
          <Grid item xs={12}>
            <Box m={1} ml={0}>
              Click the words to put them next to each other in the correct order.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={verifiedBoxStyle}>
              {selected.map((word, index) => (
                <Chip
                  onDelete={() => removeWord(word)}
                  color="primary"
                  variant="outlined"
                  key={word}
                  label={`${index + 1}. ${word}`}
                />))
              }
            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Container sx={unselectedChipsStyle}>
              {unselected.map((word) => (
                <Chip
                  key={word}
                  label={word}
                  onClick={() => addWord(word)}
                />))
              }
            </Container>
          </Grid>
        </Box>
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
          disableElevation
          color="primary"
          variant="contained"
          disabled={!isValid}
          onClick={() => props.onConfirmed()}
        >
          Confirm
        </Button>
      </CardActions>
    </Card>
  );
}

export default ConfirmMnemonic;
