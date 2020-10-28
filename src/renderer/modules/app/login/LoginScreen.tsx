import * as React from 'react';
import {Box, Button, Container, Link, MenuItem, OutlinedInput, Select, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import LogoImage from "./LogoImage";

interface LoginScreenProps {
  onLogin?: any;
  onCreate?: any;
  onImport?: any;
  backendApi?: any;
}

const useStyles = makeStyles((theme) => ({
  container: {},
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

/**
 * Allow user select wallet and input password
 *
 */
function LoginScreen(props: LoginScreenProps) {
  const classes = useStyles();
  const [wallet, setWallet] = React.useState('');
  const [wallets, setWallets] = React.useState<Array<string>>([]);
  const {backendApi} = props;
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWallet(event.target.value as string);
  };

  React.useEffect(() => {
    const load = async () => {
      if (backendApi) {
        const result: Array<string> = await backendApi.getWallets();
        setWallets(result);
        if (result.length > 0) {
          setWallet(result[0]);
        }
      }
    };
    load();
  }, []);

  function handleLogin() {
    props.onLogin(wallet);
  }

  const canProceed = (wallet && wallet.length > 0);

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.paper}>
        <Box display="flex" alignItems={"center"} mb={2}>
          <Box><LogoImage/></Box>
        </Box>
        <Select
          disabled={wallets.length === 0}
          onChange={handleChange}
          value={wallet}
          input={<OutlinedInput fullWidth={true}/>}
        >
          {
            wallets.map((item: string) => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))
          }
        </Select>
        <TextField
          disabled={wallets.length === 0}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          disabled={!canProceed}
          onClick={handleLogin}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Open
        </Button>
        <Link onClick={props.onCreate} href="#" variant="body2">
          Create new wallet
        </Link>
        <Link onClick={props.onImport} href="#" variant="body2">
          Import existing wallet
        </Link>
      </div>
    </Container>
  );
}

export default LoginScreen;
