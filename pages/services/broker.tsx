import {Trans, useTranslation} from "next-i18next";
import PageLayout from "../../components/layouts/PageLayout";
import React from "react"
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Grid from "@material-ui/core/Grid";

const marginStyle = {
  marginTop: '15px'
}
const BrokerPage = () => {
  const {t} = useTranslation(["broker", "common"])
  return (
    <React.Fragment>
      <section className="inner-page-banner-area service-banner-background3">
        <div className="container">
          <div className="breadcrumbs-area">
            <h1><Trans>{t('menu-broker')}</Trans></h1>
            <ul>
              <li>
                <Link href="/"><a><Trans>{t('menu-home')}</Trans> - </a></Link>
              </li>
              <li>
                <Link href="services"><a><Trans>{t('menu-service')}</Trans></a></Link>
              </li>
              <li><Trans>{t('menu-broker')}</Trans></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="s-space-top-default">
        <div className="container">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Trans
              i18nKey="broker-text"
              defaults={t('broker-text')}
              components={{1:<ul/>, 2:<li/>}}/>
                <div style={{marginTop: '45px'}}>
                  <Link href="/contact"><a><Trans>{t('contact-us')}</Trans></a></Link>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div><img src="/img/img-012.jpg"/></div>
            </Grid>
          </Grid>
        </div>
      </section>
    </React.Fragment>
  )
}
BrokerPage.layout = PageLayout;

export const getStaticProps = async ({locale}) => ({
  props: {
    ...( await serverSideTranslations(locale, ["broker", "common"])),
  }
})

export default BrokerPage
