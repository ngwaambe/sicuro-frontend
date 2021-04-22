import {Trans, useTranslation} from "next-i18next";
import PageLayout from "../../components/layouts/PageLayout";
import React, {CSSProperties} from "react";
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Grid from "@material-ui/core/Grid";

const marginStyle: CSSProperties = {
  marginTop: '45px'
}
const BuyNowLinkPage = () => {
  const {t} = useTranslation(['buynowlink', 'common'])
  return (
    <React.Fragment>
      <section className="inner-page-banner-area service-banner-background2">
        <div className="container">
          <div className="breadcrumbs-area">
            <h1><Trans>{t('menu-buyNowLink')}</Trans></h1>
            <ul>
              <li>
                <Link href="/"><a><Trans>{t('menu-home')}</Trans> - </a></Link>
              </li>
              <li>
                <Link href="/services/"><a><Trans>{t('menu-service')}</Trans> - </a></Link>
              </li>
              <li><Trans>{t('menu-buyNowLink')}</Trans></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="s-space-top-default">
        <div className="container">
          <Grid container spacing={3}>
            <Grid  item xs={12} sm={12} md={6}>
              <div><img src="/img/img-010.jpg"/></div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Trans
                i18nKey="buy-now-link-text"
                defaults={t('buy-now-link-text')}
                components={{1: <span className="sicuroColor"/>}}/>
              <div style={marginStyle}>
                <Link href="/contact"><a><Trans>{t('contact-us')}</Trans></a></Link>
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
    </React.Fragment>
  )
}
BuyNowLinkPage.layout = PageLayout;

export const getStaticProps = async ({locale}) => {
  return {
    props: {
      ...( await serverSideTranslations(locale, ['buynowlink', 'common'])),
    }
  }
}

export default BuyNowLinkPage
