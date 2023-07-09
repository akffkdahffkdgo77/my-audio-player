import React from 'react';

type VolumeType = {
    volume: number;
};

const Volume = React.forwardRef<HTMLInputElement, VolumeType>(({ volume }, ref) => {
    return (
        <label htmlFor="volume" className="absolute bottom-[45px] right-[30px] top-[45px] h-100 w-20 overflow-hidden bg-blue-50">
            <div style={{ height: `calc(100% - ${Math.floor(volume * 100)}%)` }} className="absolute right-0 top-[-1px] z-50 h-0 w-17 bg-blue-50" />
            <input
                ref={ref}
                id="volume"
                type="range"
                max={1}
                min={0}
                step={0.1}
                defaultValue={volume}
                disabled
                className="absolute right-[-41px] top-[41px] h-0 w-[99px] -rotate-90 appearance-none focus:outline-none"
            />
        </label>
    );
});

Volume.displayName = 'Volume';

export default Volume;
