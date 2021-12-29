import React, {useEffect, useState} from "react";
import LoginLayout from "../../components/layouts/LoginLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {parseCookies} from "../../service/common";
import Grid from "@material-ui/core/Grid";
import {GetServerSideProps} from "next";
import ProfileNaviagtionMenu from "../../components/ProfileNavigationMenu";
import {Card, CardActions, CardContent, CardHeader, Container} from "@material-ui/core";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ActionButton} from "../../components/CustomMaterialUI";
import {useTranslation} from "next-i18next";
import EditPersonaData from "../../components/PersonalDataModal";
import {Customer,  ResponseData } from "../../state";
import {getCustomer} from "../../service/customerService";
import {getCustomerSSR} from "../../service/ssrService";
import {getCountry} from "../../service/UtilService";
import EmailModal from "../../components/EmailModal";
import PasswordModal from "../../components/PasswordModal";
import PaymentAccounts from "../../components/PaymentAccounts";
import AddressModal from "../../components/AddressModal";

const useStyle = makeStyles({
  root: {
    minHeight: "130px",
  },
  content: {
    minHeight: "130px",
  },
  action: {
    borderTop: 'solid',
    borderWidth: '1px',
    borderColor: '#0000001E'
  },
  actionItem: {
    width: '100%',
    justifyContent: 'left'
  }

})

enum Action {
  DO_NOTHING,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  EDIT_ADDRESS,
  EDIT_PERSONAL_DATA
}

interface Props {
  action: Action,
  customer: Customer,
  counter: number
}


const AccountPage = ({data}) => {
  const {t} = useTranslation(['common', 'login'])
  const classes = useStyle();
  const customer: Customer = JSON.parse(data)
  console.log(customer)
  const [state, setState] = useState<Props>({
    action: Action.DO_NOTHING,
    customer: customer,
    counter: 0,
  })
  const {i18n} = useTranslation()

  const fetchCustomer = () => {
    getCustomer(customer.id.toString()).then( (result) => {
      if (result.success) {
        setState({
          ...state,
          customer: result.data
        })
      }
      }
    )
  }

  useEffect(() => {
    console.log("use effect<"+JSON.stringify(state.counter)+">")
    fetchCustomer()
  }, [state.counter>0])

  const changeEmail = () => {
    setState({...state, action: Action.CHANGE_EMAIL})
  }

  const changePassword = () => {
    setState({...state, action: Action.CHANGE_PASSWORD})
  }

  const editPersonalData = () => {
    setState({...state, action: Action.EDIT_PERSONAL_DATA})
  }

  const editAddress = () => {
    setState({...state, action: Action.EDIT_ADDRESS})
  }

  const closeModal = () => {
    setState({
      ...state,
      action: Action.DO_NOTHING
    })
  }

  const saveAndCloseModal = () => {
    setState({
      ...state,
      action: Action.DO_NOTHING,
      counter: state.counter + 1
    })
  }

  return (
    <div className="s-space-equal">
      {state.action === Action.CHANGE_EMAIL &&
      <EmailModal onClose={closeModal} onSave={saveAndCloseModal} customer={state.customer}/>}
      {state.action === Action.CHANGE_PASSWORD &&
      <PasswordModal onClose={closeModal} onSave={saveAndCloseModal} customer={state.customer}/>}
      {state.action === Action.EDIT_PERSONAL_DATA &&
      <EditPersonaData onClose={closeModal} onSave={saveAndCloseModal} customer={state.customer}/>}
      {state.action === Action.EDIT_ADDRESS &&
      <AddressModal onClose={closeModal} onSave={saveAndCloseModal} customer={state.customer}/>}
      {customer !== undefined &&
      <Container maxWidth="lg">
          <Grid container justifyContent="center" spacing={3}>
              <Grid item xs={12} sm={12} md={3}>
                  <ProfileNaviagtionMenu customer={state.customer}/>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                  <Typography variant="h5" component="h2">{t('UserAccount')}</Typography>
                  <Grid container spacing={5} alignItems="stretch" direction="row">
                      <Grid item xs={12} sm={12} md={6}>
                          <Card variant="outlined" className={classes.root}>
                              <CardContent>
                                  <Typography align={"left"} variant="h6" component="h6">{t('login:email_label')} </Typography>
                                  <Typography align={"left"} component="span">{state.customer.email}</Typography>
                              </CardContent>
                              <CardActions>
                                  <ActionButton
                                      className={classes.actionItem}
                                      startIcon={<EditTwoToneIcon/>}
                                      variant="outlined"
                                      size="medium"
                                      onClick={changeEmail}>
                                    {t('email_address_edit')}
                                  </ActionButton>
                              </CardActions>
                          </Card>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                          <Card variant="outlined">
                              <CardContent>
                                  <Typography align={"left"} variant="h6" component="h6">{t('password')} </Typography>
                                  <Typography align={"left"} component="span">*******</Typography>
                              </CardContent>
                              <CardActions>
                                  <ActionButton
                                      className={classes.actionItem}
                                      startIcon={<EditTwoToneIcon/>}
                                      variant="outlined"
                                      size="medium"
                                      onClick={changePassword}>
                                    {t('change_password_label')}
                                  </ActionButton>
                              </CardActions>
                          </Card>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                          <Card variant="outlined">
                              <CardContent>
                                  <Typography align={"left"} variant="h6" component="h6">{t('personalInformation')} </Typography>
                                  <Typography align={"left"}
                                              component="span">{t(state.customer.title)} {state.customer.firstname} {state.customer.lastname}</Typography>
                              </CardContent>
                              <CardActions>
                                  <ActionButton
                                      className={classes.actionItem}
                                      startIcon={<EditTwoToneIcon/>}
                                      variant="outlined"
                                      size="medium"
                                      onClick={editPersonalData}>
                                    {t('person-details-edit')}
                                  </ActionButton>
                              </CardActions>
                          </Card>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                          <Card variant="outlined">
                              <CardContent>
                                  <Typography align={"left"} variant="h6" component="h6">{t('address')} </Typography>
                                {state.customer.address !== null &&
                                <>
                                    <Typography align={"left"} component="span">
                                      {state.customer.address.street} {state.customer.address.houseNumber}
                                    </Typography>
                                    <Typography align={"left"} component="br"/>
                                    <Typography align={"left"} component="span">
                                      {state.customer.address.postalCode} {state.customer.address.city}
                                    </Typography>
                                    <Typography component="br"/>
                                    <Typography align={"left"} component={"span"}>
                                      {getCountry(state.customer.address.countryIso, i18n.language)}
                                    </Typography>
                                </>
                                }
                              </CardContent>
                              <CardActions>
                                  <ActionButton
                                      className={classes.actionItem}
                                      startIcon={<EditTwoToneIcon/>}
                                      variant="outlined"
                                      size="medium"
                                      onClick={editAddress}>
                                    {t('address-details-edit')}
                                  </ActionButton>
                              </CardActions>
                          </Card>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                          <Typography variant="h5" component="h2">Payment accounts</Typography>
                          <PaymentAccounts customerId={state.customer.id} />
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
      </Container>
      }
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log("_PROFILE_ACCOUNT_PAGE")
  if (ctx.res) {
    const cookie = parseCookies(ctx.req)
    if (!(Object.keys(cookie).length === 0 && cookie.constructor === Object)) {
      if (cookie.token !== '' && cookie.token !== undefined) {
        const result: ResponseData<Customer> = await getCustomerSSR(cookie.token)
        if (result.success) {
          return {
            props: {
              ...await serverSideTranslations(ctx.locale, ["common", "login"]),
              data: JSON.stringify(result.data)
            }
          }
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

AccountPage.layout = LoginLayout
export default AccountPage
