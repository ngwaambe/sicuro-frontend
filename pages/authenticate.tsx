import React, {useState} from "react";
import {Trans, useTranslation} from "next-i18next";
import LoginLayout from "../components/layouts/LoginLayout";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import ResetPasswordForm from "../components/ResetPasswordForm"
import {NextPageContext} from "next";
import Cookies from "universal-cookie";
import NavService from "../service/NavService";
import {checkToken} from "../service/authentication";
import {useRouter} from "next/router";
import {NextRouter} from "next/dist/next-server/lib/router/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {activateAccount} from "../service/createAccount";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "../components/Modal";
import {FormControl, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {ActionButton, StyledFormTypography, StyledTextField} from "../components/CustomMaterialUI";
import CommonStyles from "../components/common.module.css";
import styles from "../components/ResetPasswordForm.module.css";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";

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


const ActivationModal = (props:ActivationProps) => {
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
          {props.status === ActivationStatus.SUCCESS && <StyledFormTypography>{t('reset_password_text')}</StyledFormTypography>}
          {props.status === ActivationStatus.FAILED && <StyledFormTypography><Trans>{t('reset_password_success_text')}</Trans></StyledFormTypography>}
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
  const [state, setState] = useState<LocalState>({
    action: Action.LOGIN,
    activationStatus: props.activationStatus
  });

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

  const styleName = state.action  === Action.REGISTRATION ? "s-inner-space-registration": "s-inner-space-login";
  return (
    <React.Fragment>
      <div className="s-space-login">
        <div>
          <div className={styleName}>
            { (state.activationStatus !== undefined && state.activationStatus != ActivationStatus.EXPIRED) &&
              <ActivationModal onClose={doLogin} status={state.activationStatus}/>
            }
            {state.action ===  Action.RESET_PASSWORD && <ResetPasswordForm onClose={doLogin} /> }
            {(state.action === Action.LOGIN || state.action === Action.RESET_PASSWORD)  && <LoginForm resetPassword={resetPassword}/>}
            {(state.action === Action.REGISTRATION || state.action === Action.LOGIN || state.action === Action.RESET_PASSWORD) &&
            <RegistrationForm
                onClose={() => doLogin()}
                register={() => doRegistration()}/>
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

  /*LoginPage.getInitialProps =  async (ctx: NextPageContext ) => {
  const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null);
  const token = cookies.get('token')
  const navService = new NavService();
  if (token !== '' && token !== undefined) {
    const success =  await checkToken(token)
    if (success) {
     navService.redirectUser("/profile", ctx);
    }
  }
  return {namespacesRequired: ['login','common']}
} */


export const  getServerSideProps = async(ctx) => {
  const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null);
  const token = cookies.get('token')
  if (token !== '' && token !== undefined) {
    const success =  await checkToken(token)
    if (success) {
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
    console.log(result.success)
    return {
      props: {
        ...await serverSideTranslations(ctx.locale, ["login", "common"]),
        activationStatus: (result.success) ? ActivationStatus.SUCCESS : ActivationStatus.FAILED
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
