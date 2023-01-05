import { useState } from 'react';

export default function useForm<T>(initialValues: T) {
    const [formValues, setFormValues] = useState<T>(initialValues);

    const originalValues: T = Object.assign({}, initialValues);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const reset = () => {
        setFormValues(originalValues);
    }
    
    return {
        formValues,
        setFormValues,
        handleChange,
        reset
    };
}