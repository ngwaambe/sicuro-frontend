import React from "react";
import PropTypes from 'prop-types'
import InfoSlider from "../components/InfoSlider";
import {Trans, Link, withTranslation} from "../i18n";
import TransactionSteps from "../components/TransactionSteps";

class IndexPage extends React.Component{
    constructor(props) {
        super(props);
    }
    static async getInitialProps() {
        return {namespacesRequired: ['common', 'slider', 'home']}
    }

    static async propTypes() {
        t: PropTypes.func.isRequired
    }

    render() {
        return (
            <>
                <InfoSlider/>
                <TransactionSteps/>
                <section className="full-width-section-layout2 bg-accent">
                    <div className="item-content-wrapper">
                        <div className="container d-flex align-items-center">
                            <div className="row">
                                <div className="inner-title-bold inner-designation-primary lead col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <h2 className="marginBottom30">{this.props.t('security-lead')}</h2>
                                    <Trans>{this.props.t('security-text')}</Trans>
                                    <Link href="/security"><a>{this.props.t('container-link')}</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item-img-wrapper">
                        <img src="/img/img-001.png" className="img-responsive" alt="GARANZIE E SICUREZZA"/>
                        <br/>
                    </div>
                </section>
            </>
        )
    }
};


export default withTranslation("home")(IndexPage);
