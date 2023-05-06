import config from "../config";
import AuthService from "./AuthService";
import HTTPService from "./HTTPService";

const BarangService = {};
const CONFIG_HTTP = {
  headers: {
    "x-access-token": AuthService.getToken(),
  },
};

const configure = (query) => {
  return {
    headers: {
      "x-access-token": AuthService.getToken(),
    },
    params: query,
  };
};

BarangService.list = (query) => {
  return HTTPService.get(`${config.BASE_URL}/barang`, configure(query));
};

BarangService.create = (barang) => {
  CONFIG_HTTP.params = null;
  return HTTPService.post(`${config.BASE_URL}/barang`, barang, CONFIG_HTTP);
};

BarangService.get = (kodeBarang) => {
  CONFIG_HTTP.params = null;
  return HTTPService.get(
    `${config.BASE_URL}/barang/${kodeBarang}`,
    CONFIG_HTTP
  );
};

BarangService.edit = (kodeBarang, barang) => {
  CONFIG_HTTP.params = null;
  return HTTPService.put(
    `${config.BASE_URL}/barang/${kodeBarang}`,
    barang,
    CONFIG_HTTP
  );
};

BarangService.delete = (kodeBarang) => {
  CONFIG_HTTP.params = null;
  return HTTPService.delete(
    `${config.BASE_URL}/barang/${kodeBarang}`,
    CONFIG_HTTP
  );
};


export default BarangService;

