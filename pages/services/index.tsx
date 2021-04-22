import React from 'react'
import {Trans, useTranslation} from "next-i18next";
import PageLayout from "../../components/layouts/PageLayout";
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Grid from "@material-ui/core/Grid";

const strongStyle = {
  color: '#5ec5ed'
}
const ServiceIndexPage = () => {
  const {t} = useTranslation(["servicepage", "common"])
  return (
    <React.Fragment>
      {/* Inner Page Banner Area Start Here */}
      <section className="inner-page-banner-area service-banner-background">
        <div className="container">
          <div className="breadcrumbs-area">
            <h1><Trans>{t('menu-service')}</Trans></h1>
            <ul>
              <li><a href="/"><Trans>{t('menu-home')}</Trans></a></li>
              <li><Trans>{t('menu-service')}</Trans></li>
            </ul>

          </div>
        </div>
      </section>
      {/*Inner Page Banner Area End Here */}
      {/*About Area Start Here*/}
      <section className="s-space-top-default">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title-dark">
              <Trans
                i18nKey="banner-title"
                defaults={t('banner-title')}
                components={{1: <span className="sicuroColor"/>}}/>
            </h2>
            <p className="lead section-sub-title-dark"><Trans>{t('banner-description')}</Trans></p>
          </div>
        </div>
      </section>
      {/*About Area End Here */}
      {/*Service Area Start Here */}
      <section className="bg-accent s-space-layout7">
        <div className="container">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4}>
              <div className="media mb-30">
                <div className="aligneImage"><img src="/img/ico-001.png"/></div>
                <div className="media-body">
                  <h3 className="service-title-dark">
                    <Link href="/services/transfer"><a><Trans>{t('menu-secureDomainTransfer')}</Trans></a></Link>
                  </h3>
                  <Trans>
                    {t('secureDomainTransfer-text')}
                  </Trans>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <div className="media mb-30">
                <div className="aligneImage"><img src="/img/ico-002.png"/></div>
                <div className="media-body">
                  <h3 className="service-title-dark">
                    <Link href="/services/transfer"><a><Trans>{t('menu-sellDomainOnline')}</Trans></a></Link>
                  </h3>
                  <Trans>
                    {t('sellDomainOnline-text')}
                  </Trans>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <div className="media mb-30">
                <div className="aligneImage"><img src="/img/ico-003.png"/></div>
                <div className="media-body">
                  <h3 className="service-title-dark">
                    <Link href="/services/transfer"><a><Trans>{t('menu-buyDomainOnline')}</Trans></a></Link>
                  </h3>
                  <Trans>
                    {t('buyDomainOnline-text')}
                  </Trans>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item xs={12} sm={12} md={4}>
              <div className="media mb-30">
                <div className="aligneImage"><img src="/img/ico-001.png"/></div>
                <div className="media-body">
                  <h3 className="service-title-dark"><Link
                    href="/services/buynowlink"><a><Trans>{t('menu-buyNowLink')}</Trans></a></Link></h3>
                  <Trans>
                    {t('buyNowLink-text')}
                  </Trans>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <div className="mb-30">
                <div className="aligneImage"><img src="/img/ico-003.png"/></div>
                <div className="media-body">
                  <h3 className="service-title-dark"><Link
                    href="/services/broker"><a><Trans>{t('menu-broker')}</Trans></a></Link></h3>
                  <Trans>
                    {t('broker-text')}
                  </Trans>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
      {/*Service Area End Here */}
    </React.Fragment>
  )
}

ServiceIndexPage.layout = PageLayout;

export const getStaticProps = async ({locale}) => (
  {
    props:{ ...( await serverSideTranslations(locale, ["servicepage", "common"]))}
  }
)
export default ServiceIndexPage;
