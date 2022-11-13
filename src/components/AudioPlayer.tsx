/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormEvent, useEffect, useRef, useState } from 'react';

import ControlButtons from 'components/ControlButtons';
import Duration from 'components/Duration';
import Volume from 'components/Volume';
import VolumeControls from 'components/VolumeControls';

interface IAudioPlayer {
    uploadedFile: File | null;
}

export default function AudioPlayer({ uploadedFile }: IAudioPlayer) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const volumeRef = useRef<HTMLInputElement | null>(null);
    const durationRef = useRef<HTMLInputElement | null>(null);
    const totalDurationRef = useRef<string>('0:00');

    const [mode, setMode] = useState('stop');

    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState(0.0);

    const [volume, setVolume] = useState(0.5);
    const [volumeHeight, setVolumeHeight] = useState('50%');

    const [show, setShow] = useState(false);

    const onScreenClick = () => setShow((prev) => !prev);

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (show) {
            timerId = setTimeout(() => setShow(false), 5000);
        }
        return () => clearTimeout(timerId);
    }, [show]);

    const onPlay = () => {
        if (audioRef.current) {
            if (!audioRef.current.src) {
                const url: string = URL.createObjectURL(uploadedFile as File);
                audioRef.current.src = url;
            }

            audioRef.current.load();

            switch (mode) {
                case 'stop':
                    setMode('play');
                    audioRef.current.play();
                    break;
                case 'pause':
                    setMode('play');
                    audioRef.current.currentTime = Number(currentTime);
                    audioRef.current.play();
                    break;
                case 'play':
                    setMode('pause');
                    audioRef.current.pause();
                    break;
                default:
                    break;
            }
        }
    };

    const onTimeUpdate = (e: React.SyntheticEvent<EventTarget>) => {
        const event = e.currentTarget as HTMLAudioElement;
        if (audioRef.current && !audioRef.current.paused && !audioRef.current.ended) {
            totalDurationRef.current = `${Math.floor(audioRef.current.duration / 60)}.${Math.floor(audioRef.current.duration % 60)}`;

            const minutes = Math.floor(event.currentTime / 60);
            const seconds = Math.floor(event.currentTime % 60) < 10 ? `0${Math.floor(event.currentTime % 60)}` : `${Math.floor(event.currentTime % 60)}`;

            setCurrentTime(`${minutes}:${seconds}`);
            durationRef.current!.defaultValue = `${minutes}.${seconds}`;
        }
    };

    const onVolumeChange = (direction: string) => {
        if (audioRef.current) {
            setShow(true);
            audioRef.current.load();
            let newVolume = 0;
            if (direction === 'up') {
                newVolume = volume === 100 ? volume : volume + 0.1;
            } else {
                newVolume = volume === 0 ? volume : volume - 0.1;
            }

            audioRef.current.volume = newVolume;
            volumeRef.current!.value = String(newVolume);
            setVolume(newVolume);
            setVolumeHeight(`calc(100% - ${Math.floor(newVolume * 100)}%)`);
        }
    };

    const onTimeChange = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.split('.');
        let minutes = Number(value[0]);
        let seconds = value[1]?.length === 1 ? `${value[1]}0` : value[1] || '00';

        // 00 -> 59
        if (seconds === '99') {
            setDuration(Number(`${minutes}.59`));
            setCurrentTime(`${minutes}:59`);
            return;
        }

        // 59 -> 00
        const decimal = Number(value[1]);
        if (seconds > '60') {
            minutes += 1;
            seconds = decimal - 60 < 10 ? `0${decimal - 60}` : `${decimal - 60}`;
        } else if (seconds === '60') {
            minutes += 1;
            seconds = '00';
        }

        setDuration(Number(`${minutes}.${seconds}`));
        setCurrentTime(`${minutes}:${seconds}`);
    };

    return (
        <div className="relative w-[300px] h-[500px] bg-black rounded-md p-5">
            <VolumeControls onVolumeChange={onVolumeChange} />
            <div className="overflow-hidden relative w-full h-[150px] bg-blue-50 rounded-md border-2 p-2.5 border-black">
                <div className="h-full" role="button" tabIndex={-1} onKeyDown={onScreenClick} onClick={onScreenClick}>
                    <p className="text-[12px] font-semibold font-mono">{uploadedFile?.name}</p>
                </div>
                {uploadedFile?.name && <Duration ref={durationRef} currentTime={currentTime} totalDuration={totalDurationRef.current || ''} duration={duration} onTimeChange={onTimeChange} />}
            </div>
            {show && <Volume ref={volumeRef} volume={volume} volumeHeight={volumeHeight} />}
            <ControlButtons ref={audioRef} onPlay={onPlay} onTimeUpdate={onTimeUpdate} />
        </div>
    );
}
