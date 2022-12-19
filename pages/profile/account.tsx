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
import {CloseNotification, useDispatch} from "../../service/Auth.context";
import {ErrorModal} from "../../components/ErrorPanels";

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
  const [state, dispatch] = useDispatch();
  const customer: Customer = JSON.parse(data)
  const [localState, setLocalState] = useState<Props>({
    action: Action.DO_NOTHING,
    customer: customer,
    counter: 0,
  })
  const {i18n} = useTranslation()

  const fetchCustomer = () => {
    getCustomer(customer.id.toString()).then( (result) => {
      if (result.success) {
        setLocalState({
          ...localState,
          customer: result.data
        })
      }
      }
    )
  }

  useEffect(() => {
    console.log("use effect<"+JSON.stringify(localState.counter)+">")
    fetchCustomer()
  }, [localState.counter>0])

  const changeEmail = () => {
    setLocalState({...localState, action: Action.CHANGE_EMAIL})
  }

  const changePassword = () => {
    setLocalState({...localState, action: Action.CHANGE_PASSWORD})
  }

  const editPersonalData = () => {
    setLocalState({...localState, action: Action.EDIT_PERSONAL_DATA})
  }

  const editAddress = () => {
    setLocalState({...localState, action: Action.EDIT_ADDRESS})
  }

  const closeModal = () => {
    setLocalState({
      ...localState,
      action: Action.DO_NOTHING
    })
  }

  const saveAndCloseModal = () => {
    setLocalState({
      ...localState,
      action: Action.DO_NOTHING,
      counter: localState.counter + 1
    })
  }

  return (
    <div className="s-space-equal">
      {state.notification && <ErrorModal onClose={()=>dispatch(CloseNotification) } notification={state.notification}/>}
      {localState.action === Action.CHANGE_EMAIL &&
      <EmailModal onClose={closeModal} onSave={saveAndCloseModal} customer={localState.customer}/>}
      {localState.action === Action.CHANGE_PASSWORD &&
      <PasswordModal onClose={closeModal} onSave={saveAndCloseModal} customer={localState.customer}/>}
      {localState.action === Action.EDIT_PERSONAL_DATA &&
      <EditPersonaData onClose={closeModal} onSave={saveAndCloseModal} customer={localState.customer}/>}
      {localState.action === Action.EDIT_ADDRESS &&
      <AddressModal onClose={closeModal} onSave={saveAndCloseModal} customer={localState.customer}/>}
      {customer !== undefined &&
      <Container maxWidth="lg">
          <Grid container justifyContent="center" spacing={3}>
              <Grid item xs={12} sm={12} md={3}>
                  <ProfileNaviagtionMenu customer={localState.customer}/>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                  <Typography variant="h5" component="h2">{t('UserAccount')}</Typography>
                  <Grid container spacing={5} alignItems="stretch" direction="row">
                      <Grid item xs={12} sm={12} md={6}>
                          <Card variant="outlined" className={classes.root}>
                              <CardContent>
                                  <Typography align={"left"} variant="h6" component="h6">{t('login:email_label')} </Typography>
                                  <Typography align={"left"} component="span">{localState.customer.email}</Typography>
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
                                              component="span">{t(localState.customer.title)} {localState.customer.firstname} {localState.customer.lastname}</Typography>
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
                                {localState.customer.address !== null &&
                                <>
                                    <Typography align={"left"} component="span">
                                      {localState.customer.address.street} {localState.customer.address.houseNumber}
                                    </Typography>
                                    <Typography align={"left"} component="br"/>
                                    <Typography align={"left"} component="span">
                                      {localState.customer.address.postalCode} {localState.customer.address.city}
                                    </Typography>
                                    <Typography component="br"/>
                                    <Typography align={"left"} component={"span"}>
                                      {getCountry(localState.customer.address.countryIso, i18n.language)}
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
                          <PaymentAccounts customerId={localState.customer.id} />
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
