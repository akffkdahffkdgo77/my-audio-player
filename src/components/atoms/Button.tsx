import React from 'react';

type ButtonType = React.HTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Button({ children, onClick = () => {}, ...props }: ButtonType) {
    return (
        <button {...props} type="button" onClick={onClick}>
            {children}
        </button>
    );
}
