import axios from "axios";
import {request} from "./request";

export const saveBarcodeData = async (data) => {
  const res = await request().post("/barcode/save", { data });
  return res.data;
};
