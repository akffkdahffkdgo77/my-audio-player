/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/media-has-caption */
import { ChangeEvent, useRef, useState } from 'react';

import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';

export default function Home() {
    const audio = useRef<HTMLAudioElement | null>(null);
    const [files, setFiles] = useState<string[]>([]);
    const [current, setCurrent] = useState<File | null>(null);
    const [mode, setMode] = useState('stop');
    const currentTime = useRef<number>(0);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url: string = URL.createObjectURL(file);
            setFiles((prev) => [...prev, url]);
            setCurrent(file);
            if (audio.current) {
                audio.current.src = url;
            }
        }
    };

    const onPlay = () => {
        if (audio.current) {
            audio.current.load();

            switch (mode) {
                case 'stop':
                    setMode('play');
                    audio.current.play();
                    break;
                case 'pause':
                    setMode('play');
                    audio.current.currentTime = currentTime.current;
                    audio.current.play();
                    break;
                case 'play':
                    setMode('pause');
                    audio.current.pause();
                    break;
                default:
                    break;
            }
        }
    };

    const onTimeUpdate = (e: React.SyntheticEvent<EventTarget>) => {
        const event = e.currentTarget as HTMLAudioElement;
        if (!audio.current?.paused && !audio.current?.ended) {
            currentTime.current = event.currentTime;
        }
    };

    return (
        <main className="w-full min-h-screen flex justify-center items-center flex-col gap-2.5">
            <label htmlFor="file">
                <input type="file" accept="audio/*" onChange={onChange} />
            </label>
            <div className="w-[300px] h-[500px] bg-black rounded-md p-5">
                <div className="w-full h-[150px] bg-blue-50 rounded-md border-2 border-black">{current && current?.name}</div>
                <div className="py-[100px] flex justify-center items-center">
                    <div className="relative bg-white text-black rounded-full w-[150px] h-[150px]">
                        <button className="absolute top-[7px] left-[calc(50%-22.5px)] w-[45px] text-[12px] uppercase font-semibold" type="button">
                            Menu
                        </button>
                        <button title="rewind" className="absolute -left-[5px] top-[calc(50%-9px)]  w-[45px] flex justify-center items-center" type="button">
                            <BackwardIcon className="w-[18px] h-[18px]" />
                        </button>
                        <div className="absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)] bg-black rounded-full w-[75px] h-[75px]">
                            <audio ref={audio} controls className="hidden" onTimeUpdate={onTimeUpdate} />
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
            </div>
        </main>
    );
}
