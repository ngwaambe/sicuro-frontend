import React, {useEffect, useState} from "react";
import LoginLayout from "../../components/layouts/LoginLayout";
import {checkToken} from "../../service/checkToken";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {parseCookies, getCustomerId} from "../../service/common";
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
import {updateCustomer, useDispatch} from "../../service/Auth.context";
import jwt_decode from "jwt-decode";
import {Customer, ResponseData, ServiceError} from "../../state";
import {getCustomer} from "../../service/customerService";

const useStyle = makeStyles({
  root: {
    minHeight:"130px",
  },
  title: {
    fontSize:'1.15rem',
    fontWeight:500,
  },
  content: {
    minHeight:"calc(100% - 49px)",
  },
  action: {
    borderTop: 'solid',
    borderWidth: '1px',
    borderColor: '#0000001E'
  },
  actionItem: {
    width:'100%',
    justifyContent:'left'
  }

})
enum Action {
  DO_NOTHING,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  EDIT_ADDRESS,
  EDIT_PERSONAL_DATA,
  VIEW_PAYMENT_ACCOUNT,
  ADD_PAYMENT_ACCOUNT
}

interface Props {
 action: Action
}


const AccountPage = ({data}) => {
  const {t} = useTranslation('common')
  const classes = useStyle();
  const [state, dispatch] = useDispatch()
  const customer:Customer = JSON.parse(data)
  useEffect(() =>{
    dispatch(updateCustomer(customer))
  }, [])
  const[localState, setLocalState] = useState<Props>({
    action:Action.DO_NOTHING
  })

  const changeEmail = () => {
    setLocalState({...state, action:Action.CHANGE_EMAIL})
  }

  const changePassword = () => {
    setLocalState({...state, action:Action.CHANGE_PASSWORD})
  }

  const editPersonalData = () => {
    setLocalState({...state, action:Action.EDIT_PERSONAL_DATA})
  }

  const closeModal = () => {
    setLocalState({
      ...state,
      action:Action.DO_NOTHING
    })
    console.log('Screw you'+state.action);
  }

  return (
    <div className="s-space-equal">
      {localState.action === Action.CHANGE_EMAIL && <EditPersonaData onClose={closeModal} customer={customer}/>}
      {localState.action === Action.CHANGE_PASSWORD && <EditPersonaData onClose={closeModal} customer={customer}/>}
      {localState.action === Action.EDIT_PERSONAL_DATA && <EditPersonaData onClose={closeModal} customer={customer}/>}
      {customer !== undefined  &&
      <Container maxWidth="lg">
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} sm={12} md={3}>
            <ProfileNaviagtionMenu customer={customer}/>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Typography variant="h5" component="h2">{t('UserAccount')}</Typography>
            <Grid container spacing={3} alignItems="stretch" direction="row">
               <Grid item xs={12} sm={12} md={4}>
                 <Card variant="outlined" className={classes.root}>
                   <CardHeader title={t('emailAddress')} classes={{title:classes.title}}/>
                   <CardContent>
                     <Typography align={"left"} component="span">{customer.email}</Typography>
                   </CardContent>
                   <CardActions className={classes.action}>
                     <ActionButton
                       className={classes.actionItem}
                       startIcon={<EditTwoToneIcon/>}
                       variant="outlined"
                       size="medium"
                       onClick={changeEmail}>
                       {t('edit-email')}
                     </ActionButton>
                   </CardActions>
                 </Card>
               </Grid>
              <Grid item xs={12} sm={12} md={4}>
                 <Card variant="outlined">
                   <CardHeader title={t('password')} classes={{title:classes.title}}/>
                   <CardContent>
                     <Typography align={"left"} component="span">*******</Typography>
                   </CardContent>
                   <CardActions className={classes.action}>
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
              <Grid item xs={12} sm={12} md={4}>
                 <Card variant="outlined">
                   <CardHeader title={t('personalInformation')} classes={{title:classes.title}}/>
                   <CardContent>
                     <Typography align={"left"} component="span">{t(customer.title)} {customer.firstName} {customer.lastName}</Typography>
                   </CardContent>
                   <CardActions className={classes.action}>
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
              <Grid item xs={12} sm={12} md={4}>
                 <Card variant="outlined">
                   <Typography align={"left"} variant="h5" component="h1">Address</Typography>
                 </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                 <Card variant="outlined">
                   <Typography align={"left"} variant="h5" component="h1">Payment Accounts</Typography>
                 </Card>
              </Grid>
               </Grid>
            </Grid>
          </Grid>
      </Container>
      }
    </div>
)};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.res) {
    const cookie = parseCookies(ctx.req)
    if (!(Object.keys(cookie).length === 0 && cookie.constructor === Object)) {
      if (cookie.token !== '' && cookie.token !== undefined) {
        const result: ResponseData<Customer> = await getCustomer(getCustomerId(cookie.token), cookie.token)
        if (result.status === 200) {
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
