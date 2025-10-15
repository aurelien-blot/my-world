import {useRef} from "react";

export const navigationService = {

    useSafeClick : (onClick: () => void) => {
        const startY = useRef<number | null>(null);
        const isDragging = useRef(false);

        const handleStart = (y: number) => {
            startY.current = y;
            isDragging.current = false;
        };

        const handleMove = (y: number) => {
            if (startY.current !== null && Math.abs(y - startY.current) > 5) {
                isDragging.current = true;
            }
        };

        const handleEnd = () => {
            if (!isDragging.current) onClick();
            startY.current = null;
        };

        return {
            onMouseDown: (e: React.MouseEvent) => handleStart(e.clientY),
            onMouseMove: (e: React.MouseEvent) => handleMove(e.clientY),
            onMouseUp: handleEnd,
            onTouchStart: (e: React.TouchEvent) => handleStart(e.touches[0].clientY),
            onTouchMove: (e: React.TouchEvent) => handleMove(e.touches[0].clientY),
            onTouchEnd: handleEnd,
        };
    }
};