import { action, autorun, makeObservable, observable } from "mobx";
import {TProductsInfo, TUserDetails} from "./types";

class ProductsInfoStore {
  projectsInfo: TProductsInfo[] = [];
  userDetails: TUserDetails = {user: undefined, token: undefined};

  constructor() {
    makeObservable(this, {
      projectsInfo: observable,
      userDetails: observable,
      fetch: action.bound,
      post: action.bound,
      setProductsInfoData: action.bound,
      setUserDetails: action.bound,
      getToken: action.bound,
      userRegistered: action.bound
    });
  }

  async post(url: string, handler: Function, payload: any) {
    let headers = {"Content-Type": "application/json"};
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: headers,
    });
    const data = await response.json();
    handler(data);
  }

  async fetch(url: string, handler: Function) {
    let headers = {"Content-Type": "application/json", "Authorization": ""};
    let token = this.getToken()
    if (token !== undefined) {
      headers['Authorization'] = `Token ${token}`
    }
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    handler(data);
  }

  setProductsInfoData(data: TProductsInfo[]) {
    this.projectsInfo = data;
  }

  setUserDetails(data: TUserDetails) {
    this.userDetails = data;
  }

  getToken(): string | undefined {
    return this.userDetails.token
  }

  userRegistered() {
    console.log("User successfully registered")
  }
}

const instance = new ProductsInfoStore();

export default instance;
