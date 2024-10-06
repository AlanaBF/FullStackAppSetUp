// types.ts
export interface Item {
  id: number;
  name: string;
  completed: boolean;
  list_id: number;  // Add the 'list_id' to associate the item with its list
}

export interface NewItem {
  name: string;
  completed?: boolean;
}

export interface List {
  id: number;
  name: string;
  items: Item[]; // Each list has multiple items
}

export interface NewList {
  name: string;  // The name of the list
}
  