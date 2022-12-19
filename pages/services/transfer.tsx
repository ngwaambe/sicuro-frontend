import {Trans, useTranslation} from "next-i18next";
import PageLayout from "../../components/layouts/PageLayout";
import React from "react";
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Grid from "@material-ui/core/Grid";

const imageStyle: React.CSSProperties = {
  display: 'inline-block',
  float: 'left',
  paddingRight: '25px'
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  alignItems: 'center'
}

const containerItem: React.CSSProperties = {
  alignSelf: 'flex-start'
}

const DomainTransferPage = () => {
  const {t} = useTranslation(['transferpage','common'])
  return (
    <React.Fragment>
      <section className="inner-page-banner-area service-banner-background">
        <div className="container">
          <div className="breadcrumbs-area">
            <h1><Trans>{t('menu-service')}</Trans></h1>
            <ul>
              <li><a href="/"><Trans>{t('menu-home')}</Trans></a></li>
              <li><Trans>{t('menu-secureDomainTransfer')}</Trans></li>
            </ul>

          </div>
        </div>
      </section>
      <section className="s-space-top-default">
        <div className="container">
          <Trans
            i18nKey="about-area-header"
            defaults={t('about-area-header')}
            components={{
              1: <h2 className="section-title-dark"/>,
              2: <strong className="sicuroColor"/>,
              3: <strong className="nameCaseColor"/>
            }}/>
          <Trans
            i18nKey="about-area-text"
            defaults={t('about-area-text')}
            components={{
              1: <p className="lead section-sub-title-dark"/>,
              2: <strong className="nameCaseColor"/>
            }}/>
        </div>
      </section>
      <section className="bg-accent s-space-layout7">
        <div className="container">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4}>
              <div className="media mb-30">
                <div style={imageStyle}>
                  <img src="/img/ico-001.png"/>
                </div>
                <div className="media-body">
                  <h3 className="service-title-dark">
                    <Link href="/howitworks"><a>{t('how-it-works-header')}</a></Link>
                  </h3>
                  <Trans
                    i18nKey="how-it-works-text"
                    defaults={t('how-it-works-text')}
                    components={{
                      1: <p/>,
                      2: <span className="nameCaseColor"/>
                    }}
                  />
                </div>
              </div>
            </Grid>
            <Grid  item xs={12} sm={12} md={4}>
              <div className="media mb-30">
                <div style={imageStyle}>
                  <img src="/img/ico-002.png"/></div>
                <div className="media-body">
                  <h3 className="service-title-dark">
                    <Link href="/pricesAndFees"><a>{t('how-much-cost-header')}</a></Link>
                  </h3>
                  <Trans
                    i18nKey="how-much-cost-text"
                    defaults={t('how-much-cost-text')}
                    components={{
                      1: <p/>,
                      2: <span className="nameCaseColor"/>
                    }}
                  />
                </div>
              </div>
            </Grid>
            <Grid  item xs={12} sm={12} md={4}>
              <div className="media mb-30">
                <div style={imageStyle}>
                  <img src="/img/ico-003.png"/>
                </div>
                <div className="media-body">
                  <h3 className="service-title-dark">
                    <Link href="/broker"><a>{t('brokerage-consulting-header')}</a></Link>
                  </h3>
                  <Trans
                    i18nKey="brokerage-consulting-text"
                    defaults={t('brokerage-consulting-text')}
                    components={{
                      1: <p/>,
                      2: <span className="nameCaseColor"/>
                    }}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
    </React.Fragment>
  )
}

DomainTransferPage.layout = PageLayout;

export const getStaticProps = async ({locale}) => {
  return {
    props: {
      ...( await serverSideTranslations(locale, ['transferpage', 'common'])),
    }
  }
}

export default DomainTransferPage
