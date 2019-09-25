import React, { useContext } from "react";

import getComponent from "./Component";
import { DataContext } from "../utils/DataProvider";

function App() {
  const ctx = useContext(DataContext);

  return <div className="App">{getComponent(ctx.page)}</div>;
}

export default App;
