import React, {useState} from "react";
import {useTranslation} from "next-i18next";
import LoginLayout from "../../components/layouts/LoginLayout";
import Cookies from "universal-cookie";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Box, FormControl, FormHelperText, Grid, makeStyles, MenuItem, Tabs, Theme, Typography} from "@material-ui/core";
import {
  ActionButton,
  StyledCardActions,
  StyledFormControls,
  StyledSelect,
  StyledSelectLabel,
  StyledTab,
  StyledTextField
} from "../../components/CustomMaterialUI";
import CommonStyles from "../../components/common.module.css";
import {useDispatch} from "../../service/Auth.context";
import {authServiceCheckToken} from "../../service/authentication";
import {CompleteSignupRequest, Customer, ResponseData, SecurityQuestion} from "../../state";
import {getCustomerSSR} from "../../service/ssrService";
import {getCountries} from "../../service/UtilService";
import Styles from "../../components/RegistrationForm.module.css";
import {completeSignup} from "../../service/createAccount";
import {useRouter} from "next/router";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: '4px',
    borderBottom: '2px solid',
    '& .MuiTabs-centered': {
      borderBottom: '2px solid',
    }
  }
}));

interface AddressData {
  street: string,
  streetError: boolean,
  streetExtension: string,
  houseNumber: string,
  houseNumberError: boolean,
  postalCode: string,
  postalCodeError: boolean,
  city: string,
  cityError: boolean,
  countryIso: string,
  countryIsoError: boolean
  phoneNumber: string,
  phoneNumberError: boolean
}

interface LocalState {
  address: AddressData,
  securityQuestion: SecurityQuestion,
  securityQuestionAnswer: string,
  securityQuestionError: boolean,
  securityQuestionAnswerError: boolean
}

const CompleteRegistrationPage = ({data}) => {
  const [_, dispatch] = useDispatch();
  const {t} = useTranslation(['common', 'login'])
  const customer: Customer = JSON.parse(data)
  const classes = useStyles();
  const router = useRouter()
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [state, setState] = useState<LocalState>({
    securityQuestion: SecurityQuestion.DEFAULT_SELECT,
    securityQuestionAnswer: "",
    securityQuestionError: false,
    securityQuestionAnswerError: false,
    address: {
      street: "",
      streetError: false,
      streetExtension: "",
      houseNumber: "",
      houseNumberError: false,
      postalCode: "",
      postalCodeError: false,
      city: "",
      cityError: false,
      countryIso: "",
      countryIsoError: false,
      phoneNumber: "",
      phoneNumberError: false
    }
  })
  const [tabState, setTabState] = React.useState(true)
  const {i18n} = useTranslation()
  const countries = getCountries(i18n.language)
  const onChangeAddress = (propAttr: string) => (event) => {
    setState({
      ...state,
      address: {
        ...state.address,
        [propAttr]: event.target.value
      }
    })

    setTabState(isAddressValid)
  }
  const onChangeSecurityQuestion = (propAttr: string) => (event) => {
    setState({
      ...state,
      [propAttr]: event.target.value
    })
  }
  const isAddressValid = () => (state.address.street === '' || state.address.houseNumber === '' ||
    state.address.postalCode === '' || state.address.city === '' || state.address.countryIso === ''
    || state.address.phoneNumber === '')

  const updateAddress = () => {
    setTabState(isAddressValid);
    if (isAddressValid()) {
      setState({
        ...state,
        address: {
          ...state.address,
          streetError: (state.address.street === ''),
          houseNumberError: (state.address.houseNumber === ''),
          postalCodeError: (state.address.postalCode === ''),
          cityError: (state.address.city === ''),
          countryIsoError: (state.address.countryIso === ''),
          phoneNumberError: (state.address.phoneNumber === '')
        }
      });
      return;
    }
    setState({
      ...state,
      address: {
        ...state.address,
        street: state.address.street,
        streetError: (state.address.street === ''),
        houseNumber: state.address.houseNumber,
        houseNumberError: (state.address.houseNumber === ''),
        postalCode: state.address.postalCode,
        postalCodeError: (state.address.postalCode === ''),
        city: state.address.city,
        cityError: (state.address.city === ''),
        countryIso: state.address.countryIso,
        countryIsoError: (state.address.countryIso === ''),
        phoneNumber: state.address.phoneNumber,
        phoneNumberError: (state.address.phoneNumber === '')
      }
    });
    setValue(1);
  }
  const goBack = () => {
    setValue(0)
    setTabState(isAddressValid)
  }
  const completeRegistration = async () => {
    let invalidQuestion = (state.securityQuestion === SecurityQuestion.DEFAULT_SELECT)
    let invalidAnswer = state.securityQuestionAnswer === ''
    if (invalidQuestion || invalidAnswer) {
      setState({
        ...state,
        securityQuestionError: invalidQuestion,
        securityQuestionAnswerError: invalidAnswer
      })
      return
    } else {
      setState({
        ...state,
        securityQuestion: state.securityQuestion,
        securityQuestionError: invalidQuestion,
        securityQuestionAnswer: state.securityQuestionAnswer,
        securityQuestionAnswerError: invalidAnswer
      })
    }
    completeSignup(toCompleteRegistrationRequest()).then(
      (res) => {
        console.log(JSON.stringify(res))
        if (res.success) {
          router.push('/profile/account')
        } else {

        }
      }
    ).catch(error => {

    });
  }

  const toCompleteRegistrationRequest = (): CompleteSignupRequest => ({
    address: {
      street: state.address.street,
      streetExtension: state.address.streetExtension,
      houseNumber: state.address.houseNumber,
      postalCode: state.address.postalCode,
      city: state.address.city,
      countryIso: state.address.countryIso,
      phoneNumber: state.address.phoneNumber
    },
    securityQuestion: {
      question: state.securityQuestion,
      answer: state.securityQuestionAnswer
    }
  });

  return (
    <React.Fragment>
      <div className="s-space-login">
        <form>
          <div className="s-inner-space-login">
            <Grid container justifyContent="center" spacing={3}>
              <Grid container item xs={12} md={6} sm={8} justifyContent="center">
                <Box bgcolor="#fff">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                    centered={true}>
                    <StyledTab label="Provide address information" {...a11yProps(0)} />
                    <StyledTab label="Setup your security question"  {...a11yProps(0)} disabled={tabState}/>
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <div>
                      <div>
                        <FormControl className={CommonStyles.formControl}>
                          <StyledTextField
                            id="address_street"
                            label={t('street')}
                            autoFocus={true}
                            helperText={state.address.streetError && t('street_required')}
                            type="text"
                            fullWidth={true}
                            error={state.address.streetError}
                            value={state.address.street} onChange={onChangeAddress("street")}/>

                          <StyledTextField
                            id="address_street_ext"
                            label={t('streetExtension')}
                            autoFocus={false}
                            type="text"
                            fullWidth={true}
                            value={state.address.streetExtension} onChange={onChangeAddress("streetExtension")}/>

                          <StyledTextField
                            id="address_house_nr"
                            label={t('house_number')}
                            autoFocus={false}
                            helperText={state.address.houseNumberError && t('house_number_required')}
                            type="text"
                            fullWidth={true}
                            error={state.address.houseNumberError}
                            value={state.address.houseNumber} onChange={onChangeAddress("houseNumber")}/>

                          <StyledTextField
                            id="address_postalcode"
                            label={t('postal_code')}
                            autoFocus={false}
                            helperText={state.address.postalCodeError && t('postal_code_required')}
                            type="text"
                            fullWidth={true}
                            error={state.address.postalCodeError}
                            value={state.address.postalCode} onChange={onChangeAddress("postalCode")}/>

                          <StyledTextField
                            id="address_city"
                            label={t('city')}
                            helperText={state.address.cityError && t('city_required')}
                            autoFocus={false}
                            type="text"
                            fullWidth={true}
                            error={state.address.cityError}
                            value={state.address.city} onChange={onChangeAddress("city")}/>

                          <StyledFormControls error={state.address.countryIsoError}>
                            <StyledSelectLabel>{t('common:country')}</StyledSelectLabel>
                            <StyledSelect
                              MenuProps={{disableScrollLock: true, style: {zIndex: 35001}}}
                              labelId="country-label"
                              autoFocus={false}
                              id="address_country"
                              value={state.address.countryIso.toUpperCase()}
                              error={state.address.countryIsoError}
                              onChange={onChangeAddress("countryIso")}
                              disableUnderline>
                              {
                                Object.keys(countries).map(
                                  (key) => (<MenuItem value={key} key={key}>{countries[key]}</MenuItem>))
                              }
                            </StyledSelect>
                            {state.address.countryIsoError && <FormHelperText>{t('country_required')}</FormHelperText>}
                          </StyledFormControls>

                          <StyledTextField
                            id="phoneNumber"
                            label={t('phoneNumber')}
                            helperText={state.address.phoneNumberError && t('phoneNumber-required')}
                            autoFocus={false}
                            type="text"
                            fullWidth={true}
                            error={state.address.phoneNumberError}
                            value={state.address.phoneNumber} onChange={onChangeAddress("phoneNumber")}/>
                        </FormControl>
                      </div>
                      <StyledFormControls>
                        <ActionButton
                          variant="contained"
                          color="primary"
                          disableElevation={true}
                          size="large"
                          onClick={updateAddress}>
                          {t('Continue')}
                        </ActionButton>
                      </StyledFormControls>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div>
                      <div>
                        <StyledFormControls error={state.securityQuestionError}>
                          <StyledSelectLabel>{t('login:security_question')}</StyledSelectLabel>
                          <StyledSelect
                            MenuProps={{disableScrollLock: true, style: {zIndex: 35001}}}
                            labelId="security_question-label"
                            autoFocus={false}
                            id="security_question"
                            value={state.securityQuestion}
                            error={state.securityQuestionError}
                            onChange={onChangeSecurityQuestion("securityQuestion")}
                            disableUnderline>
                            {Object.keys(SecurityQuestion).map(
                              question => (
                                <MenuItem value={question}  key={question.valueOf()}>{t('login:' + SecurityQuestion[question])}</MenuItem>))
                            }
                          </StyledSelect>
                          {state.address.countryIsoError && <FormHelperText>{t('country_required')}</FormHelperText>}
                        </StyledFormControls>
                        <StyledTextField
                          id="security_question_answer"
                          label={t('login:security_question_answer')}
                          helperText={state.securityQuestionAnswerError && t('securityQuestion-answer-required')}
                          autoFocus={false}
                          type="text"
                          fullWidth={true}
                          error={state.securityQuestionAnswerError}
                          value={state.securityQuestionAnswer}
                          onChange={onChangeSecurityQuestion("securityQuestionAnswer")}/>
                      </div>
                      <StyledCardActions>
                        <ActionButton
                          variant="contained"
                          color="primary"
                          disableElevation={true}
                          className={Styles.inputField}
                          size="large"
                          onClick={goBack}>
                          {t('Back')}
                        </ActionButton>
                        <ActionButton
                          variant="contained"
                          color="primary"
                          disableElevation={true}
                          className={Styles.inputField}
                          size="large"
                          onClick={completeRegistration}>
                          {t('Save')}
                        </ActionButton>
                      </StyledCardActions>
                    </div>
                  </TabPanel>
                </Box>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null);
  const token = cookies.get('token')
  if (token !== '' && token !== undefined) {
    const result = await authServiceCheckToken(token)
    if (result.active &&
      result.orphanedToken === false &&
      result.tempPwd === false &&
      result.hasSecurityQuestion !== false)
    {
      return {
        redirect: {
          permanent: false,
          destination: "/profile"
        }
      }
    }
    const response: ResponseData<Customer> = await getCustomerSSR(token)
    if (response.success) {
      return {
        props: {
          ...await serverSideTranslations(ctx.locale, ["login", "common"]),
          data: JSON.stringify(response.data)
        }
      }
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: "/authenticate"
    }
  }
}

CompleteRegistrationPage.layout = LoginLayout

export default CompleteRegistrationPage
