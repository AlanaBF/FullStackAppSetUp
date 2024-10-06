// Item.tsx
import React, { useState, useEffect } from "react";
import { Item as ItemType } from "./types";

interface ItemProps {
  item: ItemType;
  onUpdateItem: (item: ItemType) => Promise<void>;
  onDeleteItem: (id: number) => Promise<void>;
}

const Item: React.FC<ItemProps> = ({ item, onUpdateItem, onDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState<ItemType>(item);

  useEffect(() => {
    setEditedItem(item);
  }, [item]);

  const handleToggleComplete = () => {
    onUpdateItem({ ...item, completed: !item.completed });
  };

  const handleDelete = () => {
    onDeleteItem(item.id);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    onUpdateItem(editedItem);
    setIsEditing(false);
  };

  return (
    <div className="w-100">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="d-flex align-items-center border rounded p-2">
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={item.completed}
              onChange={handleToggleComplete}
              title="Toggle completion"
              className="form-check-input me-2"
            />

            {/* Content */}
            <div className="d-flex align-items-center flex-grow-1">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedItem.name}
                    onChange={handleEditChange}
                    placeholder="Edit name"
                    className="form-control me-2"
                    style={{ maxWidth: "150px" }}
                  />
                  {/* Buttons in Editing Mode */}
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="me-3 text-truncate"
                    style={{
                      textDecoration: item.completed ? "line-through" : "none",
                      maxWidth: "150px",
                      minWidth: "0",
                    }}
                  >
                    <strong>{item.name}</strong>
                  </div>
                  {/* Buttons in Non-Editing Mode */}
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;

