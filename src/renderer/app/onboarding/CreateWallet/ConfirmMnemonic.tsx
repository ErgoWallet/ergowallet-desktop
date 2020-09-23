import * as React from 'react';
import {Container, Button, Chip, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { remove } from '../../../utils';

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
  const words = props.mnemonic.split(' ');
  const [state, setState] = React.useState({
    selected: [],
    unselected: [].concat(words)
  })

  function addWord(word: string) {
    const {selected, unselected} = state;

    const newSelected = selected.concat([word]);
    const newUnselected = remove(unselected, word);

    setState({
      selected: newSelected,
      unselected: newUnselected
    });
  }

  function removeWord(word: string) {
    const {selected, unselected} = state;
    const newSelected = remove(selected, word);
    const newUnselected = unselected.concat([word]);

    setState({
      selected: newSelected,
      unselected: newUnselected
    });
  }

  const {selected, unselected} = state;

  // Compare original phrase with confirmed one
  const isValid = (selected.length === words.length) &&
    selected.every((value, index) => value === words[index]);

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
          color={'primary'}
          variant={'contained'}
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
