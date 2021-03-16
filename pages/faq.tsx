import React from "react";
import {useTranslation, Trans} from "next-i18next";
import Link from "next/link"

const FaqPage = () => {
    const {t} = useTranslation('home')
    return (
        <React.Fragment>
            <section className="inner-page-banner-area service-banner-background">
                <div className="container">
                    <div className="breadcrumbs-area">
                        <h1>FAQ</h1>
                        <ul>
                            <li><Link href="/index">Home</Link> -</li>
                            <li>{t('menu-faq')}</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="s-space-top-default">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="media-body">
                                <h3>{t('faq-general')}</h3>
                                <ul>
                                    {/*               <ui:repeat var="faq" value="#{faqController.getGeneral()}" varStatus="status">
                                        <li><a href="##{faq-id}">#{faq-question}</a></li>
                                    </ui:repeat>*/}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="media-body">
                                <h3>{t('faq-transaction')}</h3>
                                <ul>
                                    {/*                                    <ui:repeat var="faq" value="#{faqController.getTransaction()}" varStatus="status">
                                        <li><a href="##{faq-id}">#{faq-question}</a></li>
                                    </ui:repeat>*/}
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="media-body">
                                <h3>{t('faq-Seller')}</h3>
                                <ul>
                                    {/*                                    <ui:repeat var="faq" value="#{faqController.getSeller()}" varStatus="status">
                                        <li><a href="##{faq-id}">#{faq-question}</a></li>
                                    </ui:repeat>*/}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="media-body">
                                <h3>{t('faq-buyer')}</h3>
                                <ul>
{/*                                    <ui:repeat var="faq" value="#{faqController.getBuyer()}" varStatus="status">
                                        <li><a href="##{faq-id}">#{faq-question}</a></li>
                                    </ui:repeat>*/}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="s-space-top-default">
                <div className="container">
                    <div className="row">
                        <div id="faq-wrapper" className="col-lg-12 col-md-12 col-sm-6 col-xs-10">
                            <div >
                                <h2 className="section-title-dark">{t('faq-general')}</h2>
{/*                                <ui:repeat var="faq" value="#{faqController.getGeneral()}" varStatus="status">
                                    <section id="#{faq-id}" className="target">
                                        <strong><a>#{faq-question}</a></strong><br/>
                                        <p className="fontsize15px color414042 text-justify">
                                            #{faq-answer}
                                        </p>
                                    </section>
                                </ui:repeat>*/}
                            </div>
                            <div>
                                <h2 className="section-title-dark">{t('faq-transaction')}</h2>
{/*                                <ui:repeat var="faq" value="#{faqController.getTransaction()}" varStatus="status">
                                    <section id="#{faq-id}" className="target">
                                        <strong><a>#{faq-question}</a></strong><br/>
                                        <p className="fontsize15px color414042 text-justify">
                                            #{faq-answer}
                                        </p>
                                    </section>
                                </ui:repeat>*/}
                            </div>
                            <div>
                                <h2 className="section-title-dark">{t('faq-Seller')}</h2>
  {/*                              <ui:repeat var="faq" value="#{faqController.getSeller()}" varStatus="status">
                                    <section id="#{faq-id}" className="target">
                                        <strong><a>#{faq-question}</a></strong><br/>
                                        <p className="fontsize15px color414042 text-justify">
                                            #{faq-answer}
                                        </p>
                                    </section>
                                </ui:repeat>*/}
                            </div>
                            <div>
                                <h2 className="section-title-dark">{t('faq-buyer')}</h2>
{/*                                <ui:repeat var="faq" value="#{faqController.getBuyer()}" varStatus="status">
                                    <section id="#{faq-id}" className="target">
                                        <strong><a>#{faq-question}</a></strong><br/>
                                        <p className="fontsize15px color414042 text-justify">
                                            #{faq-answer}
                                        </p>
                                    </section>
                                </ui:repeat>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="s-space-default overlay-default banner-backgroung" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="text-center">
                                <h2 className="section-lg-title-light">
                                    <Trans>
                                        {t('banner-title')}
                                    </Trans>
                                </h2>
                                <p className="lead banner-para-light">{t('banner-description')}</p>
                                <a href="#" className="btn-ftf-rd-sm-p-dp">{t('contact-us')}</a></div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default FaqPage
