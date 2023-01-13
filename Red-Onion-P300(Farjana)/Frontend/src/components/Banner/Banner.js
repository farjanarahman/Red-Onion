import React from 'react';
import './Banner.css'

const Banner = () => {
    return (
        <div>
            <div className="row ">
                <div className="banner col-md-12 ">
                    <div className="center">
                        <h1>Best food waiting for your belly</h1>
                        <br/>
                        <div className="searchArea">
                            {/* <input className="search" type="text" placeholder="Search food items" />
                            <button className="btn-danger searchBtn ">Search</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;