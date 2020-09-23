import * as React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Paper as MuiPaper} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

function Paper (props: any) {
  const { children } = props;
  const classes = useStyles();
  return (
    <MuiPaper
      variant="outlined"
      square={true}
      className={classes.paper}
    >
      {children}
    </MuiPaper>
  );
}

export default Paper;
