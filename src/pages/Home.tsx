import { ChangeEvent, useState } from 'react';

import UploadButton from 'components/molecules/UploadButton';
import AudioPlayer from 'components/organisms/AudioPlayer';

export default function Home() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    return (
        <main className="w-full min-h-screen flex justify-center items-center flex-col gap-2.5">
            <UploadButton onChange={onChange} />
            <AudioPlayer uploadedFile={uploadedFile} />
        </main>
    );
}
