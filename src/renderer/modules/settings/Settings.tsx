import * as React from 'react';
import {Tabs, Tab, Box} from '@material-ui/core';
import Paper from '../../components/Paper';
import About from './About';

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
        <Box p={1}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Settings(props: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="General"/>
        <Tab label="Wallet"/>
        <Tab label="About"/>
      </Tabs>
      <Paper>
        <TabPanel value={value} index={0}>
          General settings
        </TabPanel>
        <TabPanel value={value} index={1}>
          Backup mnemonic phrase
        </TabPanel>
        <TabPanel value={value} index={2}>
          <About/>
        </TabPanel>
      </Paper>
    </React.Fragment>
  );
}


export default Settings;
