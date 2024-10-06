// 'Item' interface defines the structure of an item object in your application
export interface Item {
  id: number;           // Unique identifier for the item (assigned by the backend/database)
  name: string;         // The name or title of the item
  description: string;  // A detailed description of the item
  completed: boolean;   // A flag indicating whether the item is completed (true) or not (false)
}

// 'NewItem' interface defines the structure of a new item object before it is saved to the backend
export interface NewItem {
  name: string;           // The name or title of the new item
  description: string;    // A detailed description of the new item
  completed?: boolean;    // Optional flag indicating completion status; defaults to false if not provided
  // The '?' denotes that 'completed' is an optional property
}

  