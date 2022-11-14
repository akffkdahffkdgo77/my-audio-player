import { SyntheticEvent } from 'react';

export type PropsType = {
    onPlay: () => void;
    onTimeUpdate: (e: SyntheticEvent<EventTarget>) => void;
};
