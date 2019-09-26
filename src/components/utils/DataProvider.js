import React, { useState } from "react";

const DataContext = React.createContext();

const DataProvider = props => {
  const [disabled, setDisabled] = useState(false);
  const [address, setAddress] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [colorClass, setColorClass] = useState(null);
  const [page, setPage] = useState("home");

  const [categories, setCategories] = useState([]);

  return (
    <DataContext.Provider
      value={{
        disabled,
        setDisabled,
        address,
        setAddress,
        wallet,
        setWallet,
        colorClass,
        setColorClass,
        page,
        setPage,
        categories,
        setCategories
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

const DataConsumer = DataContext.Consumer;

export { DataConsumer };
export { DataContext };
export default DataProvider;
