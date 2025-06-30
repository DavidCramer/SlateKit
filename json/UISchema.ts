// Utility for object children
type SchemaChildrenObject = { [key: string]: UISchemaItem };

// Array children type
type SchemaChildrenArray = UISchemaItem[];

// Event mapping
type Emits = { [eventName: string]: string };

// Condition logic (expand as you add logicUtils support)
type Condition = {
  showIf?: {
    path: string;
    equals?: any;
    notEquals?: any;
    in?: any[];
    notIn?: any[];
  };
  // Additional condition types can be added here
};

export interface UISchemaItem {
  type: string; // Any string, must match a key in typeToComponent at runtime
  props: Record<string, any>;
  children?: SchemaChildrenObject | SchemaChildrenArray;
  bind?: string;
  emits?: Emits;
  conditions?: Condition;
}

export type UISchema = { [rootKey: string]: UISchemaItem };
