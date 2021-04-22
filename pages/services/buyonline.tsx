import {Trans, useTranslation} from "next-i18next";
import PageLayout from "../../components/layouts/PageLayout";
import React from "react"
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Grid from "@material-ui/core/Grid";

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
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Trans i18nKey="buyonline-text1" defaults={t('buyonline-text1')} components={{ 1: <ul/>, 2:<li/>}}>{t('buyonline-text1')}</Trans>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <img src="/img/img-004.jpg"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6}>
                            <img src="/img/img-005.jpg"/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Trans i18nKey="buyonline-text2" defaults={t('buyonline-text2')} components={{1:<h4/>}}>{t('buyonline-text2')}</Trans>
                        </Grid>
                    </Grid>
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
