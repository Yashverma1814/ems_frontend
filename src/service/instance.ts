import axios from "axios";
import { BaseUrl } from "./apis";

const enqInstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default enqInstance;
