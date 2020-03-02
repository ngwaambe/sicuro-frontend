import React from 'react';
import App from 'next/app';
import '../css/bootstrap.min.css';
import css from '../css/styles.less';
import MainLayout from '../components/layouts/MainLayout'
import FrontendLayout from "../components/layouts/FrontendLayout";


class SicuroApp extends App {
    render() {
        const {Component, pagePros} = this.props;
        const Layout = Component.Layout || FrontendLayout;
        return (
            <MainLayout>
                <Layout>
                    <Component {...pagePros}/>
                </Layout>
            </MainLayout>
        )
    }
}

export default SicuroApp;