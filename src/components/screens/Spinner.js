import React from 'react';
import '../../App.css';
import Spinner from 'react-bootstrap/Spinner'

const SpinnerComponent = () => {
    return ( 
        <div className="Component_div d-flex">
            <Spinner animation="grow" variant="primary" size="xxl" />
            <Spinner animation="grow" variant="primary" size="xxl" />
            <Spinner animation="grow" variant="primary" size="xxl" />
            <h2 className="pl-5">Loading..... Please Wait</h2>
        </div>
    );
}
 
export default SpinnerComponent;