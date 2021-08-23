import MockAdapter from "axios-mock-adapter";
import mockAuth from "../../app/modules/Auth/__mocks__/mockAuth";
import mockShopsCreshop from "../../app/modules/Mpos/__mocks__/ShopsCreshops/mockShopsCreshop";
import {AjaxDataShopsCreshop} from "../../app/modules/Mpos/__mocks__/ShopsCreshops/mockShopsCreshopLib";
import mockShopsCreEmp from "../../app/modules/Mpos/__mocks__/ShopsCreEmps/mockShopsCreEmp";
import mockStockMat from "../../app/modules/Mpos/__mocks__/StockMats/mockStockMat";
import mockStockCount from "../../app/modules/Mpos/__mocks__/StockCounts/mockStockCount";
import mockPuySup from "../../app/modules/Mpos/__mocks__/PuySups/mockPuySup";
import mockResult from "../../app/modules/Mpos/__mocks__/Results/mockResult";
import mockSalePos from "../../app/modules/Mpos/__mocks__/SalePoss/mockSalePos";
import mockSaleProduct from "../../app/modules/Mpos/__mocks__/SaleProducts/mockSaleProduct";
import mockServiceAl from "../../app/modules/Mpos/__mocks__/ServiceAls/mockServiceAl";
import mockServiceContract from "../../app/modules/Mpos/__mocks__/ServiceContracts/mockServiceContract";
import mockAside from "./../../_metronic/layout/components/aside/__mocks__/mockAside";

export default function mockAxios(axios) {
  window.localStorage.setItem("NEWEN","Special, buy coffee today 10 kg, free 1 kg.");
  window.localStorage.setItem("NEWTH","พิเศษซื้อกาแฟวันนี้ 10 กิโล ฟรี 1 กิโล");
  const mock = new MockAdapter(axios, { delayResponse: 300 });
  mockAuth(mock);
  mockAside(mock);
  mockShopsCreshop(mock);
  mockShopsCreEmp(mock);
  mockStockMat(mock);
  mockStockCount(mock);
  mockPuySup(mock);
  mockResult(mock);
  mockSalePos(mock);
  mockSaleProduct(mock);
  mockServiceAl(mock);
  mockServiceContract(mock);
  mockServiceContract(mock);
  return mock;
}
