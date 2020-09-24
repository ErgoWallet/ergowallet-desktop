import * as React from 'react';
import {Container, Button, Chip, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import * as _ from "lodash";

const useStyles = makeStyles((theme) => ({
  verifiedBox: {
    border: "1px solid ".concat(theme.palette.divider),
    minHeight: '200px',
    paddingTop: theme.spacing(0.5),
    '& > *': {
      margin: theme.spacing(0.5),
    }
  },
  unselectedChips: {
    paddingTop: theme.spacing(0.5),
    '& > *': {
      margin: theme.spacing(0.5),
    }
  }
}));


function ConfirmMnemonic(props: {mnemonic: string; onConfirmed?: any}) {
  const classes = useStyles();
  const original = props.mnemonic.split(' ');
  const words = _.shuffle(original);
  const [state, setState] = React.useState({
    selected: new Array<string>(),
    unselected: new Array<string>().concat(words)
  })

  function addWord(word: string) {
    const {selected, unselected} = state;

    const newSelected = selected.concat([word]);
    _.remove(unselected, (w: string) => w === word);
    setState({
      selected: newSelected,
      unselected: unselected
    });
  }

  function removeWord(word: string) {
    const {selected, unselected} = state;
    // const newSelected = remove<string>(selected, word);
    _.remove(selected, (w: string) => w === word);
    const newUnselected = unselected.concat([word]);

    setState({
      selected: selected,
      unselected: newUnselected
    });
  }

  const {selected, unselected} = state;

  // Compare original phrase with confirmed one
  const isValid = (selected.length === original.length) &&
    selected.every((value, index) => value === original[index]);

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        Click the words to put them next to each other in the correct order.
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
          <div className={classes.verifiedBox}>
            {selected.map((word, index) => (
              <Chip
                onDelete={() => removeWord(word)}
                color="primary"
                variant="outlined"
                key={word}
                label={`${index + 1}. ${word}`}
              />))
            }
          </div>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Container className={classes.unselectedChips}>
          {unselected.map((word) => (
            <Chip
              key={word}
              label={word}
              onClick={() => addWord(word)}
            />))
          }
        </Container>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Button
          disableElevation
          color="primary"
          variant="contained"
          disabled={!isValid}
          onClick={() => props.onConfirmed()}
        >
          Confirm
        </Button>
      </Grid>
    </Grid>
  );
}

export default ConfirmMnemonic;
