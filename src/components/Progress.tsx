import ChecklistProgress from '@/assets/icons/checklist-progress.svg'
import { HTMLAttributes } from 'react'

interface ProgressProps {
    value?: number
}

export default function Progress({ value, ...rest }: ProgressProps & HTMLAttributes<HTMLDivElement>) {
    const progressBackground = value && value >= 100 ? 'bg-[#43936C]' : 'bg-[#01959F]'
    const progressRounded = value && value >= 100 ? 'rounded-full' : 'rounded-l-full'
    
    return (
        <div {...rest} className={`flex items-center w-full ${rest?.className ?? ''}`}>
            <div className={'rounded-full h-4 bg-[#EDEDED] w-full relative mr-3 overflow-hidden'}>
                <div className={`${progressRounded} h-4 transition-all duration-700 ${progressBackground}`} style={{ width: `${value ?? 0}%` }}></div>
            </div>
            
            {value && value >= 100 ? <img src={ChecklistProgress} /> : <p className="text-xs font-inter text-[#757575]">{value ?? 0}%</p>}
        </div>
    )
}