import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FooterComponent = () => {
    return (
        <div className='container my-5'>
            <footer
                className='text-center text-lg-start text-white'
                style={{ backgroundColor: '#1c2331' }}
            >
                <section
                    className='d-flex justify-content-between p-4'
                    style={{ backgroundColor: '#6351ce' }}
                >
                    <div className='me-5'>
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <a href='#' className='text-white me-4'>
                            <i className='fab fa-facebook-f'></i>
                        </a>
                        <a href='#' className='text-white me-4'>
                            <i className='fab fa-twitter'></i>
                        </a>
                        {/* ... (các liên kết mạng xã hội khác) ... */}
                    </div>
                </section>

                <section className=''>
                    <div className='container text-center text-md-start mt-5'>
                        <div className='row mt-3'>
                            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold'>
                                    Company name
                                </h6>
                                <hr
                                    className='mb-4 mt-0 d-inline-block mx-auto'
                                    style={{
                                        width: '60px',
                                        backgroundColor: '#7c4dff',
                                        height: '2px',
                                    }}
                                />
                                <p>
                                    Here you can use rows and columns to
                                    organize your footer content. Lorem ipsum
                                    dolor sit amet, consectetur adipisicing
                                    elit.
                                </p>
                            </div>

                            {/* ... (các phần còn lại của footer) ... */}
                        </div>
                    </div>
                </section>

                <div
                    className='text-center p-3'
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                >
                    © 2020 Copyright:
                    <a className='text-white' href='https://mdbootstrap.com/'>
                        MDBootstrap.com
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default FooterComponent;
