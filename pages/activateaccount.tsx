import React, {useState} from "react";
import LoginLayout from "../components/layouts/LoginLayout";
import {NextPageContext} from "next";
import {activateAccount} from "../service/createAccount";
import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Card, CardContent, CardHeader} from "@material-ui/core";
import CommonStyles from "../components/common.module.css";
import {ActionButton, StyledCardActions, StyledFormTypography} from "../components/CustomMaterialUI";
import {Trans, useTranslation} from "next-i18next";
import Styles from "../components/RegistrationForm.module.css";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

enum Step{
  SUCCESS,
  FAILED
}

const useStyle = makeStyles({
  root: {
    minHeight: "130px",
  },
  title: {
    fontSize: '1.15rem',
    fontWeight: 500,
  },
  content: {
    minHeight: "calc(100% - 49px)",
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
interface LocalState {
  step: Step;
}
const Activateaccount = (props) => {
  const {t} = useTranslation(['login','common'])
  const classes = useStyle();
  const [state, setState] = useState<LocalState>({
      step: props.step
  })
  const router = useRouter()

  const login = (): void => {
    router.push('/authenticate')
  }


  return (
    <React.Fragment>
      <div className="s-space-login">
        <div className="s-inner-space-registration">
          <form>
        {state.step === Step.SUCCESS &&
            <Card className={CommonStyles.cardFormMiduim}>
                <CardHeader title={t('account_activation_success')} classes={{title: classes.title}}/>

                <StyledCardActions>
                    <ActionButton
                        size="medium"
                        className={Styles.inputField}
                        variant="outlined"
                        disableElevation={true}
                        color="primary"
                        onClick={login}>{t('login_header')}</ActionButton>
                </StyledCardActions>
            </Card>
        }

        {state.step === Step.FAILED &&
        <>
            <Card className={CommonStyles.cardFormMiduim}>
                <CardHeader title={t('account_activation_failure')} classes={{title: classes.title}}/>
                <CardContent>
                    <Typography align={"left"} component="span">{t('account_activation_failure_text')}</Typography>
                </CardContent>
                <StyledCardActions>
                    <ActionButton
                        size="medium"
                        className={Styles.inputField}
                        variant="outlined"
                        disableElevation={true}
                        color="primary"
                        onClick={login}>{t('login_header')}</ActionButton>
                </StyledCardActions>
            </Card>
        </>
        }
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export const getServerSideProps = async (context) => {
  const code = context.query.uuid
  if (code !== undefined) {
    const result = await activateAccount(code as string)
    const step = (result.success === false) ?  Step.FAILED : Step.SUCCESS
    return {
      props: {
        ...await serverSideTranslations(context.locale, ["common", "login"]),
        step: step
      }
    }
  }
  return {props: {...await serverSideTranslations(context.locale, ["common", "login"]), step: Step.FAILED}}
}

Activateaccount.layout = LoginLayout

export default Activateaccount
