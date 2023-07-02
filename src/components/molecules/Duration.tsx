import React from 'react';

import tw from 'twin.macro';

import { FlexBox, Typography } from '../atoms';

type DurationType = {
    currentTime: string;
    max: number | string;
    duration: number;
    totalDuration: string;
    onTimeChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Duration = React.forwardRef<HTMLInputElement, DurationType>(({ totalDuration, max, currentTime, duration, onTimeChange, ...rest }, ref) => {
    return (
        <div className="controls absolute bottom-2.5 flex w-[calc(100%_-_20px)] items-center justify-start gap-[5px]">
            <input {...rest} ref={ref} className="w-full appearance-none" type="range" step={1.0} min={0.0} max={max} value={duration} onChange={onTimeChange} />
            <FlexBox twStyle={tw`items-center gap-[2px]`}>
                <Typography component="span" className="text-[12px]">
                    {currentTime || '0:00'}
                </Typography>
                <Typography component="span" className="text-[10px] text-gray-700">
                    /
                </Typography>
                <Typography component="span" className="text-[12px]">
                    {totalDuration?.replace(/\./, ':') || '0:00'}
                </Typography>
            </FlexBox>
        </div>
    );
});

Duration.displayName = 'Duration';

export default Duration;
