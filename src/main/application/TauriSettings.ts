import { Store } from "@tauri-apps/plugin-store";
import { v4 as uuidv4 } from 'uuid';

const store = new Store(".settings.dat");
const settingsVersion = "v0";

type SettingsData = {
  termsVersion?: string;
  id: any;
}

const DEFAULTS: SettingsData = {
  id: uuidv4(),
  termsVersion: null
};

export default class Settings {
  private settings: SettingsData;
  constructor () {
    this.settings = DEFAULTS;
  }

  public async data() {
    this.settings = await store.get<SettingsData>(settingsVersion);
    if (this.settings == null) {
      this.settings = DEFAULTS;
      await store.set(settingsVersion, this.settings);
      await store.save();
    }
    return Promise.resolve(this.settings);
  }

  public async update(data: SettingsData) {
    await this.setTerms(data.termsVersion);
    await store.save();
  }

  public async setTerms (version: string) {
    this.settings = {
      ...this.settings,
      termsVersion: version,
    }
    await store.set(settingsVersion, this.settings);
    return Promise.resolve(this.settings);
  }

  public getId () {
    return this.settings.id;
  }
}
