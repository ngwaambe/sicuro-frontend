import {Trans, useTranslation} from "next-i18next";
import PageLayout from "../../components/layouts/PageLayout";
import React from "react";
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const margenBottom = {
    marginBottom: '10px'
}

const imageLayout1 = {
    marginTop:'45px',
    marginBottom:'45px'
}

const imageLayout2 = {
  marginTop:'45px',
  marginBottom:'45px'
}

const imageLayout3 = {
  marginTop:'45px',
  marginBottom:'45px'
}

const SellOnlinePage = () => {
  const {t} = useTranslation(['sellonline', 'common'])
  return (
    <React.Fragment>
      <section className="inner-page-banner-area service-banner-background2">
        <div className="container">
          <div className="breadcrumbs-area">
            <h1><Trans>{t('menu-sellDomainOnline')}</Trans></h1>
            <ul>
              <li>
                <Link href="/"><a><Trans>{t('menu-home')}</Trans> - </a></Link>
              </li>
              <li>
                <Link href="/services"><a><Trans>{t('menu-service')}</Trans> - </a></Link>
              </li>
              <li><Trans>{t('menu-sellDomainOnline')}</Trans></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="s-space-top-default">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <h4><Trans>{t('question1')}</Trans></h4>
              <p><Trans>{t('answer1')}</Trans></p>
              <div style={imageLayout1}>
                <img src="/img/img-001.jpg"/>
              </div>
              <h4><Trans>{t('question2')}</Trans></h4>
              <p><Trans>{t('answer2')}</Trans></p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div style={imageLayout2}>
                <img src="/img/img-002.jpg"/>
              </div>
              <h4><Trans>{t('question3')}</Trans></h4>
              <p><Trans i18nKey="answer3" defaults={t('answer3')} components={{ 1: <ul/>, 2:<li/>}}>{t('answer3')}</Trans></p>
              <div style={imageLayout3}>
                <img src="/img/img-002.jpg"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

SellOnlinePage.layout = PageLayout;

export const getStaticProps = async ({locale}) => {
  return {
    props: {
      ...( await serverSideTranslations(locale, ['sellonline', 'common'])),
    }
  }
}

export default SellOnlinePage
