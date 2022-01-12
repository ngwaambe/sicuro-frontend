import React, {useEffect, useState} from "react";
import {Trans, useTranslation} from "next-i18next";
import LoginLayout from "../components/layouts/LoginLayout";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import ResetPasswordForm from "../components/ResetPasswordForm"
import Cookies from "universal-cookie";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {activateAccount} from "../service/createAccount";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "../components/Modal";
import {FormControl, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {ActionButton, StyledFormTypography, StyledTextField} from "../components/CustomMaterialUI";
import CommonStyles from "../components/common.module.css";
import styles from "../components/ResetPasswordForm.module.css";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import {updateUser, useDispatch} from "../service/Auth.context";
import {authServiceCheckToken, clearToken} from "../service/authentication";

enum Action {
  LOGIN,
  REGISTRATION,
  RESET_PASSWORD,
  ACCOUNT_ACTIVATION
}

enum ActivationStatus{
  SUCCESS,
  EXPIRED,
  FAILED
}


interface ActivationProps{
  onClose: () => void,
  status: ActivationStatus
}

interface LocalState {
  action: Action;
  activationStatus: ActivationStatus;
}

const ResetPasswordModal = (props:ActivationProps) => {
  const {t} = useTranslation(["login", "common"])
  return (
    <>
      <Modal onEsc={props.onClose} onBackgroundClick={props.onClose}>
        <ModalHeader>
          <h3>{t('reset_password_label')}</h3>
          <IconButton
            onClick={props.onClose}
            data-testid="modal-close" >
            <CloseIcon  />
          </IconButton>
        </ModalHeader>
        <ModalBody>
          {props.status === ActivationStatus.SUCCESS &&
            <StyledFormTypography>{t('reset_password_text')}</StyledFormTypography>
          }
          {props.status === ActivationStatus.FAILED &&
          <StyledFormTypography><Trans>{t('reset_password_success_text')}</Trans></StyledFormTypography>
          }
                  </ModalBody>
        <ModalFooter divider={true} confirm={true}>
          <ActionButton
              variant="contained"
              color="primary"
              disableElevation={true}
              size="large"
              onClick={props.onClose}>
            {t('common:close_label')}
          </ActionButton>
        </ModalFooter>
      </Modal>
    </>
  )
}

const LoginPage = (props) => {
  const[_,dispatch] = useDispatch();

  const [state, setState] = useState<LocalState>({
    action: Action.LOGIN,
    activationStatus: props.activationStatus
  });

  useEffect( () => {
    clearToken();
    dispatch(updateUser({loggedIn: false, customerId:undefined}));
  }, []);


  const doRegistration = () => {
    setState({
      ...state,
      action: Action.REGISTRATION
    });
  };

  const doLogin = () => {
    setState({
      ...state,
      action: Action.LOGIN,
      activationStatus: undefined
    });
  };

  const resetPassword = () => {
    setState({
      ...state,
      action: Action.RESET_PASSWORD,
      activationStatus: undefined
    });
  }

  return (
    <React.Fragment>
      <div className="s-space-login">
        <div>
          <div className="s-inner-space-registration">
            { (state.activationStatus !== undefined && state.activationStatus != ActivationStatus.EXPIRED) &&
              <ResetPasswordModal onClose={doLogin} status={state.activationStatus}/>
            }
            {state.action ===  Action.RESET_PASSWORD && <ResetPasswordForm onClose={doLogin} /> }
            {(state.action === Action.LOGIN || state.action === Action.RESET_PASSWORD)  && <LoginForm resetPassword={resetPassword}/>}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const  getServerSideProps = async(ctx) => {
  const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null);
  const token = cookies.get('token')
  if (token !== '' && token !== undefined) {
    const result =  await authServiceCheckToken(token)
    if (result.active && !result.orphanedToken) {
      return {
        redirect: {
          permanent: false,
          destination: "/profile"
        }
      }
    }
  }

  const  code = ctx.query.code
  if (code !== undefined) {
    const result = await activateAccount(code as string)
    return {
      props: {
        ...await serverSideTranslations(ctx.locale, ["login", "common"]),
        activationStatus: (result.success) ? ActivationStatus.SUCCESS : ActivationStatus.FAILED,
      }
    }
  }
  return {
    props: {
      ...await serverSideTranslations(ctx.locale, ["login", "common"])
    }
  }
}

LoginPage.layout = LoginLayout

export default  LoginPage
