import {Trans, useTranslation} from "next-i18next";
import PageLayout from "../../components/layouts/PageLayout";
import React from "react"
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

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
      <section className="bg-accent s-space-layout7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <Trans
              i18nKey="broker-text"
              defaults={t('broker-text')}
              components={{1:<ul/>, 2:<li/>}}/>
                <div style={{marginTop: '45px'}}>
                  <Link href="/contact"><a><Trans>{t('contact-us')}</Trans></a></Link>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div><img src="/img/img-012.jpg"/></div>
            </div>
          </div>
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
