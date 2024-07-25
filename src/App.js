import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function App() {
    // useEffect(() => {
    //     fetchApi();
    // }, []);
    const fetchApi = async () => {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/product/getAll`
        );
        return res.data;
    };
    // Queries
    const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi });
    console.log('query', query);
    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route, index) => {
                        let Layout = DefaultComponent;
                        const Page = route.component;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
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
        </div>
    );
}
export default App;
