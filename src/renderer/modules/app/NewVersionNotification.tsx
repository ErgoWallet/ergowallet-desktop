import {useSelector} from "react-redux";
import {RootState} from "../../store/root-reducer";
import * as React from "react";
import {Button, Snackbar, Alert} from "@mui/material";
// import {shell} from 'electron';
import * as semver from 'semver';

const NewVersionNotification = () => {
  const app = useSelector((state: RootState) => state.app);
  if (!app.latestVersion) {
    return null;
  }
  if (semver.gte(app.version, app.latestVersion)) {
    return null;
  }

  const openDownloadPage = () => {
    //shell.openExternal('https://ergowallet.io');
  };

  return (
    <Snackbar open>
      <Alert
        action={(
          <Button onClick={openDownloadPage}>Download</Button>
        )}
        severity="info">
        New version is available.
      </Alert>
    </Snackbar>
  );
}

export default NewVersionNotification;