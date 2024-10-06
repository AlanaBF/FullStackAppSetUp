// Import necessary modules and components
import React from "react";
import Item from "./Item"; // Import the 'Item' component to render each item in the list
import { Item as ItemType } from "./types"; // Import the 'Item' type and alias it as 'ItemType'

// Define the interface for the component's props
interface ItemListProps {
  items: ItemType[]; // An array of 'ItemType' objects representing the list of items
  onUpdateItem: (item: ItemType) => Promise<void>; // Function to update an item, returns a Promise
  onDeleteItem: (id: number) => Promise<void>; // Function to delete an item by its ID, returns a Promise
}

// Define the 'ItemList' component as a React Functional Component with 'ItemListProps' as its props type
const ItemList: React.FC<ItemListProps> = ({ items, onUpdateItem, onDeleteItem }) => {
  // Render the list of items
  return (
    <div>
      {/* Map over the 'items' array to render an 'Item' component for each item */}
      {items.map((item) => (
        <Item
          key={item.id} // Unique key prop required by React when rendering lists
          item={item} // Pass the 'item' object as a prop to the 'Item' component
          onUpdateItem={onUpdateItem} // Pass the 'onUpdateItem' function as a prop
          onDeleteItem={onDeleteItem} // Pass the 'onDeleteItem' function as a prop
        />
      ))}
    </div>
  );
};

// Export the 'ItemList' component as the default export
export default ItemList;

