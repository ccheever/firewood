import { createContext, useContext, useEffect, useState } from "react";

interface ComposeCtx {
  open: boolean;
  openCompose: () => void;
  closeCompose: () => void;
}

const ComposeContext = createContext<ComposeCtx>({
  open: false,
  openCompose: () => {},
  closeCompose: () => {},
});

export const ComposeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState<ComposeCtx["open"]>(false);

  const openCompose = () => {
    console.log("openCompose called");
    setOpen(true);
  };

  const closeCompose = () => {
    setOpen(false);
  };

  return (
    <ComposeContext.Provider value={{ open, openCompose, closeCompose }}>
      {children}
    </ComposeContext.Provider>
  );
};

export const useCompose = () => {
  const context = useContext(ComposeContext);

  if (!context) {
    throw new Error("useCompose must be used within a ComposeProvider");
  }

  return context;
};
