import React from 'react';
import App from 'next/app';
import Head from 'next/head'
import '../css/bootstrap.min.css';
import css from '../css/styles.less';
import MainLayout from '../components/layouts/MainLayout'
import FrontendLayout from "../components/layouts/FrontendLayout";
import { appWithTranslation } from "../i18n"

class SicuroApp extends App {
    render() {
        const {Component, pagePros} = this.props;
        const Layout = Component.Layout || FrontendLayout;
        return (
            <MainLayout>
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab&display=swap" rel="stylesheet"/>
                </Head>
                <Layout>
                    <Component {...pagePros}/>
                </Layout>
            </MainLayout>
        )
    }
}

export default appWithTranslation(SicuroApp);