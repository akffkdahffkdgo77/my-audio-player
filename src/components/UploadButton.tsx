import { ChangeEvent } from 'react';

interface IUploadButton {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadButton({ onChange }: IUploadButton) {
    return (
        <label htmlFor="file" className="w-[300px]">
            <p className="cursor-pointer ml-auto text-white w-fit bg-black text-[12px] font-bold p-2.5 rounded-md">파일 업로드</p>
            <input id="file" className="hidden" type="file" accept="audio/*" onChange={onChange} />
        </label>
    );
}
