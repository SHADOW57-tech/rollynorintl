import { createContext, useContext, useRef } from "react";

interface NavigationContextType {
  getDirection: (path: string) => number;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const historyStack = useRef<string[]>([]);

  const getDirection = (path: string) => {
    const index = historyStack.current.indexOf(path);

    if (index === -1) {
      historyStack.current.push(path);
      return 1; // forward
    }

    historyStack.current = historyStack.current.slice(0, index + 1);
    return -1; // backward
  };

  return (
    <NavigationContext.Provider value={{ getDirection }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationDirection = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationDirection must be used inside provider");
  }
  return context;
};
