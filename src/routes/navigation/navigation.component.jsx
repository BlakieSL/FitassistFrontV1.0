import { Fragment } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navBar/navBar.component';

const Navigation = () => {
    return (
        <Fragment>
            <Navbar />
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
