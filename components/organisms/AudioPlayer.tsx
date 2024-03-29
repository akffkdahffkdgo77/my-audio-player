'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

import Button from '@atoms/Button';
import ControlButtons from '@molecules/ControlButtons';
import Duration from '@molecules/Duration';
import VolumeBar from '@molecules/VolumeBar';
import VolumeControls from '@molecules/VolumeControls';

type AudioPlayerType = {
    uploadedFile: File | null;
};

export default function AudioPlayer({ uploadedFile }: AudioPlayerType) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const volumeRef = useRef<HTMLInputElement | null>(null);
    const durationRef = useRef<HTMLInputElement | null>(null);

    const [mode, setMode] = useState('stop');
    const [show, setShow] = useState(false);

    const [volume, setVolume] = useState(0.5);

    const [max, setMax] = useState(0);
    const [originalTime, setOriginalTime] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [totalDuration, setTotalDuration] = useState('0:00');

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (show) {
            timerId = setTimeout(() => setShow(false), 5000);
        }
        return () => clearTimeout(timerId);
    }, [show]);

    const handleScreenClick = () => setShow((prev) => !prev);

    const handlePlay = () => {
        if (audioRef.current && uploadedFile) {
            if (!audioRef.current.src) {
                const url: string = URL.createObjectURL(uploadedFile as File);
                audioRef.current.src = url;
            }
            audioRef.current.load();

            switch (mode) {
                case 'play':
                    setMode('pause');
                    audioRef.current.pause();
                    break;
                case 'pause':
                    setMode('play');
                    audioRef.current.currentTime = originalTime;
                    audioRef.current.play();
                    break;
                default:
                    setMode('play');
                    audioRef.current.play();
                    break;
            }
        }
    };

    // TODO: time formatter 함수 작성
    const handleTimeUpdate = (e: React.SyntheticEvent<EventTarget>) => {
        const event = e.currentTarget as HTMLAudioElement;
        if (audioRef.current && !audioRef.current.paused && !audioRef.current.ended) {
            if (audioRef.current.duration && totalDuration === '0:00') {
                setMax(audioRef.current.duration);
                setTotalDuration(`${Math.floor(audioRef.current.duration / 60)}.${Math.floor(audioRef.current.duration % 60)}`);
            }

            setOriginalTime(event.currentTime);
            const minutes = Math.floor(event.currentTime / 60);
            const seconds = Math.floor(event.currentTime % 60) < 10 ? `0${Math.floor(event.currentTime % 60)}` : `${Math.floor(event.currentTime % 60)}`;
            setCurrentTime(`${minutes}:${seconds}`);
        } else if (audioRef.current?.ended) {
            setMode('stop');
        }
    };

    const handleVolumeChange = (direction: string) => {
        setShow(true);
        if (uploadedFile && audioRef.current && volumeRef.current) {
            audioRef.current!.pause();

            let newVolume = 0;
            if (direction === 'up') {
                newVolume = volume.toFixed(1) === '1.0' ? 1 : volume + 0.1;
            } else {
                newVolume = volume.toFixed(1) <= '0.0' ? 0 : volume - 0.1;
            }
            audioRef.current.volume = newVolume;
            audioRef.current.play();

            volumeRef.current.value = String(newVolume);
            setVolume(newVolume);
        }
    };

    const handleTimeChange = (e: FormEvent<HTMLInputElement>) => {
        audioRef.current!.pause();

        const currentValue = Number(e.currentTarget.value);
        setOriginalTime(currentValue);

        const value = String(currentValue / 100).split('.');
        let minutes = Number(value[0]);
        let seconds = value[1]?.length === 1 ? `${value[1]}0` : value[1] || '00';

        // 00 -> 59
        if (seconds === '99') {
            setCurrentTime(`${minutes}:59`);
            audioRef.current!.currentTime = Number(`${minutes}:59`) * 100;
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

        setCurrentTime(`${minutes}:${seconds}`);
        audioRef.current!.currentTime = currentValue;
        audioRef.current!.play();
    };

    return (
        <div className="relative h-500 w-300 rounded-md bg-black p-20">
            <VolumeControls onVolumeChange={handleVolumeChange} />
            <div className="relative h-150 w-full overflow-hidden rounded-md border-2 border-black bg-blue-50 p-10">
                <Button className="h-full w-full" onClick={handleScreenClick}>
                    <p className="animate-pulse font-mono text-12 font-semibold">{uploadedFile?.name}</p>
                </Button>
                {uploadedFile?.name && !!originalTime && (
                    <Duration ref={durationRef} currentTime={currentTime} max={max} totalDuration={totalDuration} duration={originalTime} onTimeChange={handleTimeChange} />
                )}
            </div>
            {show && <VolumeBar ref={volumeRef} volume={volume} />}
            <ControlButtons ref={audioRef} onPlay={handlePlay} onTimeUpdate={handleTimeUpdate} />
        </div>
    );
}
