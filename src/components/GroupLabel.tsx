import { ComponentColor } from '@/types/ui';

interface GroupLabelProps {
    label: string;
    variant?: ComponentColor;
}

export default function GroupLabel({ label, variant = 'primary' }: GroupLabelProps) { 
    return (
        <div className={`leading-none p-2 menu-${variant} text-${variant} rounded w-fit text-xs`}>
            {label}
        </div>
    )
}