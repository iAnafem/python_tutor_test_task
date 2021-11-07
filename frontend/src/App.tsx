import React from "react";
import { observer, Provider } from "mobx-react";

const App = observer(() => {

  return (
    <Provider store>
      <div>
        <p>Hello from React default project</p>
      </div>
    </Provider>
  );
});

export default App;
