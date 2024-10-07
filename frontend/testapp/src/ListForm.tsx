// ListForm.tsx
import React, { useState } from "react";
import { NewList } from "./types";  // Create a 'NewList' interface in 'types.ts'

interface ListFormProps {
  onAddList: (list: NewList) => Promise<void>;
}

const ListForm: React.FC<ListFormProps> = ({ onAddList }) => {
  const [listName, setListName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listName) {
      alert("Please provide a name for the list.");
      return;
    }
    await onAddList({ name: listName });
    setListName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
        <h2>Create new list</h2>
        <input
          type="text"
          placeholder="List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="form-control mb-3"
        />
      </div>
      <button className="btn custom-btn" type="submit">Create List</button>
    </form>
  );
};

export default ListForm;