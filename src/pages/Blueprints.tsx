import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import type { BlueprintField, FieldType } from "../types/blueprint";

export default function Blueprints() {
  const {
    blueprints,
    contracts,
    addBlueprint,
    updateBlueprint,
    deleteBlueprint,
  } = useAppContext();

  const [blueprintName, setBlueprintName] = useState("");
  const [fields, setFields] = useState<BlueprintField[]>([]);
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldType, setFieldType] = useState<FieldType>("text");
  const [editingBlueprintId, setEditingBlueprintId] = useState<string | null>(null);

  // Add a field
  const handleAddField = () => {
    if (!fieldLabel) return;
    setFields([
      ...fields,
      { id: uuidv4(), label: fieldLabel, type: fieldType, position: { x: 50, y: 50 } },
    ]);
    setFieldLabel("");
    setFieldType("text");
  };

  // Remove a field
  const handleRemoveField = (fieldId: string) => {
    setFields(fields.filter(f => f.id !== fieldId));
  };

  // Save blueprint (add or update)
  const handleSaveBlueprint = () => {
    if (!blueprintName) return alert("Enter blueprint name!");
    const blueprintData = {
      id: editingBlueprintId || uuidv4(),
      name: blueprintName,
      fields,
      createdAt: new Date().toISOString(),
    };

    if (editingBlueprintId) {
      updateBlueprint(blueprintData);
    } else {
      addBlueprint(blueprintData);
    }

    setBlueprintName("");
    setFields([]);
    setEditingBlueprintId(null);
  };

  // Edit blueprint
  const handleEditBlueprint = (bpId: string) => {
    const bp = blueprints.find(b => b.id === bpId);
    if (!bp) return;
    setEditingBlueprintId(bp.id);
    setBlueprintName(bp.name);
    setFields(bp.fields);
  };

  // Delete blueprint
  const handleDeleteBlueprint = (bpId: string) => {
    deleteBlueprint(bpId);
    if (editingBlueprintId === bpId) {
      setEditingBlueprintId(null);
      setBlueprintName("");
      setFields([]);
    }
  };

  // Check if blueprint has any contracts
  const blueprintHasContracts = (bpId: string) =>
    contracts.some(c => c.blueprintId === bpId);

  return (
    <div className="min-h-screen p-6 bg-gray-50 pt-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        {editingBlueprintId ? "Edit Blueprint" : "Create Blueprint"}
      </h1>

      {/* Blueprint Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
        <input
          type="text"
          placeholder="Blueprint Name"
          value={blueprintName}
          onChange={e => setBlueprintName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Field Label"
            value={fieldLabel}
            onChange={e => setFieldLabel(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={fieldType}
            onChange={e => setFieldType(e.target.value as FieldType)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="text">Text</option>
            <option value="date">Date</option>
            <option value="checkbox">Checkbox</option>
            <option value="signature">Signature</option>
          </select>
          <button
            onClick={handleAddField}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Field
          </button>
        </div>

        {/* Fields List */}
        {fields.length > 0 && (
          <ul className="mb-4">
            {fields.map(f => (
              <li key={f.id} className="flex justify-between items-center text-gray-700 mb-1">
                <span>{f.label} ({f.type})</span>
                <button
                  onClick={() => handleRemoveField(f.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleSaveBlueprint}
          className={`mt-4 px-6 py-2 rounded-md text-white transition ${
            editingBlueprintId ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {editingBlueprintId ? "Update Blueprint" : "Save Blueprint"}
        </button>
      </div>

      {/* Existing Blueprints */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blueprints.map(bp => (
          <div key={bp.id} className="bg-white p-6 rounded-xl shadow-md relative">
            <h3 className="text-xl font-semibold mb-2">{bp.name}</h3>
            <ul className="text-gray-700 mb-4">
              {bp.fields.map(f => (
                <li key={f.id}>{f.label} ({f.type})</li>
              ))}
            </ul>

            <div className="flex gap-2 absolute bottom-4 right-4">
              <button
                onClick={() => handleEditBlueprint(bp.id)}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteBlueprint(bp.id)}
                className={`px-3 py-1 text-white rounded-md transition ${
                  blueprintHasContracts(bp.id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={blueprintHasContracts(bp.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
