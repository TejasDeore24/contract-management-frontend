import  { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Contract } from "../types/contract";
import type { Blueprint } from "../types/blueprint";

// Context type
interface AppContextType {
  blueprints: Blueprint[];
  contracts: Contract[];
  addBlueprint: (bp: Blueprint) => void;
  updateBlueprint: (bp: Blueprint) => void;
  deleteBlueprint: (id: string) => void;
  addContract: (c: Contract) => void;
  updateContract: (c: Contract) => void;
  deleteContract: (id: string) => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// localStorage keys
const BLUEPRINTS_KEY = "contract_blueprints";
const CONTRACTS_KEY = "contracts";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Load blueprints from localStorage
  const [blueprints, setBlueprints] = useState<Blueprint[]>(() => {
    const stored = localStorage.getItem(BLUEPRINTS_KEY);
    return stored ? JSON.parse(stored) : [];
  });

 // Load contracts from localStorage
const [contracts, setContracts] = useState<Contract[]>(() => {
  const stored = localStorage.getItem(CONTRACTS_KEY);
  return stored ? JSON.parse(stored) : [];
});

  // Persist blueprints
  useEffect(() => {
    localStorage.setItem(BLUEPRINTS_KEY, JSON.stringify(blueprints));
  }, [blueprints]);

  // Persist contracts
  useEffect(() => {
    localStorage.setItem(CONTRACTS_KEY, JSON.stringify(contracts));
  }, [contracts]);

  // Blueprint CRUD
  const addBlueprint = (bp: Blueprint) => setBlueprints(prev => [...prev, bp]);

  const updateBlueprint = (bp: Blueprint) =>
    setBlueprints(prev => prev.map(b => (b.id === bp.id ? bp : b)));

  const deleteBlueprint = (id: string) => {
    // Prevent deletion if contracts exist for this blueprint
    const hasContracts = contracts.some(c => c.blueprintId === id);
    if (hasContracts) {
      alert("Cannot delete blueprint: contracts exist using this blueprint.");
      return;
    }
    setBlueprints(prev => prev.filter(b => b.id !== id));
  };

  // Contract CRUD
  const addContract = (c: Contract) => setContracts(prev => [...prev, c]);

  const updateContract = (c: Contract) =>
    setContracts(prev => prev.map(con => (con.id === c.id ? c : con)));

  const deleteContract = (id: string) =>
    setContracts(prev => prev.filter(c => c.id !== id));

  return (
    <AppContext.Provider
      value={{
        blueprints,
        contracts,
        addBlueprint,
        updateBlueprint,
        deleteBlueprint,
        addContract,
        updateContract,
        deleteContract,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
