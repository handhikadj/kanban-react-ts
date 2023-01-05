import { ComponentColor, IComponentColors } from '@/types/ui';

export const disabledButtonClassNames = (disabled: boolean) => {
    return disabled ? 'disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed' : ''
}

export const generateRandomBaseMenuColor = (): ComponentColor => {
    const colors: IComponentColors = {
        primary: '#01959F',
        secondary: '#FA9810',
        danger: '#E11428',
        success: '#43936C'
    }

    const colorKeys = Object.keys(colors);
    const randomIndex = Math.floor(Math.random() * colorKeys.length);

    return colorKeys[randomIndex] as ComponentColor;
}