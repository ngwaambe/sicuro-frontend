import {Trans, withTranslation} from "next-i18next";
import React, {Component, ReactNode} from "react";
import PropTypes from "prop-types";
import LoginHeader from "../LoginHeader";
import MenuHeader from "../MenuHeader";
import MobileMenuHeader from "../MobileMenuHeader";
import Link from "next/link";
import {useTranslation} from "react-i18next";


interface Props {
    t: any;
    children?:ReactNode,
}

class PageLayout extends Component<Props> {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        t: PropTypes.func.isRequired,
    }

    static getInitialProps = async () => ({
        namespacesRequired: ['common'],
    })

    render() {
        return (
            <React.Fragment>
                <div>
                    {/* Header Area Start Here */}
                    <div className="header-area header-fixed header-style-four">
                        <LoginHeader/>
                        <MenuHeader/>
                        <MobileMenuHeader/>
                    </div>
                    {/* Header Area End Here */}
                    {this.props.children}
                    {/*About Area Start Here */}
                    <section className="s-space-default overlay-default banner-backgroung">
                        <div className="container">
                            <h2 className="section-lg-title-light">
                                <Trans
                                  i18nKey="banner-title"
                                  defaults={this.props.t('banner-title')}
                                  components={{1: <strong className="sicuroColor"/>}}/>
                            </h2>
                            <p className="lead banner-para-light">{this.props.t('banner-description')}</p>
                            <a href="#" className="btn-ftf-rd-sm-p-dp">{this.props.t('contact-us')}</a>
                        </div>
                    </section>
                    {/*About Area End Here */}
                </div>
            </React.Fragment>
        )
    }
}

export default withTranslation('common')(PageLayout);
