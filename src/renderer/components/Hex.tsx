import * as React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  hex: {
    fontFamily: '"Roboto Mono", monospace',
    // fontSize: '12px'
  }
}));

function Hex(props: {value: string}): React.ReactElement {
  const classes = useStyles({upperCase: true});
  const { value } = props;
  return (
    <span className={classes.hex}>
      {value}
    </span>
  );
}

export default Hex;
