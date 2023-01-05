import React, { useRef, useEffect, useContext, HTMLAttributes, ElementType, PropsWithChildren } from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

interface TransitionContextProps {
    parent: {
        show: boolean;
        appear?: boolean;
        isInitialRender?: boolean;
    }
}

const TransitionContext = React.createContext<TransitionContextProps>({
    parent: {
        show: false,
        appear: false,
    },
})

function useIsInitialRender(): boolean {
    const isInitialRender = useRef(true);

    useEffect(() => {
        isInitialRender.current = false;
    }, [])
    
    return isInitialRender.current;
}

interface ICSSTransitionProps extends PropsWithChildren {
    show: boolean;
    timeout?: number;
    enter?: string;
    enterFrom?: string;
    enterTo?: string;
    leave?: string;
    leaveFrom?: string;
    leaveTo?: string;
    enterStart?: string;
    enterEnd?: string;
    leaveStart?: string;
    leaveEnd?: string;
    appear?: boolean;
    unmountOnExit?: boolean;
    tag?: keyof JSX.IntrinsicElements;
    className?: string;
}

function CSSTransition({
    show,
    enter = '',
    enterStart = '',
    enterEnd = '',
    leave = '',
    leaveStart = '',
    leaveEnd = '',
    appear,
    unmountOnExit,
    tag = 'div',
    children,
    ...rest
}: ICSSTransitionProps & HTMLAttributes<HTMLElement>) {
    const enterClasses = enter.split(' ').filter((s) => s.length);
    const enterStartClasses = enterStart.split(' ').filter((s) => s.length);
    const enterEndClasses = enterEnd.split(' ').filter((s) => s.length);
    const leaveClasses = leave.split(' ').filter((s) => s.length);
    const leaveStartClasses = leaveStart.split(' ').filter((s) => s.length);
    const leaveEndClasses = leaveEnd.split(' ').filter((s) => s.length);
    const removeFromDom = unmountOnExit;

    function addClasses(node: HTMLElement, classes: string[]) {
        classes.length && node.classList.add(...classes);
    }

    function removeClasses(node: HTMLElement, classes: string[]) {
        classes.length && node.classList.remove(...classes);
    }

    const nodeRef = React.useRef<HTMLElement>(null);
    
    const Component = tag as ElementType

    return (
        <ReactCSSTransition
            appear={appear}
            nodeRef={nodeRef}
            unmountOnExit={removeFromDom}
            in={show}
            addEndListener={(done) => {
                nodeRef.current?.addEventListener('transitionend', done, false)
            }}
            onEnter={() => {
                if (!removeFromDom) nodeRef.current?.style.removeProperty('display');

                if (nodeRef.current) {
                    addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses])
                }
            }}
            onEntering={() => {
                if (nodeRef.current) {
                    removeClasses(nodeRef.current, enterStartClasses)
                    addClasses(nodeRef.current, enterEndClasses)
                }
            }}
            onEntered={() => {
                if (nodeRef.current) {
                    removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses])
                }
            }}
            onExit={() => {
                if (nodeRef.current) {
                    addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses])
                }
            }}
            onExiting={() => {
                if (nodeRef.current) {
                    removeClasses(nodeRef.current, leaveStartClasses)
                    addClasses(nodeRef.current, leaveEndClasses)
                }
            }}
            onExited={() => {
                if (nodeRef.current) {
                    removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses])
                    if (!removeFromDom) nodeRef.current.style.display = 'none';
                }
            }}
        >
            <Component ref={nodeRef} {...rest} style={{ display: !removeFromDom ? 'none' : null }}>{children}</Component>
        </ReactCSSTransition>
    )
}

function Transition({ show, appear, ...rest }: ICSSTransitionProps & HTMLAttributes<HTMLElement>) {
    const { parent } = useContext(TransitionContext);
    const isInitialRender = useIsInitialRender();
    const isChild = show === undefined;

    if (isChild) {
        return (
            <CSSTransition
                appear={parent.appear || !parent.isInitialRender}
                show={parent.show}
                {...rest}
            />
        )
    }

    return (
        <TransitionContext.Provider
            value={{
                parent: {
                    show,
                    isInitialRender,
                    appear,
                },
            }}
        >
            <CSSTransition appear={appear} show={show} {...rest} />
        </TransitionContext.Provider>
    )
}

export default Transition;