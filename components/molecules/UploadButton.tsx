import { Typography } from '@atoms';

type UploadButtonType = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UploadButton({ onChange }: UploadButtonType) {
    return (
        <label htmlFor="file" className="w-300">
            <Typography component="p" className="ml-auto w-fit cursor-pointer rounded-md bg-black p-10 text-12 font-bold text-white">
                파일 업로드
            </Typography>
            <input id="file" className="hidden" type="file" accept="audio/*" onChange={onChange} />
        </label>
    );
}
