import ElectronStore from 'electron-store';
import { v4 as uuidv4 } from 'uuid';

interface SettingsStore {
  termsVersion?: string;
  id: any;
}

const DEFAULTS: SettingsStore = {
  id: uuidv4()
};

export default class Settings {
  private settings: ElectronStore<SettingsStore>;
  constructor () {
    this.settings = new ElectronStore({
      name: 'settings',
      defaults: DEFAULTS
    });
  }

  public data () {
    return this.settings.store;
  }

  public update(data: any) {
    this.setTerms(data.termsVersion);
  }

  public setTerms (version: string) {
    this.settings.set('termsVersion', version);
    return this;
  }

  public getId () {
    return this.settings.get('id');
  }
}
