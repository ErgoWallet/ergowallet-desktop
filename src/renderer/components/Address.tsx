import * as React from 'react';
import {Box, IconButton} from "@material-ui/core";
import Hex from "./Hex";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import CopyToClipboard from "./CopyToClipboard";

function Address(props: {value: string; shortened?: boolean; copy?: boolean}): React.ReactElement {
  const { value, shortened, copy } = props;
  const val = shortened && value.length > 8 ?
    value.substr(0, 8) + '...' + value.slice(-8) :
    value;
  return (
    <Box display="flex" alignItems="center">
      <Box>
        <Hex value={val} />
      </Box>
      {(copy||shortened) && (
        <Box ml={1}>
          <CopyToClipboard TooltipProps={{title: "Address Copied"}}>
            {({ copy }) => (
              <IconButton style={{padding: "0px"}} onClick={() => copy(value)}>
                <FileCopyOutlinedIcon fontSize="small"/>
              </IconButton>
            )}
          </CopyToClipboard>
        </Box>
      )}
    </Box>
  );
}

export default Address;
