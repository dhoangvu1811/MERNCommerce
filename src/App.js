import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { isJsonString } from './until';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from './services/UserService';
import { updateUser } from './redux/slices/userSlice';
import LoadingComponent from './components/LoadingComponent/LoadingComponent';

function App() {
    const dispatch = useDispatch();
    //set loading
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    // Hook useEffect để lấy thông tin user từ localStorage
    useEffect(() => {
        setLoading(true);
        const { decoded, accessTokenStorage } = handleDecoded();
        if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, accessTokenStorage);
        }
        setLoading(false);
    }, []);

    const handleDecoded = () => {
        let accessTokenStorage = localStorage.getItem('access_token');
        let decoded = {};
        if (accessTokenStorage && isJsonString(accessTokenStorage)) {
            accessTokenStorage = JSON.parse(accessTokenStorage);
            decoded = jwtDecode(accessTokenStorage);
        }
        return { decoded, accessTokenStorage };
    };

    // Add a request interceptor
    UserService.axiosJWT.interceptors.request.use(
        async function (config) {
            const currentTime = new Date();
            const { decoded } = handleDecoded();
            if (decoded?.exp < currentTime.getTime() / 1000) {
                const data = await UserService.refreshToken();
                config.headers['token'] = `Bearer ${data?.access_token}`;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    // Hàm lấy thông tin user
    const handleGetDetailsUser = async (id, access_token) => {
        const res = await UserService.getDetailsUser(id, access_token);
        dispatch(updateUser({ ...res?.data, access_token: access_token }));
        setLoading(false);
    };
    return (
        <div>
            <LoadingComponent isPending={loading}>
                <Router>
                    <Routes>
                        {routes.map((route, index) => {
                            let Layout = DefaultComponent;
                            // Kiểm tra xem route có phải là admin không và user có phải là admin không
                            const isCheckAuth = !route.isAdmin || user.isAdmin;
                            const Page = route.component;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={isCheckAuth ? route.path : undefined}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                ></Route>
                            );
                        })}
                    </Routes>
                </Router>
            </LoadingComponent>
        </div>
    );
}
export default App;
