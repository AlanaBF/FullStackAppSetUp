// App.tsx;
import React, { useState, useEffect } from "react";
import ListForm from "./ListForm";
import ListItem from "./ListItem";
import Login from "./Login";  // Assuming you have a Login component
import Register from "./Register";  // Assuming you have a Register component
import { List, NewList, Item, NewItem } from "./types";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from "./Footer";

const App: React.FC = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false); // Handle toggle between login and register

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
      fetchLists();
    }
  }, []);

  const fetchLists = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/lists/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          localStorage.removeItem("accessToken");
        }
        console.error(`Error fetching lists: ${response.statusText}`);
        return;
      }

      const data: List[] = await response.json();
      setLists(data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const addList = async (list: NewList) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/lists/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(list),
      });
      if (response.ok) {
        const newList: List = await response.json();
        setLists([...lists, newList]);
      } else {
        console.error(`Error adding list: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  const deleteList = async (listId: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/lists/${listId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setLists(lists.filter((list) => list.id !== listId));
      } else {
        console.error(`Error deleting list: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const addItem = async (listId: number, item: NewItem) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/items/list/${listId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        const newItem: Item = await response.json();
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === listId ? { ...list, items: [...list.items, newItem] } : list
          )
        );
      } else {
        console.error(`Error adding item: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (item: Item) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/items/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        const updatedItem: Item = await response.json();
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === updatedItem.list_id
              ? {
                  ...list,
                  items: list.items.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
                }
              : list
          )
        );
      } else {
        console.error(`Error updating item: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (listId: number, itemId: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/items/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === listId
              ? { ...list, items: list.items.filter((item) => item.id !== itemId) }
              : list
          )
        );
      } else {
        console.error(`Error deleting item: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle login success and token retrieval
  const handleLogin = () => {
    setIsAuthenticated(true);
    fetchLists(); // Fetch lists upon successful login
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setLists([]); // Clear lists on logout
  };

  // Authentication handling
  if (!isAuthenticated) {
    return showRegister ? (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="text-center mb-4">
          <img src="/ToDoLogo.png" alt="Todo App Logo" style={{ width: '200px', height: 'auto' }} />
        </div>
        <div className="register-container">
          <Register />
          <p className="text-center mt-4">
            Already have an account?{" "}
            <button className="btn custom-btn" onClick={() => setShowRegister(false)}>Login</button>
          </p>
        </div>
        <Footer />
      </div>
    ) : (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="text-center mb-4">
          <img src="/ToDoLogo.png" alt="Todo App Logo" style={{ width: '200px', height: 'auto' }} />
        </div>
        <div className="login-container">
          <Login onLogin={handleLogin} />
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <button className="btn custom-btn" onClick={() => setShowRegister(true)}>Register</button>
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
      <div className="app-container">
        <Navbar onLogout={handleLogout} />
        <br />
        <div className="container-fluid main-content">
        <div className="content-wrapper">
          <h1 className="mb-4">To Do Lists</h1>
    
          {/* Form to create a new list */}
          <ListForm onAddList={addList} />
    
          {/* Add a container that allows horizontal scrolling */}
          <div className="lists-container">
            <div className="row">
              {/* Render each list with its associated items */}
              {lists.map((list) => (
                <div className="col-12 col-md-6 mb-4" key={list.id}>
                  <div className="">
                    <ListItem
                      key={list.id}
                      list={list}
                      onDeleteList={deleteList}
                      onAddItem={addItem}
                      onUpdateItem={updateItem}
                      onDeleteItem={(itemId) => deleteItem(list.id, itemId)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
        <br />
        <Footer />
      </div>
    );
};

export default App;