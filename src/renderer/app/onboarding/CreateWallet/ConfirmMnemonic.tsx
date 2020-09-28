import * as React from 'react';
import {Container, Button, Chip, Grid, Box, Card, CardActions, CardContent, CardHeader} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import * as _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    border: 'none',
    backgroundColor: 'inherit'
  },
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
    },
    minHeight: '100px'
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
    <Card variant="outlined" className={classes.root}>
      <CardHeader title={"Verify recovery phrase"} />
      <CardContent>
        <Box display="flex" flexDirection="column" >
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
        </Box>
      </CardContent>
      <CardActions>
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
