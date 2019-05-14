import React from 'react';
import NavbarContainer from '../nav/navbar-container';
import styles from '../nav/navbar.module.css';
import { withRouter } from 'react-router';
import CradlesIndexContainer from '../cradles/cradles_index_container';


class Feed extends React.Component {

    render() {
        return (
            <div className={styles['feedBodyContainer']}>
                 <NavbarContainer /> 

                <CradlesIndexContainer />

            <div className={styles['frontFooterContainer']}>
                    <footer>
                        <p>Copyright &copy; 2019</p>
                    </footer>
                </div>

            </div>
        );
    }
}

export default withRouter(Feed);
