import { useRef, PropsWithChildren, useEffect, HTMLAttributes } from 'react';
import useClickAway from '@/hooks/useClickAway';
import Transition from './Transition';
import CloseModal from '@/assets/icons/close-modal.svg';

interface ModalProps extends PropsWithChildren {
    title: string|JSX.Element;
    scrollable?: boolean;
    modalOpen: boolean;
    handleClose: (open: boolean) => void;
}

export default function Modal({
    children,
    title,
    scrollable = false,
    modalOpen,
    handleClose,
    ...rest
}: ModalProps & HTMLAttributes<HTMLElement>) {

    const modalContent = useRef<HTMLDivElement>(null);

    useClickAway(modalContent, () => handleClose(false))

    useEffect(() => {
        if (!scrollable && modalOpen) {
            document.body.classList.add('overflow-y-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-y-hidden');
        }
    }, [modalOpen])

    return (
        <>
            {/* Modal backdrop */}
            <Transition
                className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition"
                show={modalOpen}
                enter="transition ease-out duration-300"
                enterStart="opacity-0"
                enterEnd="opacity-100"
                leave="transition ease-out duration-300"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
                aria-hidden="true"
            />

            <Transition
                className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
                role="dialog"
                aria-modal="true"
                show={modalOpen}
                enter="transition ease-in-out duration-300"
                enterStart="opacity-0 translate-y-4"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-300"
                leaveStart="opacity-100 translate-y-0"
                leaveEnd="opacity-0 translate-y-4"
            >
                <div ref={modalContent} {...rest} className={`bg-white rounded-[.70rem] shadow-md overflow-auto w-[26rem] p-6 ${rest?.className ?? ''}`}>
                    <div className="flex justify-between items-center mb-6">
                        <div className="font-bold text-black text-lg">{title}</div>

                        <button onClick={(e) => { e.stopPropagation(); handleClose(false); }}>
                            <div className="sr-only">Close</div>
                            <img src={CloseModal} />
                        </button>
                    </div>

                    {children}
                </div>        
            </Transition>
        </>
    );
}