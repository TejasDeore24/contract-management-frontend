import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import type { ContractField, ContractStatus } from "../types/contract";

const lifecycleOrder: ContractStatus[] = ["Created", "Approved", "Sent", "Signed", "Locked"];

export default function Contracts() {
  const { blueprints, addContract, contracts, updateContract } = useAppContext();

  const [selectedBlueprintId, setSelectedBlueprintId] = useState("");
  const [contractName, setContractName] = useState("");
  const [fields, setFields] = useState<ContractField[]>([]);
  const [editingContractId, setEditingContractId] = useState<string | null>(null);

  // When blueprint changes, populate fields
  const handleBlueprintChange = (bpId: string) => {
    setSelectedBlueprintId(bpId);
    const bp = blueprints.find((b) => b.id === bpId);
    if (bp) {
      setFields(
        bp.fields.map((f) => ({
          id: f.id,
          label: f.label,
          type: f.type,
          position: f.position,
          value: f.type === "checkbox" ? false : "",
        }))
      );
    } else {
      setFields([]);
    }
  };

  // Field change
  const handleFieldChange = (id: string, value: string | boolean) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, value } : f)));
  };

  // Save new contract
  const handleSaveContract = () => {
    if (!contractName || !selectedBlueprintId) {
      return alert("Enter contract name and select blueprint!");
    }

    addContract({
      id: uuidv4(),
      name: contractName,
      blueprintId: selectedBlueprintId,
      fields,
      status: "Created",
      createdAt: new Date(),
    });

    // Reset form
    setContractName("");
    setSelectedBlueprintId("");
    setFields([]);
    alert("Contract created!");
  };

  // Update existing contract (editing)
  const handleUpdateContract = () => {
    if (!editingContractId) return;

    const contract = contracts.find((c) => c.id === editingContractId);
    if (!contract) return;

    // Only allow editing if not Locked or Revoked
    if (contract.status === "Locked" || contract.status === "Revoked") {
      return alert("Cannot edit a Locked or Revoked contract!");
    }

    updateContract({
      ...contract,
      name: contractName,
      fields,
    });

    // Reset form
    setContractName("");
    setSelectedBlueprintId("");
    setFields([]);
    setEditingContractId(null);
    alert("Contract updated!");
  };

  // Start editing
  const handleEditContract = (contractId: string) => {
    const contract = contracts.find((c) => c.id === contractId);
    if (!contract) return;

    // Disable editing if Locked or Revoked
    if (contract.status === "Locked" || contract.status === "Revoked") {
      return alert("Cannot edit a Locked or Revoked contract!");
    }

    setEditingContractId(contract.id);
    setContractName(contract.name);
    setSelectedBlueprintId(contract.blueprintId);
    setFields(contract.fields);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 pt-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {editingContractId ? "Edit Contract" : "Create Contract"}
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        {/* Contract Name */}
        <input
          type="text"
          placeholder="Contract Name"
          value={contractName}
          onChange={(e) => setContractName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
          disabled={fields.some(f => f.value === undefined)} // optional safeguard
        />

        {/* Blueprint Selector */}
        <select
          value={selectedBlueprintId}
          onChange={(e) => handleBlueprintChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
          disabled={!!editingContractId} // cannot change blueprint when editing
        >
          <option value="">Select Blueprint</option>
          {blueprints.map((bp) => (
            <option key={bp.id} value={bp.id}>
              {bp.name}
            </option>
          ))}
        </select>

        {/* Fields */}
        {fields.length > 0 && (
          <div className="space-y-4">
            {fields.map((f) => (
              <div key={f.id}>
                <label className="block mb-1 font-medium">{f.label}</label>
                {f.type === "text" || f.type === "date" ? (
                  <input
                    type={f.type}
                    value={f.value as string}
                    onChange={(e) => handleFieldChange(f.id, e.target.value)}
                    disabled={editingContractId
                      ? contracts.find(c => c.id === editingContractId)?.status === "Locked" ||
                        contracts.find(c => c.id === editingContractId)?.status === "Revoked"
                      : false}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                ) : f.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={f.value as boolean}
                    onChange={(e) => handleFieldChange(f.id, e.target.checked)}
                    disabled={editingContractId
                      ? contracts.find(c => c.id === editingContractId)?.status === "Locked" ||
                        contracts.find(c => c.id === editingContractId)?.status === "Revoked"
                      : false}
                    className="h-5 w-5"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Signature"
                    value={f.value as string}
                    onChange={(e) => handleFieldChange(f.id, e.target.value)}
                    disabled={editingContractId
                      ? contracts.find(c => c.id === editingContractId)?.status === "Locked" ||
                        contracts.find(c => c.id === editingContractId)?.status === "Revoked"
                      : false}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        {editingContractId ? (
          <button
            onClick={handleUpdateContract}
            className="mt-6 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
          >
            Update Contract
          </button>
        ) : (
          <button
            onClick={handleSaveContract}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Save Contract
          </button>
        )}
      </div>

      {/* Existing Contracts */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-bold mb-4">Existing Contracts</h2>
        {contracts.length === 0 ? (
          <p className="text-gray-600">No contracts found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Blueprint</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contracts.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{blueprints.find(bp => bp.id === c.blueprintId)?.name}</td>
                  <td className="px-4 py-2">{c.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEditContract(c.id)}
                      className={`px-3 py-1 rounded ${
                        c.status === "Locked" || c.status === "Revoked"
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
