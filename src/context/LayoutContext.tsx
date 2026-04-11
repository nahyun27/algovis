import { createContext, useContext, useState, type ReactNode } from 'react';

interface LayoutContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  codeDrawerOpen: boolean;
  setCodeDrawerOpen: (v: boolean) => void;
}

const LayoutContext = createContext<LayoutContextValue>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
  codeDrawerOpen: false,
  setCodeDrawerOpen: () => {},
});

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [codeDrawerOpen, setCodeDrawerOpen] = useState(false);
  return (
    <LayoutContext.Provider value={{ sidebarOpen, setSidebarOpen, codeDrawerOpen, setCodeDrawerOpen }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
