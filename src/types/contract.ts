import type { FieldType } from "./blueprint";

export type ContractStatus =
  | "Created"
  | "Approved"
  | "Sent"
  | "Signed"
  | "Locked"
  | "Revoked";

export interface ContractField {
  id: string;
  label: string;
  type: FieldType;
  position: { x: number; y: number };
  value?: string | boolean;
}

export interface Contract {
  id: string;
  name: string;
  blueprintId: string;
  fields: ContractField[];
  status: ContractStatus;
  createdAt: string; // ISO string for localStorage
}
