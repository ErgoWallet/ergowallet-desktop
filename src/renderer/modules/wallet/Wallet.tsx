import * as React from 'react';
import { Box } from '../../mui';
import {Tabs, Tab, CircularProgress} from '@mui/material';
import Paper from '../../components/Paper';
import Outputs from './Boxes/Outputs';
import Transactions from './Transactions/Transactions';
import Addresses from "./Addresses/Addresses";
import {useSelector} from "react-redux";
import {RootState} from "../../store/root-reducer";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;
  return (
    <div
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function Wallet(props: any) {
  const wallet = useSelector((state: RootState) => state.wallet);
  const [tab, setTab] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <React.Fragment>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label={(
            <Box display="flex" alignItems="center">
              <Box>Unspent</Box>
              {wallet.unspentLoading && (
                <Box ml={1}>
                  <CircularProgress size={20} color="secondary"/>
                </Box>
              )}
            </Box>)}
        />
        <Tab label={(
          <Box display="flex" alignItems="center">
            <Box>History</Box>
            {wallet.txsLoading && (
              <Box ml={1}>
                <CircularProgress size={20} color="secondary"/>
              </Box>
            )}
          </Box>)}
        />
        <Tab label="Addresses"/>
      </Tabs>
      <Paper>
        <TabPanel value={tab} index={0}>
          <Outputs/>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Transactions/>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Addresses/>
        </TabPanel>
      </Paper>
    </React.Fragment>
  );
}

export default Wallet;
