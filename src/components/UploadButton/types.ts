import { ChangeEvent } from 'react';

export interface IUploadButton {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
