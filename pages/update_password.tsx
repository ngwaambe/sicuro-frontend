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
import {authServiceCheckToken, clearToken} from "../service/authentication";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import {Customer, ResponseData} from "../state";
import {getCustomerSSR} from "../service/ssrService";


const UpdatePasswordPage = ({data}) => {
  const[_,dispatch] = useDispatch();

  const customer: Customer = JSON.parse(data)

  const styleName = "s-inner-space-login";
  return (
    <React.Fragment>
      <div className="s-space-login">
        <div>
          <div className={styleName}>
            <UpdatePasswordForm customer={customer} />
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

UpdatePasswordPage.layout = LoginLayout

export default  UpdatePasswordPage
