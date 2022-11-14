/* eslint-disable jsx-a11y/media-has-caption */
import { forwardRef } from 'react';

import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';

import { PropsType } from 'components/ControlButtons/types';

const ControlButtons = forwardRef<HTMLAudioElement, PropsType>(({ onPlay, onTimeUpdate }, ref) => {
    return (
        <div className="py-[100px] flex justify-center items-center">
            <div className="relative bg-white text-black rounded-full w-[150px] h-[150px]">
                <button className="absolute top-[7px] left-[calc(50%-22.5px)] w-[45px] text-[12px] uppercase font-semibold" type="button">
                    Menu
                </button>
                <button title="rewind" className="absolute -left-[5px] top-[calc(50%-9px)] w-[45px] flex justify-center items-center" type="button">
                    <BackwardIcon className="w-[18px] h-[18px]" />
                </button>
                <div className="absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)] bg-black rounded-full w-[75px] h-[75px]">
                    <audio ref={ref} controls className="hidden" onTimeUpdate={onTimeUpdate} />
                </div>
                <button className="absolute bottom-[10.5px] right-[calc(50%-22.5px)] w-[45px] flex justify-center items-center uppercase" type="button" onClick={onPlay}>
                    <PlayIcon className="w-[12px] h-[12px]" />
                    <PauseIcon className="w-[12px] h-[12px]" />
                </button>
                <button title="fast forward" className="absolute -right-[5px] bottom-[calc(50%-9px)] w-[45px] flex justify-center items-center" type="button">
                    <ForwardIcon className="w-[18px] h-[18px]" />
                </button>
            </div>
        </div>
    );
});

ControlButtons.displayName = 'ControlButtons';

export default ControlButtons;
