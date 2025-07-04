import '../css/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Prismic from 'prismic-javascript'
import MetaTags from 'react-meta-tags';

import { Date, Link, RichText } from 'prismic-reactjs'

import 'regenerator-runtime/runtime';
import 'react-dropdown/style.css';

import '../js/pageHeader';
import '../js/pageMenu';
import '../js/pageMenuItem';
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
            expanded: false,
        };

        this.linkResolver = this.linkResolver.bind(this);
        this.togglePageMenu = this.togglePageMenu.bind(this);
    }

    componentDidMount(){
        //this.getContent();
    }

    linkResolver(doc) {
        // Define the url depending on the document type

        // Default to homepage

        return '/page/'  + doc.slug;
    }

    togglePageMenu() {
        this.setState({
            expanded: !this.state.expanded
        });
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

        functions['togglePageMenu'] = this.togglePageMenu;

        const appContainerClassName = "appContainer";
        const contentClassName = "pageContent ";

        const bannerText1 = "Community by and for Scrum Practitioners";
        let bannerText2 = "We seriously need your help! please support us on Patreon!";
        if(this.state.user.patreon =="supporter"){
            bannerText2 = "Yes, you're Serious! Thank you for supporting us!";
        }
        const bannerUrl2 = "/patreon";


        let thumbnail = this.props.data.thumbnail;

        let ogThumbnail = "";
        if(typeof thumbnail !== "undefined" ){
            ogThumbnail = thumbnail;
            if(!thumbnail.includes('http')){
                thumbnail = '/'+thumbnail;
                ogThumbnail = 'http://www.seriousscrum.com'+thumbnail;
            }


        }

        let ctaHref = "";
        let hideCTA = " hidden";

        if(typeof this.state.doc.data.cta !== "undefined") {
            hideCTA = "";
            if (typeof this.state.doc.data.cta.value.document !== "undefined"){
                ctaHref = '/page/'+this.state.doc.data.cta.value.document.slug;
            }else if(typeof this.state.doc.data.cta.value.url !== "undefined"){
                ctaHref = '/page/'+this.state.doc.data.cta.value.url;
                if (this.state.doc.data.cta.value.url.includes('http')) {
                    ctaHref = this.state.doc.data.cta.value.url;
                }
            }
        }

        const url = "https://www.seriousscrum.com/page/"+this.props.data.slug;



        if(this.state.doc) {
            return (
                <div className={appContainerClassName}>
                    <MetaTags>
                        <title>{this.state.title}</title>
                        <meta name="description" content="Some description." />
                        <meta property="og:description" content={RichText.asText(this.state.doc.data.introduction.value)} />
                        <meta property="og:title" content={this.state.title} />
                        <meta property="og:url" content={url} />
                        <meta property="og:image" content={ogThumbnail} />
                        <meta property="og:author" content={this.props.data.author} />
                        <meta property="article:author" content={this.props.data.author} />
                    </MetaTags>
                    <PageHeader functions={functions} user={this.state.user} />
                    <PageMenu functions={functions} pages={this.props.data.pageMenu} expanded={this.state.expanded} slug={this.props.data.slug}/>
                    <PageTitle title={this.state.title} introduction={RichText.asText(this.state.doc.data.introduction.value)} series={this.props.data.series} seriesslug={this.props.data.seriesslug} r2m={false}/>
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