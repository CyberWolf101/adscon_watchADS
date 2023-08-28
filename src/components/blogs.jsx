import React from 'react';
import blog1 from '../assets/Blog2.png'
import blog2 from '../assets/blog-2.jpg'
import blog3 from '../assets/Blog1.png'

function Blogs(props) {
    return (
        <div>
            <div className="container-fluid py-5">
                <div className="container pt-5 pb-3">
                    <div className="text-center mb-5">
                        <h5 className="text-primary text-uppercase mb-3" style={{letterSpacing: "5px"}}>Our Blog</h5>
                        <h4>Latest From Our Blog</h4>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-4 mb-4 mt-4">
                            <div className="blog-item position-relative overflow-hidden rounded mb-2">
                                <img className="img-fluid" src={blog1} alt=""/>
                                    <a className="blog-overlay text-decoration-none" href="">
                                        <h5 className="text-white mb-3">Trending Treasures. Discover the Latest & Greatest Products Online!</h5>
                                        <p className="text-primary m-0">Apr 11, 2023</p>
                                    </a>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="blog-item position-relative overflow-hidden rounded mb-2">
                                <img className="img-fluid" src={blog2} alt=""/>
                                    <a className="blog-overlay text-decoration-none" href="">
                                        <h5 className="text-white mb-3">Budget-Friendly Finds. Amazing Deals & Discounts You Can't Miss!</h5>
                                        <p className="text-primary m-0">May 24, 2023</p>
                                    </a>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="blog-item position-relative overflow-hidden rounded mb-2">
                                <img className="img-fluid" src={blog3} alt=""/>
                                    <a className="blog-overlay text-decoration-none" href="">
                                        <h5 className="text-white mb-3">Shop Smart, Live Better: Explore Top Products for a Fulfilling Life!</h5>
                                        <p className="text-primary m-0">Jan 01, 2023</p>
                                    </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blogs;