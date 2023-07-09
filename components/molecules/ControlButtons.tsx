/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

import { FlexBox, Button } from '@atoms';

import tw from 'twin.macro';

import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';

type ControlButtonsType = {
    onPlay: () => void;
    onTimeUpdate: (e: React.SyntheticEvent<EventTarget>) => void;
};

const ControlButtons = React.forwardRef<HTMLAudioElement, ControlButtonsType>(({ onPlay, onTimeUpdate }, ref) => {
    return (
        <FlexBox twStyle={tw`items-center justify-center py-100`}>
            <div className="relative h-150 w-150 rounded-full bg-white text-black">
                <Button className="absolute left-[calc(50%-22.5px)] top-[7px] w-45 text-12 font-semibold uppercase">Menu</Button>
                <Button title="rewind" className="absolute -left-[5px] top-[calc(50%-9px)] flex w-45 items-center justify-center">
                    <BackwardIcon className="h-18 w-18" />
                </Button>
                <div className="absolute left-1/2 top-1/2 h-[75px] w-[75px] rounded-full bg-black [transform:translate(-50%,-50%)]">
                    <audio ref={ref} controls className="hidden" onTimeUpdate={onTimeUpdate} />
                </div>
                <Button className="absolute bottom-[10.5px] right-[calc(50%-22.5px)] flex w-45 items-center justify-center uppercase" onClick={onPlay}>
                    <PlayIcon className="h-12 w-12" />
                    <PauseIcon className="h-12 w-12" />
                </Button>
                <Button title="fast forward" className="absolute -right-[5px] bottom-[calc(50%-9px)] flex w-45 items-center justify-center">
                    <ForwardIcon className="h-18 w-18" />
                </Button>
            </div>
        </FlexBox>
    );
});

ControlButtons.displayName = 'ControlButtons';

export default ControlButtons;
