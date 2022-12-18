import React, {useEffect, useState} from "react";
import {Trans, useTranslation} from "next-i18next";
import LoginLayout from "../components/layouts/LoginLayout";
import Cookies from "universal-cookie";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {authServiceCheckToken, clearToken, getResetpassword, getSecurityQuestion} from "../service/authentication";
import {Card, CardActions, CardContent, CardHeader, CircularProgress, IconButton} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Styles from "../components/LoginForm.module.css";
import {ActionButton, StyledTextField} from "../components/CustomMaterialUI";
import {SecurityQuestion} from "../state";
import {isEmpty, isNotNull} from "../service/UtilService";
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';
import ReportProblemTwoToneIcon from '@material-ui/icons/ReportProblemTwoTone';
import {ErrorPanel} from "../components/ErrorPanels";

interface state {
  expired: boolean,
  question: SecurityQuestion,
  answer: string,
  answerError: boolean,
  answerErrorText: string,
  error: boolean,
  success: boolean,
  loading: boolean,
}

const panelBody: React.CSSProperties = {
  display: "flex"
}

const ResetPasswordPage = (props) => {
  const {t} = useTranslation(["login", "common"])
  const response = props.response
  const [state, setState] = useState<state>({
    expired: isNotNull(response) ? response.statusCode === 410 : false,
    question: isNotNull(response) ? response.data.question as SecurityQuestion : undefined,
    answer: '',
    answerError: false,
    answerErrorText: '',
    error: isNotNull(response) ? response.error : true,
    loading: false,
    success: false
  })

  const submitAnswer = async e => {
    e.preventDefault();
    if (isEmpty(state.answer)) {
      setState({
        ...state,
        answerError: true,
        answerErrorText: 'common:securityQuestion-answer-required'
      })
      return;
    }

    setState({
      ...state,
      loading: true
    });
    try {
      const response = await getResetpassword({
        questionAnswer: state.answer,
        activationId: props.response.data.activationId
      })
      console.log(JSON.stringify(response))
      if (response.success) {
        setState({
          ...state,
          loading: false,
          success: true
        });
      } else {
        if (response.statusCode === 409) {
          setState({
            ...state,
            answerError: true,
            loading: false,
            answer: '',
            answerErrorText: 'common:resetPasswordValidator-matchError'
          });
        } else if (response.statusCode >= 500) {
        }
      }
    } catch (e) {

    }

  }

  const onChange = (propAttr: string, propErrorAttr: string) => (event) => {
    setState({
      ...state,
      [propAttr]: event.target.value,
      [propErrorAttr]: (event.target.value !== '') ? false : state[propErrorAttr],
    })
  }

  const ResetPasswordSecurityQuestionPanel = () => {
    return (
      <React.Fragment>
        <form onSubmit={submitAnswer}>
          <Card>
            <CardHeader
              title={t('common:resetpassword')}
              titleTypographyProps={{variant: 'h5'}}
            />
            <CardContent>
              <div style={panelBody}>
                <QuestionAnswerTwoToneIcon style={{fontSize: 70}}/>
                <Typography align={"left"} variant="inherit" component="p">
                  {t('common:resetpassword-securityquestion-text')}
                </Typography>
              </div>
              <div className={Styles.inputField}>
                <StyledTextField
                  id="answer_id"
                  label={t(SecurityQuestion[state.question])}
                  autoFocus={true}
                  helperText={state.answerError && t(state.answerErrorText)}
                  type="password"
                  fullWidth={true}
                  disabled={state.loading}
                  error={state.answerError}
                  value={state.answer} onChange={onChange("answer", "answerError")}/>
              </div>
            </CardContent>
            <CardActions>
              <ActionButton
                variant="contained"
                fullWidth={true}
                size={"large"}
                color="primary"
                disableElevation={true}
                disabled={state.loading}
                type="submit"
                onClick={submitAnswer}>
                {state.loading && <CircularProgress color="primary" size={30} thickness={4}/>}
                {!state.loading && t('common:resetpassword-securityquestion-button')}
              </ActionButton>
            </CardActions>
          </Card>
        </form>
      </React.Fragment>
    )
  }

  const ResetPasswordExpiredActivaionPanel = () => {
    return (
      <form>
        <Card>
          <CardHeader
            title={t('common:resetpassword')}
            titleTypographyProps={{variant: 'h5'}}
          />
          <CardContent>
            <div style={panelBody}>
              <ReportProblemTwoToneIcon color="error" style={{fontSize: 70}}/>
              <p>This links is no more valid. Please initiate the process once more. Remember that the "reset passowrd"
                link is only valid for 15 minutes</p>
            </div>
          </CardContent>
        </Card>
      </form>
    )
  }

  const ResetPasswordSuccessPanel = () => {
    return (
      <form>
        <Card>
          <CardHeader title={t('common:resetpassword')} titleTypographyProps={{variant: 'h5'}}/>
          <CardContent>
            <div style={panelBody}>
              <CheckCircleTwoToneIcon color={"primary"} style={{fontSize: 70}}/>
              <p>{t('common:resetpassword-step1-success-text')}</p>
            </div>
          </CardContent>
        </Card>
      </form>
    )
  }
  
  return (
    <React.Fragment>
      <div className="s-space-login">
        <div>
          <div className="s-inner-space-registration">
            {state.success && <ResetPasswordSuccessPanel/>}
            {state.expired && <ResetPasswordExpiredActivaionPanel/>}
            {state.error && <ErrorPanel/>}
            {(!state.error && !state.expired && !state.success) && <ResetPasswordSecurityQuestionPanel/>}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null);
  const token = cookies.get('token')
  if (token !== '' && token !== undefined) {
    const result = await authServiceCheckToken(token)
    if (result.active && result.orphanedToken === false && result.tempPwd === false) {
      return {
        redirect: {
          permanent: false,
          destination: "/profile"
        }
      }
    }
  }

  const code = ctx.query.uuid
  if (ctx.query.uuid !== undefined) {
    try {
      const result = await getSecurityQuestion(code)
      console.log(JSON.stringify(result))
      return {
        props: {
          ...await serverSideTranslations(ctx.locale, ["login", "common"]),
          response: result,
        }
      }
    } catch (error) {
      console.log("Error fetching security question for password reset")
    }
  }
  return {
    props: {
      ...await serverSideTranslations(ctx.locale, ["login", "common"])
    }
  }
}

ResetPasswordPage.layout = LoginLayout

export default ResetPasswordPage
