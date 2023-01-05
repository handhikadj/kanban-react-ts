import { DropdownContext } from '@/contexts/dropdown-context';
import useDropdownContext from '@/hooks/useDropdownContext'
import { useRef, PropsWithChildren, useState, ElementType, HTMLAttributes, MouseEvent } from 'react';
import useClickAway from '@/hooks/useClickAway';
import Transition from './Transition';

interface CustomComponentWithChildrenProps extends PropsWithChildren {
    Component?: keyof JSX.IntrinsicElements|ElementType;
}

function Trigger({ Component = 'button', children, ...rest }: CustomComponentWithChildrenProps & HTMLAttributes<HTMLElement>) {
    const { dropdownOpen, setDropdownOpen } = useDropdownContext();

    return <Component {...rest} onClick={() => setDropdownOpen(!dropdownOpen)}>{children}</Component>;
}
 
function Content({ Component = 'ul', children, ...rest }: CustomComponentWithChildrenProps & HTMLAttributes<HTMLElement>) {
    const dropdown = useRef<HTMLUListElement>(null);

    const { dropdownOpen, setDropdownOpen } = useDropdownContext();

    useClickAway(dropdown, () => setDropdownOpen(false));

    return (
        <Transition
            show={dropdownOpen}
            className={'origin-top-right z-10 absolute top-full bg-white border border-slate-200 py-3.5 px-5 rounded-lg shadow-md mt-2 left-0 w-max cursor-default'}
            enter="transition ease-out duration-200 transform"
            enterStart="opacity-0 -translate-y-2"
            enterEnd="opacity-100 translate-y-0"
            leave="transition ease-out duration-200"
            leaveStart="opacity-100"
            leaveEnd="opacity-0"
        >
            <Component
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                {...rest}
            >
                {children}
            </Component>
        </Transition>
    );
}

function ContentItem({ Component = 'li', children, ...rest }: CustomComponentWithChildrenProps & HTMLAttributes<HTMLElement>) {
    const { setDropdownOpen } = useDropdownContext();

    return (
        <Component 
            {...rest}
            onClick={(e: MouseEvent<HTMLElement>) => {
                setDropdownOpen(false)
                rest?.onClick?.(e)
            }}
        >
            {children}
        </Component>
    );
}

function Dropdown({ children }: PropsWithChildren) {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    return (
        <DropdownContext.Provider value={{ dropdownOpen, setDropdownOpen }}>
            <div className="relative flex">{children}</div>
        </DropdownContext.Provider>
    )
}

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.ContentItem = ContentItem;

export default Dropdown;