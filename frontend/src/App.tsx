import React, {useEffect, useState} from "react";
import instance from "./store";
import {observer, Provider} from "mobx-react";
import {TCategory, TProductsInfo} from "./types";

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
        {store.projectsInfo.length > 0 &&
            <table style={{  fontFamily: "arial, sans-serif", borderCollapse: "collapse", width: "90%"}}>
                <tr>
                  {Object.keys(store.projectsInfo[0]).map((fieldName: string, idx: number) => (
                    <th
                    style={{  border: "1px solid #dddddd", textAlign: "center", padding: "8px"}}
                      key={`${idx}_${fieldName}_field`
                    }>
                      {fieldName}
                    </th>
                  ))}
                </tr>
                {
                  store.projectsInfo.map((entry: TProductsInfo, rowIdx: number) => (
                      <tr key={`${rowIdx}_row`} style={{backgroundColor: rowIdx % 2 === 0 ? "#dddddd" : "white"}}>
                        {
                          Object.keys(entry).map((field: string, key_idx: number) => {
                            let fieldName = `${field}` as keyof TProductsInfo
                            return (
                              <td
                                key={`${rowIdx}_${key_idx}`}
                                style={{  border: "1px solid #dddddd", textAlign: "left", padding: "8px"}}
                              >
                                {
                                  fieldName === "categories"
                                    ? entry[fieldName].map((category: TCategory) =>
                                      category.name).join(", ")
                                    : fieldName === "is_active"
                                      ? entry[fieldName] ?  "True" : "False"
                                      : entry[fieldName]}
                              </td>
                            )
                          })
                        }
                      </tr>
                    )
                  )
                }
            </table>
        }
      </div>
    </Provider>
  );
});

export default App;
