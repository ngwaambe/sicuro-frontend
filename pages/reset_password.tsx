import React, {useEffect, useState} from "react";
import {Trans, useTranslation} from "next-i18next";
import LoginLayout from "../components/layouts/LoginLayout";
import Cookies from "universal-cookie";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "../components/Modal";
import {FormControl, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {ActionButton, StyledFormTypography, StyledTextField} from "../components/CustomMaterialUI";
import CommonStyles from "../components/common.module.css";
import styles from "../components/ResetPasswordForm.module.css";
import {updateUser, useDispatch} from "../service/Auth.context";
import {authServiceCheckToken, clearToken, resetPassword} from "../service/authentication";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import {Customer, ResponseData} from "../state";
import {getCustomerSSR} from "../service/ssrService";


enum ResePasswordStatus{
  SUCCESS,
  EXPIRED,
  FAILED
}


const ResetPasswordPage = (props) => {
  const {t} = useTranslation(["login", "common"])
  const [status, setStatus] = useState<ResePasswordStatus>(props.status)
  const styleName = "s-inner-space-login";
  return (
    <React.Fragment>
      <div className="s-space-login">
        <div>
          <div className={styleName}>
            {status === ResePasswordStatus.SUCCESS  &&
              <p>Successfull</p>
            }
            {status === ResePasswordStatus.FAILED  &&
              <p>Failed</p>
            }
            {status === ResePasswordStatus.EXPIRED &&
              <p>Expired</p>
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const  getServerSideProps = async(ctx) => {
  const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null);
  const token = cookies.get('token')
  if (token !== '' && token !== undefined) {
    const result =  await authServiceCheckToken(token)
    if (result.active && result.orphanedToken===false && result.tempPwd===false) {
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
    const result = await resetPassword(code)
    return {
      props: {
        ...await serverSideTranslations(ctx.locale, ["login", "common"]),
        status: (result.success) ? ResePasswordStatus.SUCCESS : ResePasswordStatus.FAILED,
      }
    }
  }
  return {
    props: {
      ...await serverSideTranslations(ctx.locale, ["login", "common"])
    }
  }
}

ResetPasswordPage.layout = LoginLayout

export default  ResetPasswordPage
