import config from "../config";
import AuthService from "./AuthService";
import HTTPService from "./HTTPService";

const PemasokService = {};
const CONFIG_HTTP = {
  headers: {
    "x-access-token": AuthService.getToken(),
  },
};

PemasokService.list = (query) => {
    CONFIG_HTTP.params = query;
    return HTTPService.get(`${config.BASE_URL}/pemasok`, CONFIG_HTTP);
  };
  
  PemasokService.create = (pemasok) => {
    CONFIG_HTTP.params = null;
    return HTTPService.post(`${config.BASE_URL}/pemasok`, pemasok, CONFIG_HTTP);
  };
  
  PemasokService.get = (kodePemasok) => {
    CONFIG_HTTP.params = null;
    return HTTPService.get(
      `${config.BASE_URL}/pemasok/${kodePemasok}`,
      CONFIG_HTTP
    );
  };
  
  PemasokService.edit = (kodePemasok, pemasok) => {
    CONFIG_HTTP.params = null;
    return HTTPService.put(
      `${config.BASE_URL}/pemasok/${kodePemasok}`,
      pemasok,
      CONFIG_HTTP
    );
  };
  
  PemasokService.delete = (kodePemasok) => {
    CONFIG_HTTP.params = null;
    return HTTPService.delete(
      `${config.BASE_URL}/pemasok/${kodePemasok}`,
      CONFIG_HTTP
    );
  };
  
  
  export default PemasokService;