import * as React from 'react';
import {Tabs, Tab, Box} from '@material-ui/core';
import Paper from '../../components/Paper';
import Outputs from './Boxes/Outputs';
import Transactions from './Transactions/Transactions';
import Addresses from "./Addresses/Addresses";

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
  const [tab, setTab] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <React.Fragment>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="Unspent"/>
        <Tab label="History"/>
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
