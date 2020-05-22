import React from 'react'
import {Link, Trans, withTranslation} from "../../../i18n";
import PropTypes from "prop-types";

const ServiceIndexPage = ({t}) => (
    <React.Fragment>
        {/* Inner Page Banner Area Start Here */}
        <section className="inner-page-banner-area service-banner-background" >
            <div className="container">
                <div className="breadcrumbs-area">
                    <h1>Servizi</h1>
                    <ul>
                        <li><a href="/index">Home</a></li>
                        <li>Servizi</li>
                    </ul>
                </div>
            </div>
        </section>
        {/*Inner Page Banner Area End Here */}
        {/*About Area Start Here*/}
        <section className="s-space-top-default">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title-dark">
                        <Trans>
                            {t('banner-title')}
                        </Trans>
                    </h2>
                    <p className="lead section-sub-title-dark">{t('banner-description')}</p>
                </div>
            </div>
        </section>
        {/*About Area End Here */}
        {/*Service Area Start Here */}
        <section className="bg-accent s-space-layout7">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="media mb-30">
                            <div className="aligneImage"><img src="/img/ico-001.png"/></div>
                            <div className="media-body">
                                <h3 className="service-title-dark">
                                    <Link href="/services/transfer"><a>Trasferimento sicuro domini</a></Link>
                                </h3>
                                <p>Una categoria speciale di transazioni che si possono effettuare su sicuro.com è quella dei nomi a dominio. Per trasferire un nome a dominio sono necessarie alcune competenze tecniche specifiche, soprattutto se si acquistano domini di estensioni straniere (per esempio .es, .fr, .de ecc). Per tale motivo sicuro.com ha stretto una collaborazione con   al fine di garantire ai propri utenti un più facile svolgimento delle transazioni.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="media mb-30">
                            <div className="aligneImage"><img src="/img/ico-002.png"/></div>
                            <div className="media-body">
                                <h3 className="service-title-dark">
                                    <Link href="/services/transfer"><a>Vendere online</a></Link>
                                </h3>
                                <p>Vendi online occasionalmente o hai effettuato una vendita a distanza? Hai dei dubbi su come effettuare la transazione o non puoi offrire sufficienti garanzie ai tuoi clienti? Con sicuro.com puoi dare il massimo della sicurezza ai tuoi acquirenti senza d’altra parte rischiare di essere soggetto a truffe.</p>
                             </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="media mb-30">
                            <div className="aligneImage"><img src="/img/ico-003.png"/></div>
                            <div className="media-body">
                                <h3 className="service-title-dark">
                                    <Link href="/services/transfer"><a>Acquistare online</a></Link>
                                </h3>
                                <p>Vuoi acquistare un articolo da un privato o da un’azienda ma, per qualsiasi ragione, non ti senti sufficientemente garantito? Usa sicuro.com! Dopo aver avviato una transazione in modo facile e con pochi clic, ti chiederemo di effettuare il pagamento sul nostro conto di deposito e avviseremo il venditore quando avremo ricevuto la merce. Successivamente gli chiederemo di inviarti la merce o il servizio, che potrai ispezionare entro i limiti di tempo che avrete concordato.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="media mb-30">
                            <div className="aligneImage"><img src="/img/ico-001.png"/></div>
                            <div className="media-body">
                                <h3 className="service-title-dark"><Link href="/services/buynowlink"><a>Acquista ora Link</a></Link></h3>
                                <p>Con il link "compralo subito" di sicuro.com puoi offrire maggiori garanzie ai tuoi clienti che vogliono acquistare domini e allo stesso tempo avere uno strumento di vendita rapido e veloce. Puoi infatti creare un collegamento che contiene dati predeterminati, come il nome del dominio e il prezzo a cui vuoi venderlo. Inserendo il link nelle e-mail promozionali o nel sito in cui promuovi i tuoi domini, offrirai la possibilità ai tuoi acquirenti di acquistare il tuo dominio in modo facile, sicuro e veloce</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="media mb-30">
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="media mb-30">
                            <div className="aligneImage"><img src="/img/ico-003.png"/></div>
                            <div className="media-body">
                                <h3 className="service-title-dark"><Link href="/services/broker"><a>Broker</a></Link></h3>
                                <p>sicuro.com ha creato uno strumento flessibile e ottimale studiato appositamente per domain broker. Se sei un broker e hai bisogno di dare garanzie ai tuoi clienti, acquirente e venditore, nella gestione del transazione di un nome a dominio, sicuro.com ti fornisce tutto ciò di cui hai bisogno.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*Service Area End Here */}
        {/*About Area Start Here */}
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
        {/*About Area End Here */}
    </React.Fragment>
);

ServiceIndexPage.propTypes = {
    t: PropTypes.func.isRequired,
}

ServiceIndexPage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
export default withTranslation("common")(ServiceIndexPage);