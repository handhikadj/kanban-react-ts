import { HTMLAttributes } from 'react';

interface TextFieldProps {
    id: string;
    label: string;
    name: string;
    placeholder?: string;
    value?: string | ReadonlyArray<string> | number | undefined;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function TextField({ id, label, name, placeholder, value, handleChange, inputProps, ...rest }: TextFieldProps & HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...rest}>
            <label 
                htmlFor={id}
                className="text-xs font-bold mb-2 block"
            >
                {label}
            </label>

            <input 
                {...inputProps} 
                type={inputProps?.type ?? 'text'} 
                id={id}
                placeholder={placeholder}
                value={value}
                name={name}
                className={`border-2 border-[#EDEDED] rounded-lg py-2 px-4 text-xs ${inputProps?.className ?? ''}`}
                onChange={handleChange}
            />
        </div>
    )
}