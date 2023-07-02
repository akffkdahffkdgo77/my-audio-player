import { createBrowserRouter } from 'react-router-dom';

import BaseLayout from '@/layout';
import ErrorPage from '@pages/Error';
import Home from '@pages/Home';

const router = createBrowserRouter([
    {
        path: '',
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Home />
            }
        ]
    }
]);

export default router;
