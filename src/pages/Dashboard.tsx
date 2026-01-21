import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import type { ContractStatus } from "../types/contract";

const lifecycleOrder: ContractStatus[] = ["Created", "Approved", "Sent", "Signed", "Locked"];

export default function Dashboard() {
  const { contracts, blueprints, updateContract } = useAppContext();
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString();
  const getBlueprintName = (id: string) => {
    const bp = blueprints.find((b) => b.id === id);
    return bp ? bp.name : "Unknown Blueprint";
  };
  const selectedContract = contracts.find((c) => c.id === selectedContractId);

  // Move contract to next lifecycle step
  const handleNextStep = (c: typeof contracts[0]) => {
    if (c.status === "Locked" || c.status === "Revoked") return;
    const currentIndex = lifecycleOrder.indexOf(c.status);
    if (currentIndex === -1 || currentIndex === lifecycleOrder.length - 1) return;
    const nextStatus = lifecycleOrder[currentIndex + 1];
    updateContract({ ...c, status: nextStatus });
  };

  // Revoke contract
  const handleRevoke = (c: typeof contracts[0]) => {
    if (c.status === "Revoked") return;
    updateContract({ ...c, status: "Revoked" });
  };

  const statusColor = (status: ContractStatus) => {
    switch (status) {
      case "Created": return "bg-yellow-100 text-yellow-800";
      case "Approved": return "bg-blue-100 text-blue-800";
      case "Sent": return "bg-purple-100 text-purple-800";
      case "Signed": return "bg-green-100 text-green-800";
      case "Locked": return "bg-gray-200 text-gray-800";
      case "Revoked": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Contracts Dashboard</h1>

      {contracts.length === 0 ? (
        <p className="text-gray-600 text-lg">No contracts found. Create one to get started!</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contract Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Blueprint</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">View / Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contracts.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 font-medium text-gray-800">{c.name}</td>
                  <td className="px-6 py-4 text-gray-700">{getBlueprintName(c.blueprintId)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(c.createdAt)}</td>
                  <td className="px-6 py-4 flex gap-2">
                    {c.status !== "Locked" && c.status !== "Revoked" && (
                      <button
                        onClick={() => handleNextStep(c)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Next
                      </button>
                    )}
                    {c.status !== "Revoked" && (
                      <button
                        onClick={() => handleRevoke(c)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedContractId(c.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      View / Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Viewing/Editing Agreement */}
      {selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-2/3 max-h-[80vh] overflow-y-auto p-8 relative">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{selectedContract.name}</h2>
            <p className="mb-3 text-gray-700">
              <strong>Blueprint:</strong> {getBlueprintName(selectedContract.blueprintId)}
            </p>
            <p className="mb-6 text-gray-700">
              <strong>Status:</strong> {selectedContract.status}
            </p>

            <div className="space-y-4">
              {selectedContract.fields.map((f) => (
                <div key={f.id}>
                  <label className="block mb-1 font-medium text-gray-800">{f.label}</label>
                  {f.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={f.value as boolean}
                      disabled={selectedContract.status === "Locked" || selectedContract.status === "Revoked"}
                      className="h-5 w-5"
                    />
                  ) : (
                    <input
                      type={f.type === "text" || f.type === "signature" ? "text" : "date"}
                      value={f.value as string}
                      disabled={selectedContract.status === "Locked" || selectedContract.status === "Revoked"}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedContractId(null)}
              className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
