import React, { useEffect, useState } from "react";
import instance from "./store";
import { observer, Provider } from "mobx-react";
import {TProductsInfo} from "./types";

const App = observer(() => {
  const store = instance;

  let productsInfoEndpoint = "http://localhost:8999/api/market/products-info/";


  return (
    <Provider store>
      <div>
        <p>Welcome to Market application!</p>
        <button
          type="button"
          onClick={() => store.fetch(productsInfoEndpoint, store.setProductsInfoData)}
        >
          Load products info
        </button>
      </div>
    </Provider>
  );
});

export default App;
