import Header from "./Header";
import Footer from "./Footer";
import "./index.css";
import Content from "./content";
import { useState, useEffect } from "react";
import AddItems from "./AddItems";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequset";
function App() {
  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoadong, setIsLoading] = useState(true);
  const API_URL = "http://localhost:3500/items";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive correct reqeust");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
        setIsLoading(false);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      fetchItems();
    }, 1000);
  }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    //Creating new object

    const myNewItem = {
      id,
      checked: false,
      item,
    };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(myNewItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItems = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItems[0].checked }),
    };
    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL, updateOptions);
    if (result) setFetchError(result);
  };
  const handleDelete = async (id) => {
    const deleteItem = items.filter((item) => item.id !== id);
    setItems(deleteItem);

    const deleteOptions = {method:"DELETE"}; 
    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL,deleteOptions)

    if(result) setFetchError(result);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItems) return;
    addItem(newItems);
    setNewItems("");
  };

  return (
    <div className="App">
      <Header title="To do list" />
      <SearchItem search={search} setSearch={setSearch} />

      <AddItems
        newItems={newItems}
        setNewItems={setNewItems}
        handleSubmit={handleSubmit}
      />
      {isLoadong && <p style={{ color: "lightblue" }}>Loading Items...</p>}
      <main>
        {fetchError && (
          <p
            style={{ backgroundColor: "red", color: "white" }}
          >{`Error: ${fetchError}`}</p>
        )}
        {!fetchError && !isLoadong && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
