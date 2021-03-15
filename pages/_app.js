import React from 'react';
import App from 'next/app';
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css';
import css from '../css/styles.css';
import MainLayout from '../components/layouts/MainLayout'
import FrontendLayout from "../components/layouts/FrontendLayout";
import {AuthProvider} from "../service/Auth.context";
import {appWithTranslation, useTranslation} from 'next-i18next'
import Router from 'next/router';
import NProgress from 'nprogress';
import {MyTheme} from "../components/CustomMaterialUI";
import {ThemeProvider} from "@material-ui/core";
import nextI18NextConfig from '../next-i18next.config'

//import 'nprogress/nprogress.css'; //styles of nprogress

const localTheme = MyTheme;
//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


const SicuroApp = ({Component, pageProps}) => {
    const Layout = Component.layout || FrontendLayout;
    return (
        <AuthProvider>
            <ThemeProvider theme={localTheme}>
                <MainLayout>
                    <Head>
                        <meta
                            name="viewport"
                            content="minimum-scale=1, initial-scale=1, width=device-width"
                        />
                        <link rel="stylesheet"
                              href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab:100, 200,300,400,500,600,700,800,900&display=swap"/>
                        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                    </Head>
                    <Layout>
                        <Component {...pageProps}/>
                    </Layout>
                </MainLayout>
            </ThemeProvider>
        </AuthProvider>
    )
}
export default appWithTranslation(SicuroApp, nextI18NextConfig);
