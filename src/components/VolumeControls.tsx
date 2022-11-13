interface IVolumeControls {
    onVolumeChange: (direction: string) => void;
}
export default function VolumeControls({ onVolumeChange }: IVolumeControls) {
    return (
        <div className="absolute -right-[5px] flex flex-col gap-[0.5px]">
            <button className="w-[5px] h-[30px] bg-black" aria-label="volume up" title="volume up" type="button" onClick={() => onVolumeChange('up')} />
            <button className="w-[5px] h-[30px] bg-black" aria-label="volume down" title="volume down" type="button" onClick={() => onVolumeChange('down')} />
        </div>
    );
}
