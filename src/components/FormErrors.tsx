import { HTMLAttributes } from 'react'

interface FormErrorsProps {
    errors: string[]
}

export default function FormErrors({ errors, ...rest }: FormErrorsProps & HTMLAttributes<HTMLElement>) {
    return (
        <ul {...rest} className={`p-2 border-2 border-red-300 rounded-md ${rest?.className ?? ''}`}>
            {errors.map(error => {
                return (
                    <li key={error} className="text-xs font-bold text-red-500">
                        {error}
                    </li>
                )
            })}
        </ul>
    )
}