import React, {useState} from "react";
import Styles from './RegistrationForm.module.css';
import CommonStyles from './common.module.css'
import {
  Card,
  CardContent,
  MenuItem,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  CircularProgress, Link as MuiLink, Divider, InputLabel, Select,
} from '@material-ui/core';
import {
  StyledCardActions,
  StyledFormTypography,
  StyledTextField,
  StyledSelect,
  ActionButton,
  StyledFormControls, StyledSelectLabel
} from "./CustomMaterialUI";
import {Title, SignupRequest, Language} from "../state";
import {createAccount} from "../service/createAccount";
import {useTranslation, Trans} from "next-i18next";
import styles from "./ResetPasswordForm.module.css";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import {getEnumKey, isValidEmail} from "../service/UtilService";
import {useRouter} from "next/router";
import Link  from "next/link";

export enum RegistrationStep {
  register,
  done,
  failed
}

interface Props {
  onClose: () => void;
  register: () => void;
}

interface RegistrationInfo {
  isOrganistion: boolean,
  organisationName?: string,
  organisationNameError: boolean
  taxNumber?: string,
  taxNumberError: boolean,
  title: Title,
  titleError: boolean,
  firstName: string,
  firstNameError: boolean,
  lastName: string,
  lastNameError: boolean,
  email: string,
  emailError: boolean,
  emailErrorText: string,
  password: string,
  passwordError: boolean,
  passwordErrorText: string
  confirmPassword: string,
  confirmPasswordError: boolean,
  confirmPasswordErrorText: string,
  language: Language,
  languageError: boolean
}

function LinkText({ href, children }) {
  return <MuiLink href={href || ''}  target="_blank" rel="noopener">{children}</MuiLink>;
}

const RegistrationForm: React.FC<Props> = (props) => {
  const {t} = useTranslation(['login', 'common'])
  const [state, setState] = useState<RegistrationInfo>({
    isOrganistion: false,
    organisationName: '',
    organisationNameError: false,
    taxNumber: '',
    taxNumberError: false,
    title: Title.SELECT,
    titleError: false,
    firstName: '',
    firstNameError: false,
    lastName: '',
    lastNameError: false,
    email: '',
    emailError: false,
    emailErrorText: t('email_missing'),
    password: '',
    passwordError: false,
    passwordErrorText: '',
    confirmPassword: '',
    confirmPasswordError: false,
    confirmPasswordErrorText:'',
    language: Language.SELECT,
    languageError: false
  })
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<RegistrationStep>(RegistrationStep.register)
  const router = useRouter()
  const checkBoxOnChnage = (event) => {
    setState({
      ...state,
      isOrganistion: event.target.checked
    });
  };

  const onChange = (propAttr: string, propErrorAttr: string) => (event) => {
    setState({
      ...state,
      [propAttr]: event.target.value,
      [propErrorAttr]: (event.target.value !== '') ? false : state[propErrorAttr],
    })
  }

  const resetRegistrationform = () => {
    setState({
      ...state,
      isOrganistion: false,
      organisationName: '',
      organisationNameError: false,
      taxNumber: '',
      taxNumberError: false,
      title: Title.SELECT,
      titleError: false,
      firstName: '',
      firstNameError: false,
      lastName: '',
      lastNameError: false,
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
      confirmPassword: '',
      confirmPasswordError: false,
      language: Language.SELECT,
      languageError: false
    })
  }

  const cancelRegistration = (): void => {
     router.push('/authenticate')
  }

  const toSignupRequest = (): SignupRequest => ({
    organisation: (state.isOrganistion) ? {
      name: state.organisationName,
      taxNumber: state.taxNumber
    } : null,
    contact: {
      title: getEnumKey(Title, state.title),
      firstname: state.firstName,
      lastname: state.lastName,
      email: state.email,
      password: state.password,
      language: getEnumKey(Language, state.language)
    }
  });

  const evaluatePasswordError = ():string => {
    if (state.password === ''){
      return'password_missing';
    } else if (state.password.length < 8){
      return 'password_min_length';
    }
    return '';
  }

  const evaluateConfirmPasswordError = ():string => {
    if (state.password!=='' && state.password !== state.confirmPassword) {
      return 'confirm_password_equal_password';
    }
   return ''
  }

  const evaluateEmailErrorText = (): string => {
    if (state.email === '') {
       return t('email_missing')
    } else if (!isValidEmail(state.email)) {
       return t('invalid_email_text')
    } else
      return ''
  }

  const save = () => {
    if (state.title === Title.SELECT ||
      state.firstName === '' ||
      state.lastName === '' ||
      state.email === '' ||
      !isValidEmail(state.email) ||
      state.password === '' ||
      state.password !== state.confirmPassword ||
      state.language === Language.SELECT ||
      (state.isOrganistion && (state.organisationName === '' || state.taxNumber === ''))) {
      setState({
        ...state,
        emailError: ((state.email === '') || !isValidEmail(state.email)),
        emailErrorText: evaluateEmailErrorText(),
        passwordError: (state.password === '')  || (state.password.length < 8 ),
        passwordErrorText: evaluatePasswordError(),
        confirmPasswordError: (state.password !== '') && (state.password !== state.confirmPassword),
        confirmPasswordErrorText: evaluateConfirmPasswordError(),
        titleError: (state.title === Title.SELECT),
        firstNameError: (state.firstName === ''),
        lastNameError: (state.lastName === ''),
        organisationNameError: (state.isOrganistion && state.organisationName === ''),
        taxNumberError: (state.isOrganistion && state.taxNumber === ''),
        languageError: (state.language === Language.SELECT),
        password: '',
        confirmPassword: ''
      });

      return;
    }

    setOpen(true);
    createAccount(toSignupRequest()).then(
      (res) => {
        console.log(JSON.stringify(res))
        if (res.success) {
          setStep(RegistrationStep.done);
          setOpen(false);
        } else {
          if (res.data.status == 409) {
            setState({
              ...state,
              emailError: true,
              emailErrorText: t('email_not_unique'),
              password: '',
              confirmPassword: ''
            });
          } else {
            setOpen(false);
            setStep(RegistrationStep.failed);
          }
        }
      }
    ).catch(error => {
      setOpen(false)
      setStep(RegistrationStep.failed)
    }).finally(() => {
      setOpen(false)
    });
  }

  return (
    <React.Fragment>
      <form>
        {step === RegistrationStep.register &&
        <Card className={CommonStyles.cardFormMiduim}>
            <CardContent className={CommonStyles.cardFormContent}>
                <h3 className={Styles.registerHeader}>{t('signup_header')}</h3>
                <StyledFormTypography variant="body2" color="textSecondary">
                  {t('signup_text')}
                </StyledFormTypography>
                <FormControl className={CommonStyles.formControl}>
                    <FormControlLabel
                        control={<Checkbox checked={state.isOrganistion} onChange={checkBoxOnChnage}/>}
                        label={t('common:chooseAccountType')}/>
                  {state.isOrganistion &&
                  <>
                      <StyledTextField
                          id="organisation_id"
                          label={t('organisation_name_label')}
                          autoFocus={true}
                          helperText={state.organisationNameError && t('organisation_name_missing')}
                          type="text"
                          fullWidth={true}
                          disabled={open}
                          error={state.organisationNameError}
                          value={state.organisationName}
                          onChange={onChange("organisationName", "organisationNameError")}/>

                      <StyledTextField
                          id="taxnumber_id"
                          label={t('taxnumber_label')}
                          autoFocus={true}
                          helperText={state.taxNumberError && t('taxnumber_missing')}
                          type="text"
                          fullWidth={true}
                          disabled={open}
                          error={state.taxNumberError}
                          value={state.taxNumber} onChange={onChange("taxNumber", "taxNumberError")}/>
                  </>
                  }

                    <StyledFormControls error={state.titleError}>
                        <StyledSelectLabel>{t('common:title')}</StyledSelectLabel>
                        <StyledSelect
                            MenuProps={{disableScrollLock: true}}
                            labelId="title-label"
                            id="title-label-id"
                            value={state.title}
                            disabled={open}
                            disableUnderline
                            onChange={onChange("title", "titleError")}>
                          {Object.values(Title).map(
                            (item) => (
                              <MenuItem value={item} key={item.valueOf()}>{t('common:' + item.valueOf())}</MenuItem>)
                          )}
                        </StyledSelect>
                      {state.titleError && <FormHelperText>{t('common:title-required')}</FormHelperText>}
                    </StyledFormControls>

                    <StyledTextField
                        id="filled-basic"
                        label={t('firstname_label')}
                        autoFocus={true}
                        helperText={state.firstNameError && t('firstname_missing')}
                        type="text"
                        required={true}
                        fullWidth={true}
                        disabled={open}
                        error={state.firstNameError}
                        value={state.firstName} onChange={onChange("firstName", "firstNameError")}/>

                    <StyledTextField
                        id="filled-basic"
                        label={t('lastname_label')}
                        autoFocus={true}
                        helperText={state.lastNameError && t('lastname_missing')}
                        type="text"
                        fullWidth={true}
                        disabled={open}
                        error={state.lastNameError}
                        value={state.lastName} onChange={onChange("lastName", "lastNameError")}/>

                    <StyledFormControls error={state.titleError}>
                        <StyledSelectLabel>{t('common:chooseLanguage')}</StyledSelectLabel>
                        <StyledSelect
                            MenuProps={{disableScrollLock: true}}
                            labelId="language-label"
                            id="language-label-id"
                            variant="standard"
                            value={state.language}
                            error={state.languageError}
                            disabled={open}
                            disableUnderline
                            onChange={onChange("language", "languageError")}>
                          {Object.values(Language).map(
                            lang => (
                              <MenuItem value={lang} key={lang.valueOf()}>{t('common:' + lang.valueOf())}</MenuItem>)
                          )}
                        </StyledSelect>
                      {state.languageError && <FormHelperText>{t('common:language_required')}</FormHelperText>}
                    </StyledFormControls>

                    <StyledTextField
                        id="filled-basic"
                        label={t('email_label')}
                        autoFocus={true}
                        helperText={state.emailError && state.emailErrorText}
                        type="text"
                        fullWidth={true}
                        disabled={open}
                        error={state.emailError}
                        value={state.email} onChange={onChange("email", "emailError")}/>

                    <StyledTextField
                        id="filled-basic"
                        label={t('password_label')}
                        autoFocus={true}
                        helperText={state.passwordError && t(state.passwordErrorText)}
                        type="password"
                        fullWidth={true}
                        error={state.passwordError}
                        value={state.password} onChange={onChange("password", "passwordError")}/>
                    <StyledTextField
                        id="filled-basic"
                        label={t('confirm_password_label')}
                        autoFocus={true}
                        helperText={state.confirmPasswordError && t(state.confirmPasswordErrorText)}
                        type="password"
                        fullWidth={true}
                        error={state.confirmPasswordError}
                        value={state.confirmPassword} onChange={onChange("confirmPassword", "confirmPasswordError")}/>
                </FormControl>

                <StyledFormTypography variant="body2" color="textSecondary" className={Styles.terms_conditions}>
                    <Trans i18nKey="term_and_conditions" t={t} components={[<LinkText href="/legal/terms"/>]}/>
                </StyledFormTypography>
            </CardContent>

            <StyledCardActions>
                <ActionButton
                    variant="contained"
                    size="large"
                    className={Styles.inputField}
                    disableElevation={true}
                    color="primary"
                    disabled={open}
                    type="submit"
                    onClick={save}>
                  {open && <CircularProgress color="primary" size={20} thickness={4}/>}
                  {t('signup_button')}
                </ActionButton>
            </StyledCardActions>
            <Divider className={Styles.divider}/>
                <h3 className={Styles.registerHeader}>Already a sicuro customer?</h3>

            <StyledCardActions>
                <ActionButton
                    variant="outlined"
                    size="large"
                    fullWidth={true}
                    className={Styles.inputField}
                    disableElevation={true}
                    onClick={cancelRegistration}>
                  {t('login_button')}
                </ActionButton>
            </StyledCardActions>
        </Card>
        }

        {step === RegistrationStep.done &&
        <Card className={CommonStyles.cardFormMiduim}>
            <CardContent className={CommonStyles.cardFormContent}>
                <h1 className="cardTitle">{t('signup_success_title')}</h1>
                <StyledFormTypography variant="body2" color="textSecondary">
                    <Trans>{t('signup_success_text')}</Trans>
                </StyledFormTypography>
            </CardContent>
            <StyledCardActions>
                <ActionButton
                    variant="contained"
                    size="large"
                    className={Styles.inputField}
                    disableElevation={true}
                    color="primary"
                    onClick={cancelRegistration}>{t('common:close_label')}</ActionButton>
            </StyledCardActions>
        </Card>
        }

        {step === RegistrationStep.failed &&
        <Card className={CommonStyles.cardFormMiduim}>
            <CardContent className={CommonStyles.cardFormContent}>
                <h3>You have successfully created your sicuro account</h3>
                <div className={styles.errorBody}>
                    <ErrorTwoToneIcon style={{fontSize: '4.5rem'}}/>
                    <StyledFormTypography>
                        <Trans>{t('reset_password_failure_text')}</Trans>
                    </StyledFormTypography>
                </div>
            </CardContent>
            <StyledCardActions>
                <ActionButton
                    variant="contained"
                    size="large"
                    className={Styles.inputField}
                    disableElevation={true}
                    onClick={cancelRegistration}>{t('common:close_label')}</ActionButton>
            </StyledCardActions>
        </Card>
        }
      </form>
    </React.Fragment>
  )
}

export default RegistrationForm;
