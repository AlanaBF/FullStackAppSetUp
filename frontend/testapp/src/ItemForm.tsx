// Import necessary modules and types from React and your custom types
import React, { useState } from "react";
import { NewItem } from "./types"; // Import the 'NewItem' interface from your types file

// Define the interface for the component's props
interface ItemFormProps {
  // 'onAddItem' is a function prop that takes a 'NewItem' and returns a Promise<void>
  onAddItem: (item: NewItem) => Promise<void>;
}

// Define the 'ItemForm' component as a React Functional Component with 'ItemFormProps' as its props type
const ItemForm: React.FC<ItemFormProps> = ({ onAddItem }) => {
  // Declare a state variable 'item' with its setter 'setItem'
  // Initialize it with an object containing empty 'name' and 'description' strings
  const [item, setItem] = useState<NewItem>({ name: "", description: "" });

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior (page refresh)
    // Basic validation: check if 'name' and 'description' are not empty
    if (!item.name || !item.description) {
      alert("Please fill in all fields."); // Alert the user if fields are empty
      return; // Exit the function early
    }
    // Call the 'onAddItem' prop function to add the new item
    await onAddItem(item);
    // Reset the form fields to empty strings after submission
    setItem({ name: "", description: "" });
  };

  // Render the form component
  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
      {/* Input field for the item's name */}
      <input
        type="text"
        placeholder="Name" // Placeholder text when the input is empty
        value={item.name} // Bind the input's value to 'item.name' state
        onChange={(e) => setItem({ ...item, name: e.target.value })} // Update 'item.name' on input change
      />
      </div>
      {/* Input field for the item's description */}
      <div className="mb-2">
      <input
        type="text"
        placeholder="Description"
        value={item.description} // Bind the input's value to 'item.description' state
        onChange={(e) => setItem({ ...item, description: e.target.value })} // Update 'item.description' on input change
      />
      </div>
      {/* Submit button to add the item */}
      <button className="btn custom-btn" type="submit">Add Item</button>
    </form>
  );
};

// Export the 'ItemForm' component as the default export
export default ItemForm;

