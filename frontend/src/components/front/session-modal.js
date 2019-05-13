import React from 'react';
import { withRouter } from 'react-router-dom';
import SignupFormContainer from '../session/signup-form-container';
import LoginFormContainer from '../session/login-form-container';
import styles from './session.module.css';

class SessionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            formType: 'login'
        };

    }

    getModal() {
        if (this.state.formtype === 'login') {
            return (
                <div className={styles['sessionModal']}>
                    <LoginFormContainer />
                </div>
            );
        } else {
            return (
                <div className={styles['sessionModal']}>
                    <SignupFormContainer />
                </div>
            );
        }
    }


    render() {
        return (
            <div className={styles['sessionModalContainer']}> {this.getModal()}}</div>
        );
    }
}

export default withRouter(SessionModal);
