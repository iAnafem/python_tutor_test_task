import { action, autorun, makeObservable, observable } from "mobx";
import {TProductsInfo} from "./types";

class ProductsInfoStore {
  projectsInfo: TProductsInfo[] = [];

  constructor() {
    makeObservable(this, {
      projectsInfo: observable,
      fetch: action.bound,
      setProductsInfoData: action.bound,
    });
  }


  fetch(url: string, handler: Function) {
    let headers = { "Content-Type": "application/json" };
    return fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        handler(data);
      });
  }

  setProductsInfoData(data: TProductsInfo[]) {
    this.projectsInfo = data;
  }
}

const instance = new ProductsInfoStore();

export default instance;
