import config from "../config";
import { helperHandlerExportResponse } from "../utils/helpers";
import AuthService from "./AuthService";
import HTTPService from "./HTTPService";

const ReportingService = {};

ReportingService.reportPembelianPeriodExcel = (data) => {
    return new Promise((resolve, reject) => {
        HTTPService({
            url: `${config.BASE_URL}/pembelian/report/period/excel`,
            method: "POST",
            responseType: "blob",
            headers: {
                "x-access-token": AuthService.getToken(),
            },
            data,
        })
            .then((response) => {
                helperHandlerExportResponse(response, resolve, "REPORTING-PEMBELIAN");
            })
            .catch((error) => {
                reject(error);
              });
    })
};

export default ReportingService;