import { FormEvent, forwardRef } from 'react';

type PropsType = {
    currentTime: string;
    duration: number;
    totalDuration: string;
    onTimeChange: (e: FormEvent<HTMLInputElement>) => void;
};

const Duration = forwardRef<HTMLInputElement, PropsType>(({ currentTime, totalDuration, duration, onTimeChange, ...rest }, ref) => {
    return (
        <div className="controls absolute bottom-2.5 flex justify-start items-center gap-[5px] w-[calc(100%_-_20px)]">
            <input {...rest} ref={ref} className="w-full appearance-none" type="range" step={0.01} min={0.0} max={totalDuration} value={duration} onChange={onTimeChange} />
            <div className="flex items-center gap-[2px]">
                <span className="text-[12px]">{currentTime || '0:00'}</span>
                <span className="text-[10px] text-gray-700">/</span>
                <span className="text-[12px]">{totalDuration?.replace(/\./, ':') || '0:00'}</span>
            </div>
        </div>
    );
});

Duration.displayName = 'Duration';

export default Duration;
