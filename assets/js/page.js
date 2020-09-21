import '../css/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Prismic from 'prismic-javascript'

import { Date, Link, RichText } from 'prismic-reactjs'

import 'regenerator-runtime/runtime';
import 'react-dropdown/style.css';

import '../js/pageHeader';
import '../js/socialMenu';
import '../js/login';
import '../js/pageTitle';
import '../js/pageHero';
import '../js/channels';
import '../js/banner';

class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.data.page,
            title: this.props.data.title,
            user: this.props.data.user,
            doc: this.props.data,
        };

        this.linkResolver = this.linkResolver.bind(this);
    }

    componentDidMount(){
        //this.getContent();
    }

    linkResolver(doc) {
        // Define the url depending on the document type

        // Default to homepage
        return '/'  + doc.slug;
    }

    async getContent(){

        const apiEndpoint = 'https://roadtomastery.prismic.io/api/v2'
        const client = Prismic.client(apiEndpoint)

        const response = await client.query(
            Prismic.Predicates.at('document.id', this.state.page),
            { lang : '*' }
        )
        if (response) {
           this.setState({
               doc: response.results[0]
            })

            // response is the response object, response.results holds the documents
        }
    }

    render() {

        const functions = {};

        const appContainerClassName = "appContainer";
        const contentClassName = "pageContent ";

        const bannerText1 = "Community by and for Scrum Practitioners";
        let bannerText2 = "We seriously need your help! please support us on Patreon!";
        if(this.state.user.patreon =="supporter"){
            bannerText2 = "Yes, you're Serious! Thank you for supporting us!";
        }
        const bannerUrl2 = "/patreon";


        let thumbnail = this.props.data.thumbnail;

        if(typeof thumbnail !== "undefined" ){
            if(!thumbnail.includes('http')){
                thumbnail = '/'+thumbnail;
            }
        }

        let ctaHref = "";
        let hideCTA = " hidden";

        if(typeof this.state.doc.data.cta !== "undefined") {
            hideCTA = "";
            if (typeof this.state.doc.data.cta.value.document !== "undefined"){
                ctaHref = this.state.doc.data.cta.value.document.slug;
            }else if(typeof this.state.doc.data.cta.value.url !== "undefined"){
                ctaHref = this.state.doc.data.cta.value.url;
            }

        }


        if(this.state.doc) {
            return (
                <div className={appContainerClassName}>
                    <PageHeader functions={functions} user={this.state.user} />
                    <PageTitle title={this.state.title} introduction={RichText.asText(this.state.doc.data.introduction.value)} author={this.props.data.author}/>
                    <PageHero url={thumbnail}/>

                    <div className={contentClassName}>
                        <RichText render={this.state.doc.data.content.value} linkResolver={this.linkResolver} />
                        <div className={"buttonContainer _fr "+hideCTA}>
                            <a href={ctaHref} className={"button  _mb10 _mt10"}>{RichText.asText(this.state.doc.data.cta_text.value)}</a>
                        </div>
                    </div>

                    <div className={"_mb20"}/>
                    <Banner bannerText={bannerText2} url={bannerUrl2}/>

                </div>
            )
        }else{
            return (
                <div className={appContainerClassName}>
                loading...
                </div>
            )
        }
    }
}


const root = document.getElementById('root');
const data =  JSON.parse(root.dataset.preload);

ReactDOM.render(<Page data={data} />, root);