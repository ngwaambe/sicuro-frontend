import React from "react";
import LoginLayout from "../../components/layouts/LoginLayout";
import {checkToken} from "../../service/authentication";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {parseCookies} from "../../service/common";

const ProfilePage = (props) => {
  return (
    <React.Fragment>

    </React.Fragment>
  )
}

export const getServerSideProps = async (ctx) => {
  const data = parseCookies(ctx.req)
  console.log(data);
  if (ctx.res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      return {
        redirect: {
          permanent: false,
          destination: "/authenticate"
        }
      }
    } else {
      console.log("checking token")
      if (data.token !== '' && data.token !== undefined) {
        const success = await checkToken(data.token)
        if (!success) {
          return {
            redirect: {
              permanent: false,
              destination: "/authenticate"
            }
          }
        }
      }
    }
  }

  return {
    props: {
      ...await serverSideTranslations(ctx.locale, ["common"])
    }
  }
}

ProfilePage.layout = LoginLayout
export default ProfilePage
