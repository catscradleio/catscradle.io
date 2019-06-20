import React from 'react';
import { withRouter } from 'react-router-dom';
import SignupFormContainer from '../session/signup-form-container';
import LoginFormContainer from '../session/login-form-container';
import styles from './session.module.css';

class SessionModal extends React.Component {
    constructor(props) {
        super(props);
        this.switchModal = this.switchModal.bind(this);
        this.state = {
            formType: this.props.formType
        };

    }

    switchModal() {
        (this.state.formType === 'login') ?
            this.setState({ modal: 'signup' }) : this.setState({ modal: 'login' })
    }



    getSignUpModal() {

        return (
            <div className={styles['sessionModal']}>
                <div className={styles['sessionSpacer']}>
                    <img className={styles['sessionImage']} 
                         alt='signup modal'
                         src="https://2.bp.blogspot.com/-pHg-o9baXXg/XNr6R0UVYzI/AAAAAAAABVI/u8KThDDvp-chKM7clVdBkH8c5JjVB9WDQCLcBGAs/s320/placeholder-02.png" />
                </div>

                <div className={styles['sessionFormContainer']}>

                    <div className={styles['sessionModalOptions']}>
                        <span>Sign in or </span>
                        <span onClick={() => this.switchModal()}
                            className={styles['changeSignup']}>Sign up</span>
                    </div>
                    <div className={styles['sessionModalContents']}><LoginFormContainer /></div>
                </div>

            </div>
        );
    }

    getLoginModal() {
        return (
            <div className={styles['sessionModal']}>

                <div className={styles['sessionFormContainerOverride']}>
                    <div className={styles['sessionModalOptions']}>
                        <span>Sign up or </span>
                        <span onClick={() => this.switchModal()}
                            className={styles['changeSignin']}>Sign in</span>
                    </div>
                    <div className={styles['sessionModalContents']}><SignupFormContainer /></div>
                </div>



                <div className={styles['sessionSpacerOverride']}>
                    <img className={styles['sessionImage']} 
                         alt='signin modal'    
                         src="https://2.bp.blogspot.com/-pHg-o9baXXg/XNr6R0UVYzI/AAAAAAAABVI/u8KThDDvp-chKM7clVdBkH8c5JjVB9WDQCLcBGAs/s320/placeholder-02.png" />
                </div>

            </div>
        );
    }



    getModal(){
        if (this.props.modal) {
            return (
                (this.props.formType !== 'login') ? 
                    <>
                    <div className={styles['modalContent']}>
                        <div id='modal' className={styles['modal']}>
                            {this.getLoginModal()}</div>
                    </div>

                    <div id='sessionModalContainer'
                        onClick={() => this.hideModal()}
                        className={styles['sessionModalContainer1']}>
                    </div> 
                    </>
                    : 
                    <>
                    <div className={styles['modalContent']}>
                        <div id='modal' className={styles['modal']}>
                            {this.getSignUpModal()}</div>
                    </div>

                    <div id='sessionModalContainer'
                        onClick={() => this.hideModal()}
                        className={styles['sessionModalContainer2']}>
                    </div>
                    </>
                )
            }
    }


hideModal(){
    let modalContainer = document.getElementById('sessionModalContainer')
    let modal = document.getElementById("modal")
    modalContainer.style.display = 'none'
    modal.style.display = 'none'
}

render() {

    return (
        <div >
            <div className={styles['modalContentSpacer']}> {this.getModal()}</div>
        </div>
    );
} 
}


export default withRouter(SessionModal);
