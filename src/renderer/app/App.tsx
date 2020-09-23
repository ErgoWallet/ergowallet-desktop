import * as React from 'react';
import {Container, CssBaseline, ThemeProvider} from '@material-ui/core';
import MainScreen from './MainScreen';
import LoginScreen from './login/LoginScreen';
import {createHistory, createMemorySource, LocationProvider,} from "@reach/router"
import theme from "../ui/theme";
import CreateWallet from "./onboarding/CreateWallet/CreateWallet";
import ImportWallet from "./onboarding/ImportWallet/ImportWallet";
import withWidth from '@material-ui/core/withWidth';
import * as backend from '../Backend';
import {Alert, AlertTitle} from "@material-ui/lab";

let source = createMemorySource("/")
let history = createHistory(source)

// ****************************************************************************
// Here we show login screen
// Then we go to MainScreen or Create wallet wizard or Recovery wallet wizard
// ****************************************************************************

enum CreationMode {
  Create = 0,
  Import = 1,
  Unknown = -1
}

const App = (props: any) => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [creationMode, setCreationMode] = React.useState<CreationMode>(CreationMode.Unknown);

  async function handleLogin(walletName: string) {
    const success = await backend.loadWallet(walletName);
    if (success) {
      setLoggedIn(true);
      await history.navigate('wallet');
    }
  }

  async function handleLogout() {
    await backend.closeCurrentWallet();
    setLoggedIn(false);
    await history.navigate('/');
  }

  function handleCreateWallet() {
    setCreationMode(CreationMode.Create);
  }

  function handleImportWallet() {
    setCreationMode(CreationMode.Import);
  }

  let content = null;

  // Check whether we creating or importing wallet
  if (creationMode === CreationMode.Create) {
    content = (
      <CreateWallet
        onCancel={() => setCreationMode(CreationMode.Unknown)}
        onFinish={() => setCreationMode(CreationMode.Unknown)}
      />
    );
  } else if (creationMode === CreationMode.Import) {
    content = (
      <ImportWallet
        onCancel={() => setCreationMode(CreationMode.Unknown)}
        onFinish={() => setCreationMode(CreationMode.Unknown)}
      />
    )
  } else {
    // In this case show login or main app
    if (!loggedIn) {
      content = (
        <>
          <LoginScreen
            onLogin={handleLogin}
            onCreate={handleCreateWallet}
            onImport={handleImportWallet}
          />
          <br/>
          <Container maxWidth="xs">
            <Alert severity="warning">
              <AlertTitle>WARNING! WATCH CAREFULLY.</AlertTitle>
              <div>This is TECH PREVIEW release. Current limitations:</div>
              <ul>
                <li>Imported or Created wallets stored UNENCRYPTED in MEMORY during application launch</li>
                <li>Only ERG transactions supported</li>
                <li>PASSWORD means NOTHING yet</li>
              </ul>
            </Alert>
          </Container>
        </>
      );
    } else {
      content = (
        <LocationProvider history={history} >
          <MainScreen onLogout={handleLogout}/>
        </LocationProvider>
      );
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {content}
      {/*<div>{props.width}</div>*/}
    </ThemeProvider>
  );
};

export default withWidth()(App);
