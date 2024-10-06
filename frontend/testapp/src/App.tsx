// App.tsx
import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";
import Login from "./Login";
import { Item, NewItem } from "./types";
import Register from "./Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from "./Footer";


const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
      fetchItems();
    }
  }, []);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/items/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Unauthorized, prompt login
          setIsAuthenticated(false);
          localStorage.removeItem("accessToken");
        }
        console.error(`Error fetching items: ${response.statusText}`);
        return;
      }

      const data: Item[] = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addItem = async (item: NewItem) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        const newItem: Item = await response.json();
        setItems([...items, newItem]);
      } else {
        console.error(`Error adding item: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (updatedItem: Item) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:8000/items/${updatedItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedItem),
        }
      );
      if (response.ok) {
        const newItem: Item = await response.json();
        setItems(
          items.map((item) => (item.id === newItem.id ? newItem : item))
        );
      } else {
        console.error(`Error updating item: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setItems(items.filter((item) => item.id !== id));
      } else {
        console.error(`Error deleting item: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    fetchItems();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setItems([]);
  };

  const [showRegister, setShowRegister] = useState<boolean>(false);

  if (!isAuthenticated) {
    return showRegister ? (
      <div className="container-fluid w-100 h-100 mt-5">
          <div className="text-center">
          <img src="/ToDoLogo.png" alt="Todo App Logo" style={{ width: '200px', height: 'auto' }} />
        </div>
        <div className="row">
          <div className="col-12">
            <Register />
            <p className="p-5">
              Already have an account?{" "}
              <button className="btn custom-btn" onClick={() => setShowRegister(false)}>Login</button>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    ) : (
      <div className="container-fluid w-100 h-100 mt-5">
                  <div className="text-center">
          <img src="/ToDoLogo.png" alt="Todo App Logo" style={{ width: '200px', height: 'auto' }} />
        </div>
        <div className="row">
          <div className="col-12">
            <Login onLogin={handleLogin} />
            <p className="">
              Don't have an account?{" "}
              <button className="btn custom-btn" onClick={() => setShowRegister(true)}>Register</button>
            </p>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar at the top and full-width */}
      <Navbar onLogout={handleLogout}/>
      
      {/* Main content container */}
      <div className="container-fluid mt-5 p-3">
        <h1>To Do List</h1>
        
        <ItemForm onAddItem={addItem} />
        <ItemList
          items={items}
          onUpdateItem={updateItem}
          onDeleteItem={deleteItem}
        />
        
        {/* Logout button
        <button className="btn custom-btn" onClick={handleLogout}>Logout</button> */}
      </div>
      <Footer />
    </div>
  );
};

export default App;
