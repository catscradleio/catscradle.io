import React from 'react';
import NavbarContainer from '../nav/navbar-container';
import styles from '../feed/feed.module.css';
import { withRouter } from 'react-router';

class Feed extends React.Component {

    render() {
        return (
            <div className={styles['feedBodyContainer']}>
                <NavbarContainer />

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
