import { createContext, Dispatch, SetStateAction } from 'react';

interface ILayoutContext {
  hiddenSidebar: boolean;
  isMobile: boolean;
  collapsedSidebar: boolean;
  hiddenHeader: boolean;
  setHiddenSidebar: Dispatch<SetStateAction<boolean>>;
  setHiddenHeader: Dispatch<SetStateAction<boolean>>;
  setCollapsedSidebar: Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
}

const LayoutContext = createContext<ILayoutContext>({} as ILayoutContext);

export default LayoutContext;
