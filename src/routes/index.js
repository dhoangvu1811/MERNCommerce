import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import NotHeaderComponent from '../components/NotHeaderComponent/NotHeaderComponent';

export const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/order',
        component: OrderPage,
    },
    {
        path: '/products',
        component: ProductsPage,
    },
    {
        path: '*',
        component: NotFoundPage,
        layout: NotHeaderComponent,
    },
];
