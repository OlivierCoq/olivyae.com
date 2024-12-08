import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


export const settingsStore = defineStore('settings',{
  state: () => ({
    dark: false
  })
});