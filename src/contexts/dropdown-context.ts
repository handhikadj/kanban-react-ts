import { createContext } from 'react';

export interface DropdownContextProps {
    dropdownOpen: boolean;
    setDropdownOpen: (open: boolean) => void;
}

export const DropdownContext = createContext<DropdownContextProps>({
    dropdownOpen: false,
    setDropdownOpen: () => undefined,
})