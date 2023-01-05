import { PropsWithChildren, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends PropsWithChildren {
    variant?: 'primary' | 'danger' | 'light';
}

export default function Button({ variant = 'primary', children, ...rest }: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
    let className = 'text-white bg-[#01959F] active:bg-[#017D86]';

    if (variant === 'danger') {
        className = 'text-white bg-[#E11428] active:bg-[#CA1224]'    
    } else if (variant === 'light') {
        className = 'text-black border border-[#E0E0E0] active:bg-[#D3D3D3] shadow-sm'
    }

    return (
        <button {...rest} className={`rounded-lg text-sm font-bold py-1 px-4 ${className} ${rest?.className ?? ''}`}>
            {children}
        </button>
    )
}