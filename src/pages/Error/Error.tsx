import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

// Reference : https://github.com/remix-run/react-router/discussions/9628#discussioncomment-5555901
function getErrorMessage(error: unknown): string {
    if (isRouteErrorResponse(error)) {
        return `${error.status} ${error.statusText}`;
    }
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    return 'Unknown error';
}

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{getErrorMessage(error)}</i>
            </p>
        </div>
    );
}
