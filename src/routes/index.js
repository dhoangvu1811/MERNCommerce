import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import NotHeaderComponent from '../components/NotHeaderComponent/NotHeaderComponent';
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import AdminPage from '../pages/AdminPage/AdminPage';
import PaymentPage from '../pages/PaymentPage/PaymentPage';
import OrderSuccess from '../pages/OrderSuccess/OrderSuccess';

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
        path: '/payment',
        component: PaymentPage,
    },
    {
        path: '/orderSuccess',
        component: OrderSuccess,
    },
    {
        path: '/products',
        component: ProductsPage,
    },
    {
        path: '/product/:type',
        component: TypeProductPage,
    },
    {
        path: '/sign-in',
        component: SignInPage,
        layout: NotHeaderComponent,
    },
    {
        path: '/product-detail/:id',
        component: ProductDetailPage,
    },
    {
        path: '/profile-user',
        component: ProfilePage,
    },
    {
        path: '/system/admin',
        component: AdminPage,
        layout: NotHeaderComponent,
        isAdmin: true,
    },
    {
        path: '*',
        component: NotFoundPage,
        layout: NotHeaderComponent,
    },
];
