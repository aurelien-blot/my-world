import { useRef } from "react";

export function useLongPress(
    onLongPress: () => void,
    onClick: () => void,
    { delay = 500 } = {}
) {
    const timerRef = useRef<number | null>(null);

    const onTouchStart = () => {
        timerRef.current = window.setTimeout(() => {
            onLongPress();
            timerRef.current = null;
        }, delay);
    };

    const onTouchEnd = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            onClick();
        }
    };

    return { onTouchStart, onTouchEnd };
}
