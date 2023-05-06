import config from "../config";
import { helperHandlerExportResponse } from "../utils/helpers";
import AuthService from "./AuthService";
import HTTPService from "./HTTPService";

const PembelianService = {};
const CONFIG_HTTP = {
  headers: {
    "x-access-token": AuthService.getToken(),
  },
};

PembelianService.list = (query) => {
    CONFIG_HTTP.params = query;
    return HTTPService.get(`${config.BASE_URL}/pembelian`, CONFIG_HTTP);
  };
  
  PembelianService.create = (pembelian) => {
    CONFIG_HTTP.params = null;
    return HTTPService.post(`${config.BASE_URL}/pembelian`, pembelian, CONFIG_HTTP);
  };
  
  PembelianService.get = (kodePembelian) => {
    CONFIG_HTTP.params = null;
    return HTTPService.get(
      `${config.BASE_URL}/pembelian/${kodePembelian}`,
      CONFIG_HTTP
    );
  };
  
  PembelianService.fakturPrint = (faktur) => {
    CONFIG_HTTP.query = null;
  
    return new Promise((resolve, reject) => {
      HTTPService({
        url: `${config.BASE_URL}/pembelian/${faktur}/print/excel`,
        method: "POST",
        responseType: "blob",
        headers: CONFIG_HTTP.headers,
      })
        .then((response) => {
          helperHandlerExportResponse(response, resolve, "FAKTUR");
        })
        .catch((error) => reject(error));
    });
  };
  
  export default PembelianService;