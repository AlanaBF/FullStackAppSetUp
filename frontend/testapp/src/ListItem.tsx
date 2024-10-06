import React, {useState} from "react";
import { List, Item, NewItem } from "./types";  // Import 'NewItem'
import ItemForm from "./ItemForm";

interface ListItemProps {
  list: List;
  onDeleteList: (listId: number) => Promise<void>;
  onAddItem: (listId: number, item: NewItem) => Promise<void>; // Use 'NewItem' here
  onUpdateItem: (item: Item) => Promise<void>;
  onDeleteItem: (itemId: number) => Promise<void>;
}

const ListItem: React.FC<ListItemProps> = ({
  list,
  onDeleteList,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
}) => {
    const [isEditing, setIsEditing] = useState<number | null>(null); // Track editing state for an item
    const [editedItem, setEditedItem] = useState<Item | null>(null); // Hold the current edited item state
  
      // Handle toggling the completed state of an item
  const toggleCompleted = (item: Item) => {
    onUpdateItem({ ...item, completed: !item.completed });
  };

    // Handle editing an item
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editedItem) {
          setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
        }
      };
    
      const saveEdit = async () => {
        if (editedItem) {
          await onUpdateItem(editedItem);
          setIsEditing(null);
        }
      };

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{list.name}</h5>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDeleteList(list.id)}
        >
          Delete List
        </button>
      </div>
      <div
        className=""
      >
        {/* Render the items for this list */}
        {list.items.length > 0 ? (
          list.items.map((item) => (
            <div key={item.id} className="d-flex justify-content-between align-items-center  border-bottom ">
           {isEditing === item.id ? (
                <>
                  {/* Editing Mode */}
                  <div className="">
                    <input
                      type="text"
                      name="name"
                      value={editedItem?.name || ''}
                      onChange={handleEditChange}
                      className="form-control me-2"
                      placeholder="Edit item name"
                    />
                  </div>
                 
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setIsEditing(null)}
                  >
                    Cancel
                  </button>
                 
                </>

              ) : (
                <>
                  {/* Display Mode */}
                  <div className="">
                    {/* Checkbox to toggle completed state */}
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={item.completed}
                        onChange={() => toggleCompleted(item)}
                        title={`Mark ${item.name} as ${item.completed ? 'incomplete' : 'complete'}`}
                      />
                      <label
                        className={`form-check-label ${item.completed ? 'text-decoration-line-through' : ''}`}
                      >
                        {item.name}
                      </label>
                    </div>
                  </div>
                  <div>
                  <div className="button-group">
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => {
                        setIsEditing(item.id);
                        setEditedItem(item);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDeleteItem(item.id)}
                    >
                      x
                    </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No items in this list.</p>
        )}
      </div>
      <div className="card-footer">
        <ItemForm onAddItem={(item: NewItem) => onAddItem(list.id, item)} />
      </div>
    </div>
  );
};


export default ListItem;