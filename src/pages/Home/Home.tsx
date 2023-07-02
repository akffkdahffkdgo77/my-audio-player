import { ChangeEvent, useState } from 'react';

import UploadButton from '@molecules/UploadButton';
import AudioPlayer from '@organisms/AudioPlayer';

export default function Home() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    return (
        <>
            <UploadButton onChange={onChange} />
            <AudioPlayer uploadedFile={uploadedFile} />
        </>
    );
}
