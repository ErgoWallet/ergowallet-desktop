import * as React from 'react';
import {
  Box,
  Button,
  Container,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import LogoImage from "./LogoImage";

interface LoginScreenProps {
  onLogin?: any;
  onCreate?: any;
  onImport?: any;
  backendApi?: any;
}

const submitStyle = (theme: any) => ({
  margin: theme.spacing(3, 0, 2),
})

const paperStyle = (theme: any) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // backgroundColor: theme.palette.background.paper
})

/**
 * Allow user select wallet and input password
 *
 */
function LoginScreen(props: LoginScreenProps) {
  // const classes = useStyles();
  const [wallet, setWallet] = React.useState<string>('');
  const [wallets, setWallets] = React.useState<Array<string>>([]);
  const { backendApi } = props;
  const handleChange = (event: SelectChangeEvent<string>) => {
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

  if (!canProceed) {
    // If there are no any wallet in vault we display just two buttons
    return (
      <Container component="main" maxWidth="xs">
        <Box sx={paperStyle}>
          <Box display="flex" alignItems={"center"} mb={2}>
            <Box>
              <LogoImage />
            </Box>
          </Box>
          <Button
            onClick={props.onCreate}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={submitStyle}
          >
            Create new wallet
          </Button>
          <Button
            onClick={props.onImport}
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            sx={submitStyle}
          >
            Import existing wallet
          </Button>
        </Box>
      </Container>
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={paperStyle}>
        <Box display="flex" alignItems={"center"} mb={2}>
          <Box><LogoImage /></Box>
        </Box>
        <Select
          disabled={wallets.length === 0}
          onChange={handleChange}
          value={wallet}
          input={<OutlinedInput fullWidth={true} />}
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
          sx={submitStyle}
        >
          Open
        </Button>
        <Link onClick={props.onCreate} href="#" variant="body2">
          Create new wallet
        </Link>
        <Link onClick={props.onImport} href="#" variant="body2">
          Import existing wallet
        </Link>
      </Box>
    </Container>
  );
}

export default LoginScreen;
