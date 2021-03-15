import { Trans} from "next-i18next";
import React from "react";
import {withTranslation} from "react-i18next";
import PageLayout from "../../components/layouts/PageLayout";
import Link from "next/link"

const marginR2Style = {
    marginBottom: '8px'
}
const pStyle = {
    display:'inline'
}

const ServiceIndexPage = () => (
    <React.Fragment>
        {/* Inner Page Banner Area Start Here */}
        <section className="inner-page-banner-area service-banner-background">
            <div className="container">
                <div className="breadcrumbs-area">
                    <h1>Service</h1>
                    <ul>
                        <li><Link href="/index"><a>Home</a></Link> - </li>
                        <li>Services</li>
                    </ul>
                </div>
            </div>
        </section>

    </React.Fragment>
);
ServiceIndexPage.layout = PageLayout;
export default (ServiceIndexPage)

