import React, {useState} from "react";
import {FormControl, IconButton} from "@material-ui/core";
import CommonStyles from "./common.module.css";
import styles from "./ResetPasswordForm.module.css";
import {StyledFormTypography, StyledTextField, ActionButton} from "./CustomMaterialUI";
import {useTranslation, Trans} from "next-i18next";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "./Modal";
import {validateEmail} from "../service/UtilService";
import CloseIcon from '@material-ui/icons/Close';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';
import {resetPassword} from "../service/authentication";

interface Props {
  onClose: () => void;
}

enum Step {
  INIT,
  SUCCESS,
  FAILED
}

interface LocalState {
  email:string;
  isEmailError: boolean;
  emailErrorText:string;
  step: Step;

}
const ResetPasswordForm:React.FC<Props>=(props) => {
  const {t} = useTranslation(['login','common']);
  const [state, setState] = useState<LocalState>({
    email: '',
    isEmailError: false,
    emailErrorText: t('email_missing'),
    step: Step.INIT
  })

  const onChange = (propAttr: string, propErrorAttr: string) => (event) => {
    setState({
      ...state,
      [propAttr]: event.target.value,
      [propErrorAttr]: (event.target.value !== '') ? false : state[propErrorAttr],
    })
  }

  const requestResetPasswordLink = () => {
    if (state.email === '') {
      setState({
        ...state,
        isEmailError: true
      });
      return;
    } else if (!validateEmail(state.email)) {
      setState({
        ...state,
        isEmailError: true,
        emailErrorText: t('invalid_email_text'),
        step: Step.INIT
      });
    } else {
      resetPassword(state.email).then(res => {
        if (res.success){
          setState({
            ...state,
            step: Step.SUCCESS
          })
        } else {
          setState({
            ...state,
            step: Step.FAILED
          })
        }
      })
    }
  }

  return (
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
        {state.step === Step.INIT &&
        <>
            <StyledFormTypography>{t('reset_password_text')}</StyledFormTypography>
            <FormControl className={CommonStyles.formControl}>
                <StyledTextField
                    id="reset_password_id"
                    label={t('email_label')}
                    autoFocus={false}
                    helperText={state.isEmailError && state.emailErrorText}
                    type="text"
                    fullWidth={true}
                    error={state.isEmailError}
                    value={state.email} onChange={onChange("email", "isEmailError")}/>
            </FormControl>
        </>
        }
        {state.step === Step.SUCCESS &&
          <StyledFormTypography>
              <Trans>{t('reset_password_success_text')}</Trans>
          </StyledFormTypography>
        }
        {state.step === Step.FAILED &&
        <div className={styles.errorBody}>
            <ErrorTwoToneIcon style={{ fontSize: '4.5rem'}}/>
            <StyledFormTypography>
                <Trans>{t('reset_password_failure_text')}</Trans>
            </StyledFormTypography>
        </div>
        }
      </ModalBody>
      <ModalFooter divider={true} confirm={true}>
        {(state.step === Step.SUCCESS || state.step === Step.FAILED) &&
        <ActionButton
          variant="contained"
          color="primary"
          disableElevation={true}
          size="large"
          onClick={props.onClose}>
          {t('common:close_label')}
        </ActionButton>
        }
        {state.step === Step.INIT &&
        <ActionButton
          variant="contained"
          color="primary"
          disableElevation={true}
          size="large"
          onClick={requestResetPasswordLink}>
          {t('request_link')}
        </ActionButton>
        }
      </ModalFooter>
    </Modal>
  )
}

export default ResetPasswordForm;
