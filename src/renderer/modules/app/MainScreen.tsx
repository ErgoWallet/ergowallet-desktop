import {AppBar, Button, Container, IconButton, Toolbar, Tooltip} from '@material-ui/core';
import {RouteComponentProps, Router, useNavigate} from '@reach/router';
import * as React from 'react';
import Exchange from '../exchange/Exchange';
import Wallet from '../wallet/Wallet';
import Settings from '../settings/Settings';
import {makeStyles} from '@material-ui/core/styles';
import {SettingsOutlined as SettingsIcon} from '@material-ui/icons';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import {ScrollToTop} from "../../components/ScrollToTop";

const ExchangeRoute = (props: RouteComponentProps) => (
  <>
    <ScrollToTop location={props.location} />
    <Exchange />
  </>
  );
const WalletRoute = (props: RouteComponentProps) => (
  <>
    <ScrollToTop location={props.location} />
    <Wallet />
  </>
  );
const SettingsRoute = (props: RouteComponentProps) => (<Settings />);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 240,
  },
  grow: {
    flexGrow: 1,
  },
}));

interface MainScreenProps {
  onLogout?: any;
}

const MainScreen = (props: MainScreenProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <div>
            <Button
              startIcon={<AccountBalanceWalletOutlinedIcon/>}
              color="inherit"
              onClick={() => navigate('wallet')}
            >
              Wallet
            </Button>
            {/*<Button*/}
            {/*  startIcon={<SyncOutlinedIcon />}*/}
            {/*  color="inherit"*/}
            {/*  onClick={() => navigate('exchange')}*/}
            {/*>*/}
            {/*  Exchange*/}
            {/*</Button>*/}
          </div>
          <div className={classes.grow} />
          <Tooltip title={"Settings"}>
            <IconButton onClick={() => navigate('settings')} color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Close wallet"}>
            <IconButton onClick={props.onLogout} edge="end" color="inherit">
              <ExitToAppOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/*<div className={classes.appBarSpacer} />*/}
      <main className={classes.content}>
        <Container className={classes.container}>
          <Router>
            {/*<ScrollUp path='/' />*/}
            <ExchangeRoute path='exchange/*' />
            <WalletRoute path='wallet/*' />
            <SettingsRoute path='settings' />
          </Router>
        </Container>
      </main>

    </React.Fragment>
  );
};

export default MainScreen;
