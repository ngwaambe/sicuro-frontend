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
import {Customer, ResponseData, ServiceError} from "../../state";
import {getCustomer } from "../../service/customerService";
import { getCustomerSSR} from "../../service/ssrService";
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
 action: Action,
 customer: Customer,
 counter: number
}


const AccountPage = ({data}) => {
  const {t} = useTranslation('common')
  const classes = useStyle();
  const customer:Customer = JSON.parse(data)
  const[state, setState] = useState<Props>({
    action:Action.DO_NOTHING,
    customer: customer,
    counter: 0,
  })

  const fetchCustomer = async () => {
    const result: ResponseData<Customer> = await getCustomer(customer.id.toString())
    if (result.status == 200){
      setState({
        ...state,
        customer: result.data
      })
    }
  }

  useEffect(() =>{
    fetchCustomer()
  }, [state.counter])


  const changeEmail = () => {
    setState({...state, action:Action.CHANGE_EMAIL})
  }

  const changePassword = () => {
    setState({...state, action:Action.CHANGE_PASSWORD})
  }

  const editPersonalData = () => {
    setState({...state, action:Action.EDIT_PERSONAL_DATA})
  }

  const closeModal = () => {
    setState({
      ...state,
      action:Action.DO_NOTHING
    })
  }

  const saveAndCloseModal = () =>{
    setState({
      ...state,
      action:Action.DO_NOTHING,
      counter: state.counter + 1
    })
  }

  return (
    <div className="s-space-equal">
      {state.action === Action.CHANGE_EMAIL && <EditPersonaData onClose={closeModal} onSave={saveAndCloseModal} customer={state.customer}/>}
      {state.action === Action.CHANGE_PASSWORD && <EditPersonaData onClose={closeModal} onSave={saveAndCloseModal} customer={state.customer}/>}
      {state.action === Action.EDIT_PERSONAL_DATA && <EditPersonaData onClose={closeModal} onSave={saveAndCloseModal} customer={state.customer}/>}
      {customer !== undefined  &&
      <Container maxWidth="lg">
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} sm={12} md={3}>
            <ProfileNaviagtionMenu customer={state.customer}/>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Typography variant="h5" component="h2">{t('UserAccount')}</Typography>
            <Grid container spacing={3} alignItems="stretch" direction="row">
               <Grid item xs={12} sm={12} md={4}>
                 <Card variant="outlined" className={classes.root}>
                   <CardHeader title={t('emailAddress')} classes={{title:classes.title}}/>
                   <CardContent>
                     <Typography align={"left"} component="span">{state.customer.email}</Typography>
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
                     <Typography align={"left"} component="span">{t(state.customer.title)} {state.customer.firstName} {state.customer.lastName}</Typography>
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
        const result: ResponseData<Customer> = await getCustomerSSR(cookie.token)
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
