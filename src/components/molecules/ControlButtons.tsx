/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';

import Button from 'components/atoms/Button';

type ControlButtonsType = {
    onPlay: () => void;
    onTimeUpdate: (e: React.SyntheticEvent<EventTarget>) => void;
};

const ControlButtons = React.forwardRef<HTMLAudioElement, ControlButtonsType>(({ onPlay, onTimeUpdate }, ref) => {
    return (
        <div className="py-[100px] flex justify-center items-center">
            <div className="relative bg-white text-black rounded-full w-[150px] h-[150px]">
                <Button className="absolute top-[7px] left-[calc(50%-22.5px)] w-[45px] text-[12px] uppercase font-semibold">Menu</Button>
                <Button title="rewind" className="absolute -left-[5px] top-[calc(50%-9px)] w-[45px] flex justify-center items-center">
                    <BackwardIcon className="w-[18px] h-[18px]" />
                </Button>
                <div className="absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)] bg-black rounded-full w-[75px] h-[75px]">
                    <audio ref={ref} controls className="hidden" onTimeUpdate={onTimeUpdate} />
                </div>
                <Button className="absolute bottom-[10.5px] right-[calc(50%-22.5px)] w-[45px] flex justify-center items-center uppercase" onClick={onPlay}>
                    <PlayIcon className="w-[12px] h-[12px]" />
                    <PauseIcon className="w-[12px] h-[12px]" />
                </Button>
                <Button title="fast forward" className="absolute -right-[5px] bottom-[calc(50%-9px)] w-[45px] flex justify-center items-center">
                    <ForwardIcon className="w-[18px] h-[18px]" />
                </Button>
            </div>
        </div>
    );
});

ControlButtons.displayName = 'ControlButtons';

export default ControlButtons;
