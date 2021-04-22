import React from 'react';
import App from 'next/app';
import Head from 'next/head'

import css from '../css/styles.css';
import MainLayout from '../components/layouts/MainLayout'
import FrontendLayout from "../components/layouts/FrontendLayout";
import {AuthProvider} from "../service/Auth.context";
import {appWithTranslation} from 'next-i18next'
import Router from 'next/router';
import NProgress from 'nprogress';
import {MyTheme} from "../components/CustomMaterialUI";
import {ThemeProvider} from "@material-ui/core";
import nextI18NextConfig from '../next-i18next.config'
import {parseCookies} from "../service/common";
import {authServiceCheckToken} from "../service/authentication";


//import 'nprogress/nprogress.css'; //styles of nprogress

const localTheme = MyTheme;
//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


const SicuroApp = ({Component, pageProps, userProps }) => {
    const Layout = Component.layout || FrontendLayout;
    return (
        <ThemeProvider theme={localTheme}>
            <AuthProvider loggedIn={userProps.loggedIn}>
                <MainLayout>
                    <Head>
                        <title>sicuro.com</title>
                        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                        <link rel="stylesheet"
                              href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab:100, 200,300,400,500,600,700,800,900&display=swap"/>
                        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                    </Head>
                    <Layout>
                        <Component {...pageProps}/>
                    </Layout>
                </MainLayout>
            </AuthProvider>
        </ThemeProvider>
    )
}


SicuroApp.getInitialProps = async (appContext) => {
    const pageProps = await App.getInitialProps(appContext)
    if (appContext.ctx.req) {
        const data = parseCookies(appContext.ctx.req)
        if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
            if (data.token !== '' && data.token !== undefined) {
                const result = await authServiceCheckToken(data.token)
                if (result.active) {
                    if (result.refreshToken!==null) {
                        console.log(result)
                        appContext.ctx.res.setHeader(
                            'Set-Cookie',[`token=${result.refreshToken.access_token}; httpOnly; Max-Age=1800; SameSite=Strict; Path:/`])
                    }
                } else {
                    appContext.ctx.res.setHeader(
                        'Set-Cookie',[`token=; httpOnly; Max-Age:0; SameSite=Strict; Path:/`])
                }
                return {
                    pageProps,
                    userProps: {loggedIn: result.active}
                }
            }
        }
    }
    return {pageProps, userProps: {loggedIn:false, username:''}}
}


export default appWithTranslation(SicuroApp, nextI18NextConfig);
