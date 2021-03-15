import {Trans, useTranslation} from "next-i18next";
import PageLayout from "../../components/layouts/PageLayout";
import React, {CSSProperties} from "react";
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

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
      <section className="bg-accent s-space-layout7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div><img src="/img/img-010.jpg"/></div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <Trans
                i18nKey="buy-now-link-text"
                defaults={t('buy-now-link-text')}
                components={{1: <span className="sicuroColor"/>}}/>
              <div style={marginStyle}>
                <Link href="/contact"><a><Trans>{t('contact-us')}</Trans></a></Link>
              </div>
            </div>
          </div>
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
