import React from 'react';

type ButtonType = React.HTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ children, onClick, ...rest }: ButtonType) {
    return (
        <button
            {...rest}
            type="button"
            onClick={(e) => {
                if (onClick) {
                    onClick(e);
                }
            }}
        >
            {children}
        </button>
    );
}
