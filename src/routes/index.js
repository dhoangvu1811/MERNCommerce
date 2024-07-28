import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import NotHeaderComponent from '../components/NotHeaderComponent/NotHeaderComponent';
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage';
import ProfilePage from '../pages/Profile/ProfilePage';

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
        path: '/:type',
        component: TypeProductPage,
    },
    {
        path: '/sign-up',
        component: SignUpPage,
        layout: NotHeaderComponent,
    },
    {
        path: '/sign-in',
        component: SignInPage,
        layout: NotHeaderComponent,
    },
    {
        path: '/product-detail',
        component: ProductDetailPage,
    },
    {
        path: '/profile-user',
        component: ProfilePage,
    },
    {
        path: '*',
        component: NotFoundPage,
        layout: NotHeaderComponent,
    },
];
