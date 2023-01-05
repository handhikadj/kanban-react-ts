import { useEffect, RefObject } from 'react';

const EVENT = 'mousedown';

export default function useClickAway(
    ref: RefObject<HTMLElement>, 
    callback: (event: MouseEvent) => void
) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref || !ref.current || ref.current.contains(event.target as HTMLElement)) {
                return;
            }
            
            callback(event);
        }

        document.addEventListener(EVENT, listener);
        
        return () => {
            document.removeEventListener(EVENT, listener);
        };
    }, [ref, callback]);
}
