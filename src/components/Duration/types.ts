import { FormEvent } from 'react';

export type PropsType = {
    currentTime: string;
    duration: number;
    totalDuration: string;
    onTimeChange: (e: FormEvent<HTMLInputElement>) => void;
};
