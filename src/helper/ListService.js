import { api } from "boot/axios";
import { createToken } from "boot/createToken";
import { LocalStorage } from "quasar";

const ListService = {
  getWarung() {
    return api.get(`warung`);
  },
  getSatuan() {
    return api.get(`satuan`);
  },
};

export { ListService };
