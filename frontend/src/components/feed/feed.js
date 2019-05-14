import React from 'react';
import NavbarContainer from '../nav/navbar-container';
import styles from '../feed/feed.module.css';
import { withRouter } from 'react-router';
import frontStyles from '../front/front.module.css';
import CradlesIndexContainer from '../cradles/cradles_index_container';

class Feed extends React.Component {

    render() {
        return (
            <div className={styles['feedBodyContainer']}>
                 <NavbarContainer /> 

                <CradlesIndexContainer />

                <div className={frontStyles['frontFooterContainer']}>
                    <footer>
                        <p>Copyright &copy; 2019</p>
                    </footer>
                </div>

            </div>
        );
    }
}

export default withRouter(Feed);
