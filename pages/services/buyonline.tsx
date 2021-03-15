import {Trans, useTranslation} from "next-i18next";
import PageLayout from "../../components/layouts/PageLayout";
import React from "react"
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const marginStyle1 : React.CSSProperties = {
    marginTop:'45px',
    marginBottom:'45px'
}
const marginStyle2: React.CSSProperties = {
    marginBottom:'10px'
}

const BuyOnlinePage = () => {
    const {t} = useTranslation(["buyonline", "common"])
    return (
        <React.Fragment>
            <section className="inner-page-banner-area service-banner-background3">
                <div className="container">
                    <div className="breadcrumbs-area">
                        <h1><Trans>{t('menu-buyDomainOnline')}</Trans></h1>
                        <ul>
                            <li>
                                <Link href="/"><a><Trans>{t('menu-home')}</Trans> - </a></Link>
                            </li>
                            <li>
                                <Link href="services"><a><Trans>{t('menu-service')}</Trans></a></Link>
                            </li>
                            <li><Trans>{t('menu-buyDomainOnline')}</Trans></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="s-space-top-default">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <Trans i18nKey="buyonline-text1" defaults={t('buyonline-text1')} components={{ 1: <ul/>, 2:<li/>}}>{t('buyonline-text1')}</Trans>
                            <div style={marginStyle1}><img
                              src="/img/img-004.jpg"/></div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div style={marginStyle2}>
                                <img src="/img/img-005.jpg"/></div>
                            <Trans i18nKey="buyonline-text2" defaults={t('buyonline-text2')} components={{1:<h4/>}}>{t('buyonline-text2')}</Trans>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export const getStaticProps = async ({locale}) => {
    return {
        props: {
            ...( await serverSideTranslations(locale, ["buyonline", "common"])),
        }
    }
}

BuyOnlinePage.layout = PageLayout;

export default BuyOnlinePage
