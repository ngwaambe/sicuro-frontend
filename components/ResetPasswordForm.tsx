import React, {useState} from "react";
import {CircularProgress, FormControl, IconButton} from "@material-ui/core";
import CommonStyles from "./common.module.css";
import styles from "./ResetPasswordForm.module.css";
import {StyledFormTypography, StyledTextField, ActionButton} from "./CustomMaterialUI";
import {useTranslation, Trans} from "next-i18next";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "./Modal";
import {isValidEmail} from "../service/UtilService";
import CloseIcon from '@material-ui/icons/Close';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import {initPasswordReset} from "../service/authentication";

interface Props {
  onClose: () => void;
}

enum Step {
  INIT,
  SUCCESS,
  FAILED,
  ERROR
}

interface State {
  email: string;
  isEmailError: boolean;
  emailErrorText: string;
  loading: boolean,
  step: Step;

}

const ResetPasswordForm: React.FC<Props> = (props) => {
  const {t} = useTranslation(['login', 'common']);
  const [state, setState] = useState<State>({
    email: '',
    isEmailError: false,
    emailErrorText: t('email_missing'),
    loading: false,
    step: Step.INIT
  })

  const onChange = (propAttr: string, propErrorAttr: string) => (event) => {
    setState({
      ...state,
      [propAttr]: event.target.value,
      [propErrorAttr]: (event.target.value !== '') ? false : state[propErrorAttr],
    })
  }

  const requestResetPasswordLink = async () => {
    if (state.email === '') {
      setState({
        ...state,
        isEmailError: true
      });
      return;
    } else if (!isValidEmail(state.email)) {
      setState({
        ...state,
        isEmailError: true,
        emailErrorText: t('invalid_email_text'),
        step: Step.INIT
      });
    } else {
      setState({...state, loading: true})
      try {
        const response = await initPasswordReset(state.email)
        if (response.success) {
          setState({
            ...state,
            step: Step.SUCCESS,
            loading: false
          })
        } else {
          setState({
            ...state,
            step: Step.FAILED
          })
        }
      } catch (error) {
        setState({
          ...state,
          step: Step.ERROR
        })
      }

    }
  }

  return (
    <Modal onEsc={props.onClose}>
      <ModalHeader>
        <h3>{t('reset_password_label')}</h3>
        <IconButton
          onClick={props.onClose}
          data-testid="modal-close">
          <CloseIcon/>
        </IconButton>
      </ModalHeader>
      <ModalBody>
        {state.step === Step.INIT &&
            <>
                <div className={styles.errorBody}>
                    <QuestionAnswerTwoToneIcon style={{fontSize: 60}} color="action"/>
                    <StyledFormTypography>{t('reset_password_text')}</StyledFormTypography>
                </div>
                <FormControl className={CommonStyles.formControl}>
                    <StyledTextField
                        id="reset_password_id"
                        label={t('email_label')}
                        autoFocus={false}
                        disabled={state.loading}
                        helperText={state.isEmailError && state.emailErrorText}
                        type="text"
                        fullWidth={true}
                        error={state.isEmailError}
                        value={state.email} onChange={onChange("email", "isEmailError")}/>
                </FormControl>
            </>
        }
        {state.step === Step.SUCCESS &&
            <div className={styles.errorBody}>
                <CheckCircleTwoToneIcon style={{fontSize: 60}} color="secondary"/>
                <StyledFormTypography>
                    <Trans>{t('reset_password_success_text')}</Trans>
                </StyledFormTypography>
            </div>
        }
        {state.step === Step.FAILED &&
            <div className={styles.errorBody}>
                <ErrorTwoToneIcon style={{fontSize: 60}} color="error"/>
                <StyledFormTypography>
                    <Trans>{t('reset_password_failure_text')}</Trans>
                </StyledFormTypography>
            </div>
        }

        {state.step === Step.ERROR &&
            <div className={styles.errorBody}>
                <ErrorTwoToneIcon style={{fontSize: 60}} color="error"/>
                <StyledFormTypography>
                    <Trans>{t('common:errorText')}</Trans>
                </StyledFormTypography>
            </div>
        }
      </ModalBody>
      <ModalFooter divider={true} confirm={true}>
        {(state.step === Step.SUCCESS || state.step === Step.FAILED || state.step === Step.ERROR) &&
            <ActionButton
                variant="contained"
                color="primary"
                disableElevation={true}
                type="submit"
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
              {state.loading && <CircularProgress color="primary" size={30} thickness={4}/>}
              {!state.loading && t('request_link')}
            </ActionButton>
        }
      </ModalFooter>
    </Modal>
  )
}

export default ResetPasswordForm;
