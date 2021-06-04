import React, {useState} from "react";
import Styles from './RegistrationForm.module.css';
import CommonStyles from './common.module.css'
import {
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  ThemeProvider,
  CircularProgress,
  Backdrop, Button
} from '@material-ui/core';
import {
  StyledCardActions,
  StyledFormTypography,
  StyledTextField,
  ActionButton,
  StyledFormControls
} from "./CustomMaterialUI";
import {Title, SignupRequest, Language} from "../state";
import {createAccount} from "../service/createAccount";
import {useTranslation, Trans} from "next-i18next";
import styles from "./ResetPasswordForm.module.css";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import {getEnumKey, validateEmail, sleep} from "../service/UtilService";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    position: "absolute",
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const paddingStyles = {
  paddingLeft:"4px;"
}

export enum RegistrationStep {
  signup,
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
  language: Language,
  languageError: boolean
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
    language: Language.SELECT,
    languageError: false
  })
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<RegistrationStep>(RegistrationStep.signup)
  const classes = useStyles();

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

  const register = (): void => {
    setStep(RegistrationStep.register)
    props.register()
  };

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
      language: Language.SELECT,
      languageError: false
    })
  }

  const cancelRegistration = (): void => {
    resetRegistrationform();
    setStep(RegistrationStep.signup);
    props.onClose()
  }

  const toSignupRequest = (): SignupRequest => ({
    organisation: (state.isOrganistion) ?
      {
        name: state.organisationName,
        taxnumber: state.taxNumber
      } : null,
    contact: {
      title: getEnumKey(Title, state.title),
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
      preferredLanguage: getEnumKey(Language, state.language)
    }
  });

  const save = () => {
    if (state.title === Title.SELECT ||
      state.firstName === '' ||
      state.lastName === '' ||
      state.email === '' ||
      !validateEmail(state.email) ||
      state.password === '' ||
      state.language === Language.SELECT ||
      (state.isOrganistion && (state.organisationName === '' || state.taxNumber === ''))) {
      setState({
        ...state,
        titleError: (state.title === Title.SELECT),
        firstNameError: (state.firstName === ''),
        lastNameError: (state.lastName === ''),
        emailError: ((state.email === '') || !validateEmail(state.email)),
        emailErrorText: (state.email === '') ? t('email_missing') : t('invalid_email_text'),
        passwordError: (state.password === ''),
        organisationNameError: (state.isOrganistion && state.organisationName === ''),
        taxNumberError: (state.isOrganistion && state.taxNumber === ''),
        languageError: (state.language === Language.SELECT)
      });
      return;
    }

    setOpen(true);
    createAccount(toSignupRequest()).then(
      (res) => {
        console.log(JSON.stringify(res))
        if (res.success) {
          setStep(RegistrationStep.done)
          resetRegistrationform()
          setOpen(false)
        } else {
          setOpen(false)
          setStep(RegistrationStep.failed)
          resetRegistrationform()
        }
      }
    ).catch(error => {
      setOpen(false)
      setStep(RegistrationStep.failed)
      resetRegistrationform()
    });
  }

  return (
    <React.Fragment>
      <form>

        {/*<div>
          <Backdrop open={open} className={classes.backdrop}>
            <CircularProgress color="inherit"  size={200} thickness={10}/>
          </Backdrop>
        </div>*/}

        {step === RegistrationStep.signup &&
        <Card className={CommonStyles.cardForm}>
            <CardContent className={CommonStyles.cardFormContent}>
                <h2>{t('signup_header')}</h2>
                <StyledFormTypography variant="body2" color="textSecondary">
                  {t('signup_text')}
                </StyledFormTypography>
            </CardContent>
            <StyledCardActions>
                <ActionButton
                    variant="contained"
                    size="large"
                    className={Styles.inputField}
                    disableElevation={true}
                    onClick={register}>{t('signup_button')}</ActionButton>
            </StyledCardActions>
        </Card>
        }

        {step === RegistrationStep.register &&
        <Card className={CommonStyles.cardFormMiduim}>
            <CardContent className={CommonStyles.cardFormContent}>
                <h2>{t('signup_header')}</h2>
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
                          error={state.taxNumberError}
                          value={state.taxNumber} onChange={onChange("taxNumber", "taxNumberError")}/>
                  </>
                  }

                    <StyledFormControls error={state.titleError}>
                        <InputLabel>{t('common:title')}</InputLabel>
                        <Select
                            MenuProps={{ disableScrollLock: true }}
                            labelId="title-label"
                            id="title-label-id"
                            value={state.title}
                            error={state.titleError}
                            onChange={onChange("title", "titleError")}>
                          {Object.values(Title).map(
                            (item) => (
                              <MenuItem value={item} key={item.valueOf()}>{t('common:' + item.valueOf())}</MenuItem>)
                          )}
                        </Select>
                      {state.titleError && <FormHelperText>Error</FormHelperText>}
                    </StyledFormControls>

                    <StyledTextField
                        id="filled-basic"
                        label={t('firstname_label')}
                        autoFocus={true}
                        helperText={state.firstNameError && t('firstname_missing')}
                        type="text"
                        fullWidth={true}
                        error={state.firstNameError}
                        value={state.firstName} onChange={onChange("firstName", "firstNameError")}/>

                    <StyledTextField
                        id="filled-basic"
                        label={t('lastname_label')}
                        autoFocus={true}
                        helperText={state.lastNameError && t('lastname_missing')}
                        type="text"
                        fullWidth={true}
                        error={state.lastNameError}
                        value={state.lastName} onChange={onChange("lastName", "lastNameError")}/>

                    <StyledFormControls error={state.titleError}>
                        <InputLabel>{t('common:chooseLanguage')}</InputLabel>
                        <Select
                            MenuProps={{ disableScrollLock: true }}
                            labelId="language-label"
                            id="language-label-id"
                            value={state.language}
                            error={state.languageError}
                            onChange={onChange("language", "languageError")}>
                          {Object.values(Language).map(
                            lang => (
                              <MenuItem value={lang} key={lang.valueOf()}>{t('common:' + lang.valueOf())}</MenuItem>)
                          )}
                        </Select>
                      {state.languageError && <FormHelperText>Error</FormHelperText>}
                    </StyledFormControls>

                    <StyledTextField
                        id="filled-basic"
                        label={t('email_label')}
                        autoFocus={true}
                        helperText={state.emailError && state.emailErrorText}
                        type="text"
                        fullWidth={true}
                        error={state.emailError}
                        value={state.email} onChange={onChange("email", "emailError")}/>

                    <StyledTextField
                        id="filled-basic"
                        label={t('password_label')}
                        autoFocus={true}
                        helperText={state.passwordError && t('password_missing')}
                        type="password"
                        fullWidth={true}
                        error={state.passwordError}
                        value={state.password} onChange={onChange("password", "passwordError")}/>
                </FormControl>

            </CardContent>
            <StyledCardActions>
                <ActionButton
                    variant="contained"
                    size="large"
                    className={Styles.inputField}
                    disableElevation={true}
                    disabled={open}
                    onClick={cancelRegistration}>{t('common:cancel_label')}</ActionButton>
                <ActionButton
                    variant="contained"
                    size="large"
                    className={Styles.inputField}
                    disableElevation={true}
                    color="primary"
                    disabled={open}
                    onClick={save}>
                  { open && <CircularProgress color="primary"  size={20} thickness={4}/>}
                  {t('signup_button')}
                </ActionButton>
            </StyledCardActions>

        </Card>
        }

        {step === RegistrationStep.done &&
        <Card className={CommonStyles.cardFormMiduim}>
            <CardContent className={CommonStyles.cardFormContent}>
                <h3>You have successfully created your sicuro account</h3>
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
