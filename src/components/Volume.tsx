import { forwardRef } from 'react';

type Propstype = {
    volume: number;
    volumeHeight: string;
};

const Volume = forwardRef<HTMLInputElement, Propstype>(({ volumeHeight, volume }, ref) => {
    return (
        <label htmlFor="volume" className="overflow-hidden w-[20px] h-[100px] absolute top-[45px] right-[30px] bottom-[45px] bg-blue-50">
            <div style={{ height: volumeHeight }} className="z-50 h-0 w-[17px] bg-blue-50 absolute top-[-1px] right-0" />
            <input
                disabled
                ref={ref}
                id="volume"
                className="h-0 w-[99px] absolute top-[41px] right-[-41px] appearance-none focus:outline-none -rotate-90"
                type="range"
                max={1}
                min={0}
                step={0.1}
                defaultValue={volume}
            />
        </label>
    );
});

Volume.displayName = 'Volume';

export default Volume;
