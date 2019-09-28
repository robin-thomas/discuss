import React, { useState } from "react";

const DataContext = React.createContext();

const DataProvider = props => {
  const [disabled, setDisabled] = useState(false);
  const [address, setAddress] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [colorClass, setColorClass] = useState(null);
  const [page, setPage] = useState("home");

  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});

  const [loadingPosts, setLoadingPosts] = useState(true);

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
        categoryId,
        setCategoryId,
        categories,
        setCategories,
        posts,
        setPosts,
        post,
        setPost,
        loadingPosts,
        setLoadingPosts
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
