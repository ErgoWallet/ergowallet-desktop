import * as React from 'react';
import {Box, IconButton} from "@mui/material";
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import Hex from "./Hex";
import CopyToClipboard from "./CopyToClipboard";

interface AddressProps {
  value: string;
  shortened?: boolean;
  copy?: boolean;
  type?: string;
}

function Address(props: AddressProps): React.ReactElement {
  const { value, shortened, copy, type } = props;
  const val = shortened && value.length > 8 ?
    value.substring(0, 8) + '...' + value.slice(-8) :
    value;
  let addressBgColor = 'inherit';
  if (type === 'change')
    addressBgColor = '#f4ebc1';
  else if (type === 'receive')
    addressBgColor = '#a0c1b8';

  return (
    <Box display="flex" alignItems="center">
      <Hex backgroundColor={addressBgColor}>{val}</Hex>
      {(copy||shortened) && (
        <Box ml={1}>
          <CopyToClipboard TooltipProps={{title: "Address Copied"}}>
            {({ copy }) => (
              <IconButton size="small" onClick={() => copy(value)}>
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
