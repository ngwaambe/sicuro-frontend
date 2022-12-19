import React from "react";
import LoginLayout from "../../components/layouts/LoginLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {parseCookies} from "../../service/common";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { getCustomerSSR,} from "../../service/ssrService";
import {GetServerSideProps} from "next";
import {Customer, ResponseData} from "../../state";
import TransactionStats from "../../components/TransactionStats";
import ProfileNaviagtionMenu from "../../components/ProfileNavigationMenu";

const ProfilePage = ({data}) => {
  const customer:Customer = JSON.parse(data)
  return (
    <React.Fragment>
      <div className="s-space-equal">
        <Container maxWidth="lg">
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} sm={3}>
              <ProfileNaviagtionMenu customer={customer}/>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TransactionStats customerId={13213}/>
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.res) {
    const data = parseCookies(ctx.req)
    if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
      if (data.token !== '' && data.token !== undefined) {
        const result: ResponseData<Customer> = await getCustomerSSR(data.token)
        if (result.success) {
          return {
            props: {
              ...await serverSideTranslations(ctx.locale, ["common"]),
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

ProfilePage.layout = LoginLayout
export default ProfilePage
