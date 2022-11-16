import { FormEvent } from 'react';

export type PropsType = {
    currentTime: string;
    max: number | string;
    duration: number;
    totalDuration: string;
    onTimeChange: (e: FormEvent<HTMLInputElement>) => void;
};
