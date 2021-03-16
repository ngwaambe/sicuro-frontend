import {Trans} from "next-i18next";
import React , { Fragment}from "react";
import {useTranslation} from "react-i18next";
import PageLayout from "../../components/layouts/PageLayout";
import Link from "next/link"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const marginR2Style = {
    marginBottom: '8px'
}
const pStyle = {
    display:'inline'
}

const RulesPage = () => {
    const {t} = useTranslation(["rulespage", "common"])
    return (
        <Fragment>
            <section className="inner-page-banner-area legal-banner-background">
                <div className="container">
                    <div className="breadcrumbs-area">
                        <h1><Trans>{t('menu-transaction_rules')}</Trans></h1>
                        <ul>
                            <li><Link href="/index"><Trans>{t('menu-home')}</Trans></Link></li>
                            <li><Trans>{t('menu-transaction_rules')}</Trans></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="s-space-top-default">
                <div className="container">
                    <div className="box">
                        <ol className="list_indent">
                            <h3>{t('preamble-title')}</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>{t('preamble-item1')}</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>{t('preamble-item2')}</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>{t('preamble-item3')}</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>General Provisions</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>A person or entity offering personal property for sale, and
                                    desiring to use the sicuro.com site in order to close such a sale, shall hereinafter
                                    be referred to as "Seller". A person or entity desiring to purchase personal
                                    property from a Seller, by use of the sicuro.com site for completing the purchase
                                    shall be referred to as "Buyer". A person or entity offering to broker personal
                                    property for sale, and desiring to use the sicuro.com site in order to close such a
                                    sale, shall hereinafter be referred to as "Broker". A Buyer and Seller may complete
                                    a Transaction with or without a Broker. When a Broker is party to this agreement,
                                    additional instructions as set forth of Section 9 of these General Instructions
                                    shall also apply.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>To the extent that any Broker may be involved in a
                                    Transaction, the Broker shall become a party to the Transaction and have rights
                                    under and/or through the trusted Transaction only if the Broker is an identified
                                    Broker on the particular sicuro.com Transaction. If either Buyer or Seller has any
                                    independent relationship, obligation or duty of any kind with any other broker or a
                                    third party broker, such other or third party broker has no rights under and/or
                                    through the Transaction or from sicuro.com. It is the sole and independent
                                    obligation and duty of the Buyer or Seller who has any independent relationship with
                                    any other or third party broker to satisfy any and all obligations to such other or
                                    third party broker.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}> The use of the sicuro.com site (by the Buyer, Seller and
                                    Broker) for purposes of effectuating a single trusted transfer of ownership of
                                    personal property shall be referred to as a "Transaction". The completion of the
                                    Transaction by Buyer and Seller (and Broker when applicable) is referred to herein
                                    as the "Close of Transaction".</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>A Buyer, Seller and Broker may enter into a Transaction for
                                    the sale and purchase of many different types of personal property.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>This Instruction refers to the personal property which is
                                    the subject of a Transaction interchangeably as "merchandise" "goods" "item(s)" or
                                    "Trusted Property". Funds deposited by the parties shall be referred to as "Trusted
                                    Funds".</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}> If the transaction is in progress, Buyer and Seller (and
                                    Broker when applicable) should each log onto the sicuro.com website daily and
                                    regularly to confirm the status of the Transaction, the shipping and tracking and/or
                                    the Closing.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}> The time of day and calendar day for all matters and events
                                    referred to in these Instructions will be determined by Central European Time
                                    (CET).</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>All communications of any kind, for any purpose shall be
                                    made in by sicuro.com allowed languages: German, English, Italian and Spain. It is
                                    the responsibility of Buyer and or Seller (and Broker when applicable) to each know
                                    and understand the language choosed in their sicuro.com profiles. Any party who
                                    requires interpretation to or from the allowed languages for the purpose of making
                                    or receiving any communication, relating to these Instructions or the Terms of Use,
                                    shall be responsible for any of his, her or its own respective costs in that
                                    regard.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The term “Business Day” shall refer to the working days
                                    Monday through Friday between the hours of 9:00 a.m. and 5:00 p.m. Cetral European
                                    Time, which are not legal holidays in Germany.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>1. Instructions and Deposit of Funds into sicuro.com</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Once the Buyer and Seller (and Broker when applicable) have
                                    agreed to identical Transaction Overview Screens for a specific underlying
                                    Transaction, and both (and Broker when applicable) have agreed to these General
                                    Service Instructions by selecting the "Agree" button at the bottom of the
                                    Transaction Overview Screens, these instructions shall constitute a binding
                                    agreement between all parties. No blank spaces shall exist on the Transaction
                                    Overview Screens as of the time the Buyer and Seller (and Broker when applicable)
                                    select the "Agree" button. After Buyer and Seller (and Broker when applicable) both
                                    select the "Agree" button, the Transaction Overview Screens, General Service
                                    Instructions and Terms of Use constitute the Transaction Instructions to govern the
                                    Transaction between the Buyer and Seller (and Broker when applicable).</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Should it become necessary to add a supplemental
                                    instruction(s), or to make any addition to, deletion from, or alteration to the
                                    Transaction Overview Screens, all parties (Buyer, Seller, sicuro.com and Broker when
                                    applicable) must execute (by digital signature or by a method mutually agreed upon
                                    by both parties) any supplemental instruction, addition, deletion or alteration
                                    thereto (collectively the "Supplemental Instruction(s) of Transaction"). </p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>sicuro.com reserves the right to reject any Supplemental
                                    Transaction Instructions and to terminate the Transaction as provided herein.
                                    sicuro.com may accept instructions that are created, generated, sent, communicated,
                                    received or stored by electronic means and by attaching their Digital
                                    Identification.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The term of "Digital Identification" means the process of
                                    login on the sicuro.com site, introducing the login data: email address and
                                    password.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The parties to the Transaction hereby agree to conduct the
                                    Transaction electronically. The parties acknowledge that by entering into the
                                    Transaction Instructions, they are able to electronically receive the Transaction
                                    Instructions, download the Transaction Instructions and print the Transaction
                                    Instructions.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>If the Buyer agreed to pay for any portion of the sicuro.com
                                    fee and/or for payment transfer charges (if applicable) then those costs shall be
                                    collected as Buyer's funds, and remitted with the purchase price at our trusted
                                    account at the Law Office of Bernhard H. Jansen.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>2. Domain Name(s)</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}> In the event the personal property being transferred in
                                    this Transaction qualifies as a "Domain Name", sicuro.com is instructed to close
                                    only when the transfer of the Domain Name has been confirmed by sicuro.com (at its
                                    option) or the Buyer has notified sicuro.com that Buyer has received the transfer
                                    and allowed the Inspection Period named in the Transaction Overview Screen to expire
                                    or the Buyer has accepted the transfer.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Seller shall transfer a Domain Name(s) to Buyer based upon
                                    information provided in Buyer's profile. Seller agrees to follow the rules of the
                                    Registrar of domain name/s concerned and provide the username and password and/or
                                    authorization code, if any, necessary to access the Top Level Domain Name to Buyer
                                    prior to the release of funds. Seller and Buyer agree to cooperate and coordinate
                                    during the transfer of Domain Name/s.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}> Should Seller agree to accept payments (paying by
                                    installments) from a Buyer for a Domain Name/s, and request that sicuro.com hold the
                                    Domain Name/s while these payments are being made, then Buyer and Seller shall
                                    execute a separate agreement to govern the holding of a Domain Name by sicuro.com.
                                    To the extent that a Transaction involves installment payments which shall result in
                                    sicuro.com holding the domain name for a designated period of time, the parties
                                    shall agree to be bound by the Domain Name Holding Instructions and other such
                                    Transaction documents as the parties may submit to sicuro.com to govern the
                                    Transaction.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>3. Shipping and Tracking of Item</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The total amount defined by the trusted funds must include
                                    shipping costs, if borne by the Buyer.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Upon receipt of Buyer's funds on our trusted account at the
                                    Law Office of Bernhard H. Jansen, and clearance of same, sicuro.com will notify
                                    Seller to ship the merchandise. This notice to Seller shall be accomplished via
                                    e-mail, unless all parties lawfully agree to a different method of notification.
                                    Upon Buyer's inspection outcome is negative, the Buyer agrees to ship the
                                    merchandise to Seller at its own expenses and ensuring the shipment for its full
                                    value.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Buyer and Seller agree to choose a shipping method that
                                    utilizes online tracking information. Seller shall ship merchandise to Buyer based
                                    upon information provided in Buyer's profile. Seller will be responsible for
                                    shipping damage if insurance is not purchased. Seller agrees to complete and submit
                                    the shipping information to the sicuro.com website, on the same day on which the
                                    merchandise is placed in the possession of the company responsible for shipping.
                                    Confirmation of same will be sent via email to all parties, unless all parties
                                    lawfully agree to a different method of notification.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}> In case of the Domain Name/s, which must be collected
                                    (pick-up) by the buyer, the buyer is obliged to start the collection and provide all
                                    the required documents or information to the seller to complete the domain transfer
                                    process.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The Buyer Inspection Period (as defined in Buyer and
                                    Seller's Transaction Instructions, as agreed to on the Transaction Overview Screens
                                    of sicuro.com) shall commence upon the first to occur of either:</p>
                                <ol className="list_indent">
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>Buyer's acknowledgement of receipt of merchandise or
                                            domain(s); or</p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>the sicuro.com website receipt of verification of
                                            delivery to the Buyer's profile information via the shipper's or registrar's
                                            tracking services.</p>
                                    </li>
                                </ol>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Once we receive Buyer's payment at our trusted account at
                                    the Law Office of Bernhard H. Jansen, and the funds are fully available, Buyer and
                                    Seller will be notified through to the email and a message on the sicuro.com site,
                                    that the transfer of goods can take place. In the event the Seller has not shipped
                                    the goods within ten (10) days of notification by sicuro.com (through its email or
                                    posting on the sicuro.com website) of Buyer's deposit of immediately available
                                    funds, Buyer may request a return of funds. In this case sicuro.com will abort the
                                    transaction and our trusted account at the Law Office of Bernhard H. Jansen will
                                    send back the funds to the Buyer, which will be deducted of the sicuro.com fees and
                                    money transfer charges associated with the refund. sicuro.com reserves the right to
                                    provide the Seller a written 48-hour notice after received the Buyer's refund
                                    request and wait for Seller's replay to proceed.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Unless the parties agree otherwise, Buyer is responsible for
                                    any duties, customs fees or other charges resulting from an international
                                    Transaction, which shall be included in the purchase price. It is the responsibility
                                    of the shipping party to properly declare the merchandise and its value for customs
                                    procedures.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>4. Buyer's Acceptance, Disbursement of Funds</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>During the Buyer Inspection Period, Buyer shall either:</p>
                                <ol className="list_indent">
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>select the "Accept" button on the sicuro.com
                                            website, and follow all further instructions accordingly to complete
                                            acceptance of the goods; or</p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>select the "Reject" button and follow any further
                                            instructions to complete the rejection of the goods.</p>
                                    </li>
                                </ol>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Should the Buyer fail to select either the "Accept" or
                                    "Reject" buttons, and/or follow all further instructions, then Buyer shall be deemed
                                    to be satisfied with the quality of the goods/domain(s), and to have accepted the
                                    goods/domain(s).Our trusted account at the Law Office of Bernhard H. Jansen will
                                    then begin the process of disbursing the funds as follows:</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>At close of the transaction, our trusted account at the Law
                                    Office of Bernhard H. Jansen will pay the Seller the purchase price, less the
                                    Seller's sicuro.com transaction fee and the payment transfer charges (if
                                    applicable).</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>sicuro.com reserves the right to provide the Buyer a written
                                    48-hour notice if an Inspection Period has ended without the Buyer's involvement and
                                    wait for Buyer's replay to proceed.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>5. Buyer Rejection Process</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The buyer is responsible for 100% of the escrow fee in the
                                    event the transaction is cancelled or the merchandise is returned. During the Buyer
                                    Inspection Period, Buyer may reject for any reason by selecting the "Reject" button
                                    on the sicuro.com site and following all other instructions to properly reject the
                                    merchandise.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Upon such rejection, sicuro.com will send Seller an email
                                    stating Buyer's decision to reject and return the goods; and Buyer agrees to
                                    promptly ship goods to Seller within ten (10) calendar days of formal rejection and
                                    insure, at Buyer's expense, the item(s) to the place designated by the Seller in the
                                    Seller's profile. Buyer will be responsible for shipping damage if insurance is not
                                    purchased. Buyer is aware that merchandise must be rejected in the manner described
                                    in order to obtain a refund of the purchase price.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Buyer is aware that regardless of the reason for rejection,
                                    the Property must be returned to the Seller in order for funds to be returned to the
                                    Buyer. Shipping costs for returned Property must be arranged and completed within
                                    ten (10) days of Buyer's rejection. Failure of Buyer to return the Property within
                                    the specified time period will cause our trusted account at the Law Office of
                                    Bernhard H. Jansen to automatically pay the Seller the purchase price.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>In the event that Buyer rejects the goods in violation of
                                    other terms of acceptance and rejection, applicable to Buyer and Seller in
                                    connection with the underlying Transaction the Seller shall not be prohibited from
                                    pursuing any available right or remedy against Buyer for breach of the
                                    Transaction.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>In Transactions where the Property is a domain name, if a
                                    Buyer rejects a domain name (which is not being held by sicuro.com pursuant to a
                                    separate holding agreement) within the Inspection Period, return of the domain name
                                    from Buyer to Seller must be initiated within ten (10) days of Buyer's
                                    rejection.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Failure of Buyer to reject or initiate return of the domain
                                    name within the specified time periods will cause our trusted account at the Law
                                    Office of Bernhard H. Jansen to automatically pay the Seller the purchase price.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Seller agrees to cooperate in the return process of the
                                    domain. In the event the domain transfer to the Buyer has caused a ICANN imposed
                                    registrar lock, the Buyer and Seller agree that the Seller will open an account at
                                    the receiving registrar to take possession of the domain or that the funds will be
                                    held blocked until this period expires and the domain can be returned to the
                                    Seller’s registrar.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>6. Shipping and Tracking of Returned Item</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>By rejecting the item in the manner described above, Buyer
                                    agrees to return the item(s) promptly to Seller at the address designated by Seller
                                    in the Seller's profile. Buyer is responsible for all related shipping and insurance
                                    costs; and agrees to return the item to the Seller by use of a shipping method that
                                    utilizes online tracking information. It is the responsibility of the shipping party
                                    to properly declare the merchandise and its value for customs procedures.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Immediately upon shipping the goods back to Seller, Buyer
                                    shall complete and submit, through the sicuro.com website, the requested shipping
                                    information. Upon receipt of such information, Seller will be notified by an email
                                    from sicuro.com which includes the name of the shipping company and the relevant
                                    tracking number as supplied by Buyer. If Buyer sends the goods to Seller without
                                    following the guidelines set forth in this paragraph, sicuro.com will tell to our
                                    trusted account at the Law Office of Bernhard H. Jansen to not return to Buyer any
                                    of the funds unless and until:</p>
                                <ol className="list_indent">
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>the Seller confirms that the rejected item has
                                            arrived in the same condition in which it was originally sent; or</p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>there is a final Conflict Resolution, as set forth
                                            in the Conflict Resolution section below.</p>
                                    </li>
                                </ol>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Should no shipping be necessary in order to effectuate the
                                    return of the merchandise, then Seller and Buyer shall be free of the shipping and
                                    tracking obligations as defined in this section.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The Seller Inspection Period shall commence upon the first
                                    to occur of either:</p>
                                <ol className="list_indent">
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>Seller's acknowledgement of receipt of merchandise
                                            or domain(s); or</p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>the sicuro.com website receipt of verification of
                                            delivery to the Seller's profile information via the shipper's or
                                            registrar's tracking services; or</p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>the Seller's failure to accept Buyer's delivery of
                                            returned goods; or</p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>the Seller's failure to retrieve returned goods upon
                                            notification from the shipping company of the returned goods' availability
                                            for pick up.</p>
                                    </li>
                                </ol>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The Seller shall have five (5) calendar days following the
                                    date on which the Seller Inspection Period begins to inspect the "returned"
                                    merchandise/domain(s).</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>7. Seller Acceptance or Rejection of Return, Disbursement of Funds</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The Seller shall have five (5) calendar days following the
                                    date on which the Seller inspection period begins to:</p>
                                <ol className="list_indent">
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>select the "Accept" button on the sicuro.com
                                            website, and follow all further instructions to properly accept returned
                                            goods; or</p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>select the "Reject" button on the sicuro.com
                                            website, and follow all further instructions to properly reject returned
                                            goods.</p>
                                    </li>
                                </ol>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>During the Seller Inspection Period, should Seller:</p>
                                <ol className="list_indent">
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>fail to select either the "Accept" or "Reject"
                                            buttons on the sicuro.com website; or</p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>fail to follow all instructions in order to
                                            effectuate the acceptance or rejection of a returned item,</p>
                                    </li>
                                </ol>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>then at the end of the Seller Inspection Period, Seller
                                    shall be deemed to be satisfied with the quality of the returned goods, and shall be
                                    deemed to have accepted the returned goods.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The Seller may reject the timely return of Property only if
                                    the property is returned in a condition other than the condition it was in when
                                    first sent from Seller to Buyer. Should Seller reject the item during the Seller
                                    Inspection Period and any time in the following 10 days to the rejection, start the
                                    conflict resolution on the sicuro.com site, the Seller and Buyer shall negotiate for
                                    the Negotiation Period, as defined below. Should the Buyer and Seller fail to reach
                                    an agreement during the Negotiation Period, Seller may launch arbitrage or legal
                                    case against the Buyer (in accordance with the Conflict Resolution section: 10
                                    below).</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>If, as of the 60th calendar day following the end of the
                                    Conflict Resolution Period, Seller has filed for and given notice of the
                                    commencement of arbitration or legal case in accordance with the Conflict Resolution
                                    section of these Instructions, and given acceptable proof of the commencement of
                                    arbitration or legal case to the Buyer and sicuro.com, then Seller shall be deemed
                                    to have waived any rights Seller may have to a return of all or any portion of the
                                    purchase price, the Transaction shall terminate, and sicuro.com will tell to our
                                    trusted account at the Law Office of Bernhard H. Jansen to return Buyer's funds as
                                    provided herein.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>sicuro.com will tell to our trusted account at the Law
                                    Office of Bernhard H. Jansen to begin the process of disbursing the Funds upon the
                                    first to occur of either:</p>
                                <ol className="list_indent">
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>Seller's acceptance of the returned goods; or</p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>the end of the Seller Inspection Period without any
                                            Seller's outcome; or</p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>The Seller rejected the good, but didn't lunch the
                                            Conflict Resolution during the following 10 days; or</p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>sicuro.com didn't receive any legal proof of
                                            commence arbitration or legal case by the Seller (in accordance with the
                                            Conflict Resolution section: 10 below).</p>
                                    </li>
                                </ol>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>If, in the Transaction Instructions, Buyer agreed to pay for
                                    shipping, sicuro.com will tell to our trusted account at the Law Office of Bernhard
                                    H. Jansen to pay Buyer the purchase price, less these costs, total sicuro.com fees
                                    and payment charges (if applicable). sicuro.com will pay Seller for the Shipping
                                    Fee, in the amount set forth in the Transaction Instruction, less the payment
                                    charges (if applicable).</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Once all costs are paid, and funds are disbursed, the
                                    transaction shall be deemed closed, with no further obligation due by Buyer, Seller,
                                    or sicuro.com (or Broker when applicable) under this Agreement or under the
                                    Transaction Instructions.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>sicuro.com reserves the right to provide the Seller a
                                    written 48-hour notice if an Inspection Period has ended without the Seller's
                                    involvement and wait for Seller's replay to proceed.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>8. Cancellation and Disbursement of Funds</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Once escrow funds have been deposited, in the event that
                                    Seller fails to ship the merchandise within the required ten (10) day period or
                                    within any longer time period upon which Buyer and Seller have mutually agreed,
                                    Buyer may request a refund of the deposited funds.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Buyer hereby agrees that the entire sicuro.com fee shall be
                                    deducted from his/her/its refund regardless of any other previous arrangement for
                                    allocation of the sicuro.com fee that may have been made between Buyer and Seller
                                    (and Broker when applicable). Buyer and Seller also agree that Seller may request
                                    the transaction be cancelled at any time upon to send the good/s and the Buyer
                                    refunded, less sicuro.com fees and payment charges (if applicable).</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>In the event of a cancellation after funds are received on
                                    our trusted account at the Law Office of Bernhard H. Jansen, or rejection of
                                    merchandise, the Broker will not receive the commission unless otherwise stipulated
                                    in the escrow agreement.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The revocation request should be submitted in writing form
                                    to sicuro.com.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>9. Transactions Involving a Broker as a Party</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The Broker will initiate the Transaction providing the Buyer
                                    and Seller email addresses and shall give instructions as to any restrictions on
                                    access to Buyer or Seller contact information. Once the Buyer and Seller agree to
                                    the Transaction, including the agreement to the Broker’s commission, the Buyer will
                                    be prompted to send payment to sicuro.com via wire transfer.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>In case of the Domain Name/s transactions and restiricted by
                                    Brokcer on access to Buyer and Seller contact informations, contact informations of
                                    the parties will be disclosed as soon as the domain name/s transfer is finished.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Once the Buyer and Seller agree to the Transaction,
                                    including the agreement to the Broker’s commission, the Buyer will be prompted to
                                    send payment to our trusted account at the Law Office of Bernhard H. Jansen. After
                                    our the Law Office of Bernhard H. Jansen secures and verifies funds, sicuro.com will
                                    instruct the Seller to transfer the merchandise to the Buyer. When the Buyer or
                                    sicuro.com has confirmed the Buyer’s receipt of the merchandise, the Inspection
                                    Period shall begin. Upon the Buyer’s acceptance or the Inspection Period expiring,
                                    our trusted account at the Law Office of Bernhard H. Jansen will disburse funds to
                                    the Seller and the Broker per the Agreement.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>In the event of a cancellation after funds are received by
                                    our trusted account at the Law Office of Bernhard H. Jansen, or rejection of
                                    merchandise, the Broker will not receive the commission unless otherwise stipulated
                                    in the escrow agreement.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The revocation request should be submitted in writing form
                                    to sicuro.com.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>10. Conflict Resolution</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>In the event of any dispute, claim, question, disagreement
                                    or breach arising from or relating to sicuro.com's Terms of Use, this General
                                    Transaction Rules, the Transaction Overview Screens, or the Transaction Escrow
                                    Instructions, including but not limited to Seller's rejection of returned goods,
                                    Buyer's or Seller's Acceptance or Rejection of an item and/or Cancellation of the
                                    Transaction, Buyer and Seller (and Broker when applicable) hereby agree to use their
                                    best efforts to consult and negotiate in good faith for the Negotiation Period, as
                                    defined below, to reach a solution satisfactory to all parties.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>If the parties reach an agreed upon resolution, Buyer and
                                    Seller (and Broker when applicable) will promptly notify sicuro.com in writing by
                                    joint instruction of the terms and conditions thereof.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The following shall be referred to herein as the "Dispute
                                    Date":</p>
                                <ol className="list_indent">
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>the Seller launches the Conflict Resolution on the
                                            sicuro.com website; or</p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>sicuro.com rejecting merchandise/domain(s) on behalf
                                            of the Seller if the Seller is unable to gain access to the sicuro.com
                                            website.</p>
                                    </li>
                                </ol>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The sixty (60) calendar days beginning with the Dispute Date
                                    shall be referred to as the "Period of Conflict Resolution". The first fifteen (15)
                                    days of the "Period of Conflict Resolution" are named as "Period of the
                                    negotiation".</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}> If, after begin of the "Period of Conflict Resolution", and
                                    during the following 15 days of the "Period of Conflict Resolution" the Seller, the
                                    Buyer and the Broker (when applicable) cannot achive the agreement and/or didn't
                                    informe sicuro.com in writing about the achievement of the satisfactoring agreement
                                    for all parties, the Seller will have another 45 days, till to the end of 60 days,
                                    to launch Arbitration or the legal case and to informe the Buyer, Broker (when
                                    applicable) and sicuro.com about that. This second time range of the 45 days are
                                    named as "start of the arbitration or legal court case"</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>sicuro.com reserves the right (but has no obligation) to
                                    commence arbitration, or to interplead the funds with a court of competent
                                    jurisdiction at any time. In this case, Buyer and Seller (and Broker when
                                    applicable) authorize sicuro.com to use the deposed funds to pay the administrative
                                    fees to initiate arbitration or to file a judicial action and process service of the
                                    summons and complaint. Buyer and Seller (and Broker when applicable) agree to accept
                                    service of the notice of demand for binding arbitration or legal court case via
                                    e-mail (via the e-mail addresses previously provided to sicuro.com by Buyer, Seller,
                                    and Broker when applicable).</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Any such binding arbitration or legal court dispute should
                                    be hold in Bonn (Nord Rhein Westfalen), in Germany, unless Buyer, Seller, (and
                                    Broker when applicable) and sicuro.com all agree otherwise in writing to a different
                                    place. In addition to the fact that Buyer and Seller (and Broker when applicable)
                                    agree to have any dispute, claim, question, disagreement or breach arising from or
                                    relating to sicuro.com's Terms of Use, these General Tranascation Instructions, or
                                    the Transaction Overview Screens be determined through binding arbitration and court
                                    order in this instance, Buyer and Seller (and Broker when applicable) also agree
                                    that any issue that may arise regarding the arbitrability or legal court case of any
                                    dispute sent to arbitration or court under this section shall be determined by the
                                    arbitrator or this court alone.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The complainer shell provide the copy of the launch of
                                    arbitration or of the leagl case to other parties, including sicuro.com. Although
                                    sicuro.com must be informed of the request for arbitration or legal proceedings and
                                    also outcome of that procedure, sicuro.com not have any active role in this process,
                                    unless sicuro.com voluntarily choose to take part in it.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Since sicuro.com isn't a party involved in a dispute between
                                    Buyer and Seller (and Intermediary, if involved), sicuro.com is not responsible for
                                    the payment of expenses and fees of legal proceedings.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The parties commit to notify sicuro.com with a copy of the
                                    final decision. sicuro.com will comply with these final verdict.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>In the event of a dispute, Buyer and Seller (and Broker when
                                    applicable) are aware that no action on closing the Transaction will be taken on the
                                    part of sicuro.com and the Law Office of Bernhard H. Jansen until such time as the
                                    dispute is resolved except by either:</p>
                                <ol className="list_indent">
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>sicuro.com's receipt of a written notice of a joint
                                            instruction providing the terms of an agreed upon resolution;</p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>an order of the arbitrator or a court of competent
                                            jurisdiction with reserve to bring an adequate remedy against it</p>
                                    </li>
                                </ol>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>sicuro.com shall have no responsibility and/or liability to
                                    initiate and/or continue to update either party regarding status of the Transaction,
                                    arbitration or other legal proceeding.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>THE OBLIGATION OF the Law Office of Bernhard H. Jansen AND
                                    THEIR AFFILIATES SHALL BE LIMITED TO THE HOLDING AND DISBURSEMENT OF FUNDS UPON
                                    WRITTEN INSTRUCTIONS SIGNED BY ALL PARTIES OR AN AWARD FROM THE ARBITRATOR AND/OR
                                    JUDGE.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Notwithstanding any other provision in these General
                                    Instructions to the contrary, and regardless of whether sicuro.com and/or our
                                    trusted account at the Law Office of Bernhard H. Jansen is identified as a party to
                                    any arbitration or other dispute governed by this section, nothing herein shall be
                                    construed to limit sicuro.com's legal and/or equitable rights, including but not
                                    limited to the filing of an interpleader action in any court of competent
                                    jurisdiction.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>11. Integrated partner</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>In the event an entity's site is integrated to the
                                    sicuro.com website in whole or in part for the purpose of data transmission, that
                                    entity shall be considered an integrated affiliate ("Integrated Affiliate"). In the
                                    event that Seller (and Broker when applicable) is an Integrated Affiliate, Seller
                                    (and Broker when applicable) shall automatically be deemed to agree to the terms set
                                    forth in the Transaction Overview Screens effective when the terms pass from
                                    Seller's site (and Broker’s site when applicable) to the sicuro.com site. Seller
                                    (and Broker when applicable) shall agree automatically to these General
                                    Instructions, the Terms of Use, the Transaction Instructions and any Supplemental
                                    Instructions effective when Buyer selects the "Agree" button, thereby attaching
                                    Buyer's Digital Identification.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>12. Time Limits</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Should the sicuro.com site or our services be unavailable,
                                    or if Buyer and Seller (and Broker when applicable) jointly desire to extend the
                                    Buyer Inspection Period or the Seller Inspection Period, then sicuro.com may, but
                                    shall not be obligated to, extend such times as set forth in the Transaction
                                    Instructions at sicuro.com’s sole and absolute discretion, and sicuro.com will
                                    provide prompt email notification of any extension to all parties. With the
                                    exception of sicuro.com extensions, the Buyer Inspection Period and the Seller
                                    Inspection Period as set forth in these Instructions and the Transaction
                                    Instructions shall not be modified.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>If, for any reason, you are unable to gain access to the
                                    sicuro.com site to inform sicuro.com of any acceptance, rejection or return of
                                    merchandise, then you must notify sicuro.com within the applicable time limit by
                                    emailing us from the support form. This notification will not be considered
                                    effective until sicuro.com acknowledges receipt by notifying Buyer and Seller (and
                                    Broker when applicable) via email or by updating the Transaction Detail Screen.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>13. Timing of Payment</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>All Funds due to Buyer and Seller (and Broker when
                                    applicable) shall be paid as soon as possible following the Buyer's acceptance,
                                    Seller's acceptance, or the resolution of a dispute. In the event that Buyer makes
                                    any form of overpayment, we shall reimburse the overpayment upon the Close of
                                    Transaction. In the event that Buyer or Seller (and Broker when applicable) is
                                    overpaid for any reason, Buyer and Seller (and Broker when applicable) agree to
                                    promptly return the funds to our trusted account at the Law Office of Bernhard H.
                                    Jansen. The payee agrees to pay any postage costs and/or wire fees if an alternate
                                    payment is requested. Buyer and Seller (and Broker when applicable) shall also hold
                                    sicuro.com harmless from any loss that may arise due to currency conversion.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>14. Method of Payment</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Once the buyer selects a payment method, the buyer agrees to
                                    transfer the funds to sicuro.com within 5 following calendar days. Buyer agrees to
                                    provide sicuro.com with any documentation required to validate Buyer's identity. Our
                                    trusted account at the Law Office of Bernhard H. Jansen reserves the right to refuse
                                    any form of payment for any reason, and sicuro.com is under no obligation to
                                    disclose the reason for the payment refusal. If our trusted account at the Law
                                    Office of Bernhard H. Jansen refuses the payment, the Transaction shall be
                                    considered cancelled 20 days after sicuro.com's notification to the Buyer of the
                                    refusal and Buyer's failure to cure within that period. All fund disbursements shall
                                    be made to Seller, or Buyer in the case of a refund (and Broker when applicable),
                                    through to the wire transfer, unless otherwise requested by the payee.
                                    Alternatively, the payee may receive payment by other payment source, if payer
                                    requires this and sicuro.com authorized to do so. </p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>15. Finality of Payment</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Upon any payment or other disposition of the Funds, the
                                    Transaction shall be deemed closed and final with no further obligation on the part
                                    of Buyer, Seller, (and Broker when applicable) or sicuro.com. If after a Transaction
                                    is closed and sicuro.com has distributed proceeds, a Buyer (and Broker when
                                    applicable) who has made a payment with a credit card through to the PayPal
                                    instructs a credit card company to stop payment or make a charge back so that
                                    sicuro.com does not receive the payment from the credit card company or the previous
                                    credit from the credit card company is reversed or “charged back”, said action by
                                    Buyer (and Broker when applicable) is deemed to be a material breach of this
                                    agreement. The parties agree that if such a breach does occur after the Transaction
                                    closes liquidated damages in the amount of the stopped payment, reversal or charge
                                    back plus an additional $5,000 will be imposed (“Liquidated Damages”). The parties
                                    agree the Liquidated Damages amount set forth herein is reasonable in light of:</p>
                                <ol className="list_indent">
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>the anticipated or actual harm caused by the
                                            breach; </p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>he difficulties of proof of loss; and </p>
                                    </li>
                                    <li style={marginR2Style}>
                                        <p style={pStyle}>the inconvenience or non-feasibility of otherwise
                                            obtaining an adequate remedy.</p>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>16. Funds</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>All Funds shall be deposited in a non-interest deposit
                                    account of the Law Office of Bernhard H. Jansen in any German bank institution. </p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>17. Unclaimed Funds</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The Buyer and Seller (or Brokers when applicable) may held
                                    the funds on deposit in our trusted account at the Law Office of Bernhard H. Jansen
                                    for longer than twelve (12) months shall be charged an annual maintenance fee of
                                    fifty euros (€50,00) (the “Maintenance Fee”), beginning with the last day of the
                                    twelfth month. Thereafter, the Maintenance Fee shall be charged on the last day of
                                    the 24th month, and finally on the last day of the 36th month. On the first day of
                                    the 37th month, our trusted account at the Law Office of Bernhard H. Jansen shall
                                    have the right to escheat unclaimed Funds.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>18. Communication Between Parties</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Unless otherwise agreed upon by all parties, all
                                    communication from sicuro.com to Buyer and Seller (and Broker when applicable) may
                                    be by email to the last address provided in the user profile. Buyer and Seller agree
                                    to use the sicuro.com site to verify the accuracy of all email communications from
                                    sicuro.com.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>If a party is unable to use the sicuro.com site after the
                                    Transaction is created and the terms agreed on, a party may contact sicuro.com by
                                    telephone, to make arrangements for alternative methods of signature and
                                    acknowledgment. Buyer, Seller, (Broker when applicable), and sicuro.com shall only
                                    be required to agree to employ alternative communication methods, which are
                                    reasonable accommodations under the circumstances of the Transaction.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>19. Digital Identification</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>sicuro.com creates and revises digital identifications for
                                    all those who are involved in a transaction. The identifications are considered
                                    digital signatures, are personal, they can also be used in security procedures for
                                    verification purposes.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Digital identifications are attached to all electronic
                                    documents accepted and all notification emails.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Despite the digital identifications, sicuro.com has the
                                    right at any time to require written signatures (in ink) on paper, on this general
                                    regulation of the transaction and on the instructions of the transaction.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>From a total transaction volume of € 2.500, sicuro.com is
                                    obliged to carry out an identity check of the 'Buyer, the Seller's (or broker, if
                                    any) and request a copy of identity cards or other documents in order to verify
                                    their identity, as defined by the guidelines of the German Money Laundering Low.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>20. sicuro.com Rights, Disputes and Bankruptcy</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>If sicuro.com belives that the Transaction violates the
                                    terms of these General Instructions, or the Transaction violates or is likely to
                                    violate any applicable law, rule or regulation, then sicuro.com togheter with the
                                    Law Office of Bernhard H. Jansen may terminate the Transaction and seek
                                    court-ordered protection of the Funds in a court of competent jurisdiction by any
                                    court-ordered means, including but not limited to, an impound account and/or
                                    institution of a receiver.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>If any dispute arises between the Buyer and Seller (and
                                    Broker when applicable) and such dispute is not resolved within a reasonable time,
                                    or if any conflicting demand shall be made upon sicuro.com, sicuro.com shall not be
                                    required to take any action until such time as sicuro.com receives written
                                    instructions signed by all parties. sicuro.com may take such action including but
                                    not limited to the institution of an arbitration proceeding or the filing of a
                                    judicial action as sicuro.com, in its sole discretion, elects to do. If sicuro.com
                                    is compelled to initiate arbitration and/or judicial proceedings to enforce the
                                    terms of these General Instructions including but not limited to any action to
                                    collect unpaid fees and/or enforce judgments in any jurisdiction sicuro.com will be
                                    entitled to reimbursement of attorney fees and costs incurred.</p>
                            </li>
                            <li style={marginR2Style}>
                                <p style={pStyle}>Should a Buyer or Seller file for bankruptcy protection in
                                    any Court while either party has an open transaction with sicuro.com, or while
                                    sicuro.com holds title to a domain name or any other property or ongoing service
                                    which is the subject of an transaction, sicuro.com reserves the right to cancel such
                                    transaction and return the property to the Seller with no further instruction
                                    required from the parties.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>21. Authority</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The natural person who selects the "Agree" button at the
                                    bottom of this screen on behalf of the Buyer or Seller (or Broker when applicable)
                                    certifies that by selecting the "Agree" button, that Buyer or Seller (or Broker when
                                    applicable) is at least eighteen years of age and that he or she has read and agrees
                                    to be bound by the terms of these General Instructions, and the Transaction
                                    Instructions. If the natural person is acting on behalf of a corporation, limited
                                    liability company, partnership, trust or business entity of any type, by selecting
                                    the "Agree" button, he or she represents and warrants that he or she has the
                                    authority to bind said entity.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>22. Services Not Included</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>The Buyer and Seller (and Broker when applicable) understand
                                    that the above services DO NOT include any representation of warranty, either
                                    expressed or implied by sicuro.com, and that sicuro.com assumes no responsibility
                                    for the legality of the transaction, condition of the ownership, sufficiency of
                                    instruments conveying ownership, or agreements therefore. Payment of sales tax,
                                    utilities, future performances of Buyer and Seller (and Broker when applicable),
                                    transfer of any insurance policies or warranties, legality of the transaction or
                                    legal effect thereof or any other matters related to merchandise or this transaction
                                    NOT specifically included herein shall be considered outside of this transaction and
                                    sicuro.com and the Law Office of Bernhard H. Jansen shall have any further
                                    responsibility and/or liability for same.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>23. Entire Agreement</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>In case of conflict between any of the terms of these
                                    General Instructions and our Terms of Use, or any of the agreements and any other
                                    agreements between any of the parties to a transaction, these General Instructions
                                    shall control. Any agreement between Buyer and Seller (and Broker when applicable)
                                    that is not reflected in either the Transaction Instructions, or these General
                                    Instructions, in no way bind sicuro.com. By submission below, Buyer and Seller (and
                                    Broker when applicable) agree to be bound by the terms of these General
                                    Instructions.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>24. Governing Law; Venue</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>This Agreement will be construed in accordance with and
                                    governed exclusively by the laws of German State to be performed wholly within such
                                    jurisdiction, regardless of such parties' actual domiciles. All parties submit to
                                    personal jurisdiction in Germany and venue in Bonn. The aforementioned choice of
                                    venue is intended by the parties to be mandatory and not permissive in nature. Each
                                    party hereby waives any right it may have to choose a different jurisdiction.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>25. Severability; Headings</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>If any provision herein is held to be invalid or
                                    unenforceable for any reason, the remaining provisions will continue in full force
                                    without being impaired or invalidated in any way. Headings are for reference
                                    purposes only and in no way define, limit, construe or describe the cope or extent
                                    of such section.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>26. Force Majeure</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>If performance hereunder is interfered with by any condition
                                    beyond a party's reasonable control, the affected party will be excused from such
                                    performance to the extent of such condition.</p>
                            </li>
                        </ol>
                        <ol className="list_indent">
                            <h3>27. Counterparts</h3>
                            <li style={marginR2Style}>
                                <p style={pStyle}>These General Instructions may be executed in two or more
                                    counterparts, each of which will be deemed an original and all of which together
                                    will constitute one instrument. The parties may execute these General Escrow
                                    Instructions and forward an executed counterpart signature to the other party by
                                    electronic signature.</p>
                            </li>
                        </ol>
                    </div>
                </div>
            </section>
        </Fragment>
);
}

RulesPage.layout = PageLayout;

export const getStaticProps = async ({locale}) => ({
    props: {...(await serverSideTranslations(locale, ["rulespage", "common"]))}
})

export default RulesPage
