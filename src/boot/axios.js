import { boot } from "quasar/wrappers";
import axios from "axios";

//const baseURL = "https://api-capilpesawaran.psti-ubl.id/";
const baseURL = "http://localhost:5070/";
// const baseURL = "http://192.168.18.125:5070/";

const api = axios.create({ baseURL: baseURL });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = api;
});

export { api };
