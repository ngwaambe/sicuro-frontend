import React from "react";
import {useTranslation} from "next-i18next";
import LoginLayout from "../../components/layouts/LoginLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import UpdatePasswordForm from "../../components/UpdatePasswordForm";
import {Customer, ResponseData} from "../../state";
import {getCustomerSSR} from "../../service/ssrService";
import {parseCookies} from "../../service/common";



const UpdatePasswordPage = ({data}) => {
  const {t} = useTranslation(["login", "common"])
  const customer: Customer = JSON.parse(data)

  const styleName = "s-inner-space-registration";
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

UpdatePasswordPage.layout = LoginLayout

export default  UpdatePasswordPage
