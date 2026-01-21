export type FieldType = "text" | "date" | "checkbox" | "signature";

export interface FieldPosition {
  x: number;
  y: number;
}

export interface BlueprintField {
  id: string;
  label: string;
  type: FieldType;
  position: FieldPosition;
}

export interface Blueprint {
  id: string;
  name: string;
  fields: BlueprintField[];
  createdAt: string; // ISO string
}
