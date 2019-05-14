import React from 'react';
import { withRouter } from 'react-router-dom';
import SignupFormContainer from '../session/signup-form-container';
import LoginFormContainer from '../session/login-form-container';
import styles from './session.module.css';

class SessionModal extends React.Component {
    constructor(props) {
        super(props);
        this.switchModal = this.switchModal.bind(this);
    }

    switchModal() {
        (this.state.modal == true) ?
            this.setState({ modal: false }) : this.setState({ modal: true })
    }



    pickModal() {

        if (this.props.formType == 'login') {
            return (
                <div className={styles['sessionModal']}>
                <div className={styles['sessionSpacer']}></div>
                <div>
                    <div className={styles['sessionModalOptions']}>
                        <span>Signin or </span>
                        <span onClick={() => this.switchModal()}
                              className={styles['changeSignup']}>Signup</span>
                    </div>
                    <div className={styles['sessionModalContents']}><LoginFormContainer /></div>
                </div>
                </div>
            );
        } else {
            return (
                <div className={styles['sessionModal']}>
                    <div className={styles['sessionModalOptions']}>
                        <span>Signup or </span> 
                        <span onClick={() => this.switchModal()}
                              className={styles['changeSignin']}>Signin</span>
                    </div>
                    <div className={styles['sessionModalContents']}><SignupFormContainer /></div>
                </div>
            );
        }
        
    }

    getModal(){
        if (this.props.modal){
            return(
            <div id='sessionModalContainer' className={styles['sessionModalContainer']}>
            {this.pickModal()}
        </div>
            )
        } else {
            return (<></>)
        }
    }

  

    hideModal(){
        let modal = document.getElementById('sessionModalContainer')
        modal.style.display = 'none'
    }

    render() {

            return (
                <>
                <div onClick={() => this.hideModal()}
                className={styles['modalCover']}>
                </div>
                {this.getModal()}
                </>
            );
        } 
}


export default withRouter(SessionModal);
