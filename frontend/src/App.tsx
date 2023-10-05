import React, {useEffect, useState} from "react";
import instance from "./store";
import {observer, Provider} from "mobx-react";
import {TCategory, TProductsInfo, TSignUpInputData} from "./types";

const App = observer(() => {
  const store = instance;
  const [isSignUpOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  let productsInfoEndpoint = "http://localhost:8999/api/market/products-info/";
  let loginEndpoint = "http://localhost:8999/api/users/login/";
  let signUpEndpoint = "http://localhost:8999/api/users/sign-up/";

  return (
    <Provider store>
      <div>
        <p>Welcome to Market application!</p>
        {store.userDetails.user &&
            <button
                type="button"
                style={{margin: 10}}
                onClick={() => store.fetch(productsInfoEndpoint, store.setProductsInfoData)}
            >
                Load products info
            </button>}
        {store.userDetails.token === undefined &&
            <div>
              {<div>
                <div>
                    <div>
                        <label htmlFor="email">Enter your email</label>
                        <input type="text" name="email" id="email" required style={{margin: 10}}
                               onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Enter your password</label>
                        <input type="password" name="password" id="password" required style={{margin: 10}}
                               onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button type="submit"
                            onClick={() => {
                              store.post(loginEndpoint, store.setUserDetails, {
                              email: email,
                              password: password
                            })
                            setIsOpen(false)
                            }}
                    >
                        Login
                    </button>
                </div>
            </div>}
                <p> OR </p>
                <button onClick={() => setIsOpen(!isSignUpOpen)}>
                    SIGN UP
                </button>
            </div>
        }
        {isSignUpOpen &&
            <div>
                <div>
                    <div>
                        <label htmlFor="first_name">Enter your first name</label>
                        <input type="text" name="first_name" id="first_name" style={{margin: 10}}
                               onChange={(event) => setFirstName(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="last_name">Enter your last name</label>
                        <input type="text" name="last_name" id="last_name" style={{margin: 10}}
                               onChange={(event) => setLastName(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="username">Enter your username</label>
                        <input type="text" name="username" id="username" style={{margin: 10}}
                               onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Enter your email</label>
                        <input type="text" name="email" id="email" required style={{margin: 10}}
                               onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Enter your password</label>
                        <input type="password" name="password" id="password" required style={{margin: 10}}
                               onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button type="submit"
                            onClick={() => {
                              store.post(signUpEndpoint, store.userRegistered, {
                              email: email,
                              username: username,
                              password: password,
                              first_name: firstName,
                              last_name: lastName
                            })
                            setIsOpen(false)
                            }}
                    >
                        Register
                    </button>
                </div>
            </div>
        }
        {store.projectsInfo.length > 0 && store.userDetails.token &&
            <table
                style={{fontFamily: "arial, sans-serif", borderCollapse: "collapse", width: "90%"}}>
                <tr>
                  {Object.keys(store.projectsInfo[0]).map((fieldName: string, idx: number) => (
                    <th
                      style={{border: "1px solid #dddddd", textAlign: "center", padding: "8px"}}
                      key={`${idx}_${fieldName}_field`
                      }>
                      {fieldName}
                    </th>
                  ))}
                </tr>
              {
                store.projectsInfo.map((entry: TProductsInfo, rowIdx: number) => (
                    <tr key={`${rowIdx}_row`}
                        style={{backgroundColor: rowIdx % 2 === 0 ? "#dddddd" : "white"}}>
                      {
                        Object.keys(entry).map((field: string, key_idx: number) => {
                          let fieldName = `${field}` as keyof TProductsInfo
                          return (
                            <td
                              key={`${rowIdx}_${key_idx}`}
                              style={{
                                border: "1px solid #dddddd",
                                textAlign: "left",
                                padding: "8px"
                              }}
                            >
                              {
                                fieldName === "categories"
                                  ? entry[fieldName].map((category: TCategory) =>
                                    category.name).join(", ")
                                  : fieldName === "is_active"
                                    ? entry[fieldName] ? "True" : "False"
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
