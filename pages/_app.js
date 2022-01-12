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
import {MuiThemeProvider, ThemeProvider} from "@material-ui/core";
import nextI18NextConfig from '../next-i18next.config'
import {parseCookies} from "../service/common";
import {authServiceCheckToken, CheckTokenResponse} from "../service/authentication";


//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


const SicuroApp = ({Component, pageProps, userProps}) => {
    const Layout = Component.layout || FrontendLayout;
    return (

        <AuthProvider loggedIn={userProps.loggedIn} tempPwd={userProps.tempPwd}
                      securityQuestion={userProps.securityQuestion}>

            <Head>
                <title>sicuro.com</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab:100, 200,300,400,500,600,700,800,900&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            </Head>
            <MuiThemeProvider theme={MyTheme}>
                <MainLayout>
                    <Layout>
                        <Component {...pageProps}/>
                    </Layout>
                </MainLayout>
            </MuiThemeProvider>
        </AuthProvider>
    )
}

SicuroApp.getInitialProps = async (appContext) => {
    const {res} = appContext.ctx;
    const pageProps = await App.getInitialProps(appContext)
    const result = await processToken(appContext)
    const isProtectedRoute = appContext.ctx.pathname === '/profile'

    if (isProtectedRoute) {
        if (result.active === false) {
            if (res) {
                console.log("redirect_server_side1")
                res.statusCode = 307
                res.setHeader("Location", "/authenticate")
                res.end();
            } else {
                console.log("redirect_client_side")
                await Router.push("/authenticate");
            }
        } else if (result.active === true && result.tempPwd === true) {
            if (res) {
                //console.log("redirect_server_side_update_pwd")
                res.statusCode = 307
                res.setHeader("Location", "profile/update_password")
                res.end();
            } else {
                //console.log("redirect_client_side_update_pwd")
                await Router.push("profile/update_password");
            }
        } else if (result.active === true && result.completeRegistration === true) {
            if (res) {
                //console.log("redirect_server_side")
                res.statusCode = 307
                res.setHeader("Location", "profile/complete_registration")
                res.end();
            } else {
                //console.log("redirect_client_side")
                await Router.push("profile/complete_registration");
            }
        }
    }
    return {
        pageProps, userProps: {
            loggedIn: result.active,
            tempPwd: result.tempPwd,
            securityQuestion: result.completeRegistration
        }
    }

}

const processToken = async (appContext) => {
    if (appContext.ctx.req) {
        const data = parseCookies(appContext.ctx.req)
        if (!(Object.keys(data).length === 0 && data.constructor === Object) && data.token !== '' && data.token !== undefined) {
            return await authServiceCheckToken(data.token)
        }
    }
    return {active: false, exp: 0}
}


export default appWithTranslation(SicuroApp, nextI18NextConfig);
