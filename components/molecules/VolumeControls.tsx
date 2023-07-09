import Button from '@atoms/Button';

type VolumeControlsType = {
    onVolumeChange: (direction: string) => void;
};

export default function VolumeControls({ onVolumeChange }: VolumeControlsType) {
    return (
        <div className="absolute -right-[5px] flex flex-col gap-[0.5px]">
            <Button className="h-30 w-5 bg-black" aria-label="volume up" title="volume up" onClick={() => onVolumeChange('up')} />
            <Button className="h-30 w-5 bg-black" aria-label="volume down" title="volume down" onClick={() => onVolumeChange('down')} />
        </div>
    );
}
