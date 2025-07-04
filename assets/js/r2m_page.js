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
import '../js/r2m_header';
import '../js/r2m_mobileMenu';
import '../js/categoryMenu';
import '../js/r2m_categories';
import '../js/joinButton';
import '../js/r2m_category';
import '../js/headerMenuItem';
import '../js/r2m_subCategory';

class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.data.page,
            title: this.props.data.title,
            user: this.props.data.user,
            doc: this.props.data,
            categories: this.props.data.categories,
            expandedCategoryMenu: false,
            expanded: false,
            scrolled: 0,
            scrolledbar: 0
        };

        this.linkResolver = this.linkResolver.bind(this);
        this.togglePageMenu = this.togglePageMenu.bind(this);
        this.setR2MMenu = this.setR2MMenu.bind(this);
        this.toggleCategoryMenu = this.toggleCategoryMenu.bind(this);
        this.setLabel = this.setLabel.bind(this);
        this.goToJoin = this.goToJoin.bind(this);
        this.onScrollPage = this.onScrollPage.bind(this);
    }

    componentDidMount(){
        window.addEventListener("scroll", this.onScrollPage);
    }
    componentWillUnmount(){
        window.removeEventLister("scroll", this.onScrollPage);
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

    setR2MMenu(target){
        const http = target.slice(0, 4);
        console.log(http);

        if(http == 'http'){
            window.location.href = target ;
        }else{
            window.location.href = 'https://www.seriousscrum.com/'+target;
        }
    }

    toggleCategoryMenu() {
        window.scrollTo(0, 0);
        this.setState({
            expandedCategoryMenu: !this.state.expandedCategoryMenu
        });
    }

    setLabel(label) {
        window.location.href = '/r2m/'+label;
    }

    goToJoin(){
        window.location.href='/r2m/travelgroups';
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

    onScrollPage(){
        const winHeightPx =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const scrolledPercentage = `${this.state.scrolled / winHeightPx * 100}%`;
        this.setState({
            scrolledbar: scrolledPercentage,
        })
        console.log(document.documentElement.scrollTop);
        this.setState({
            scrolled: document.documentElement.scrollTop,
        });
    }

    render() {

        const functions = {};

        functions['togglePageMenu'] = this.togglePageMenu;
        functions['setR2MMenu'] = this.setR2MMenu;
        functions['toggleCategoryMenu'] = this.toggleCategoryMenu;
        functions['setLabel'] = this.setLabel;
        functions['goToJoin'] = this.goToJoin;

        const appContainerClassName = "r2mPageContainer";
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

        let followMeIcon = '/images/rabbit-shape.svg';

        if(this.props.data.seriesslug == 'mountaineering'){
            followMeIcon = '/images/eagle-white.svg';
        }
        if(this.props.data.seriesslug == 'kayaking'){
            followMeIcon = '/images/beaver-white.svg';
        }
        if(this.props.data.seriesslug == 'developer' || this.props.data.seriesslug == 'smooth-sailing'){
            followMeIcon = '/images/dolphin-white.svg';
        }
        if(this.props.data.seriesslug == 'self-management'){
            followMeIcon = '/images/turtle-white.svg';
        }
        if(this.props.data.seriesslug == 'artifacts'){
            followMeIcon = '/images/bat-white.svg';
        }



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

                    <R2MHeader functions={functions} search={this.state.search} expanded={this.state.expanded} user={this.state.user} scrolled={this.state.scrolled}/>
                    <R2MMobileMenu functions={functions}/>


                    <PageMenu functions={functions} pages={this.props.data.pageMenu} expanded={this.state.expanded} slug={this.props.data.slug} followMeIcon={followMeIcon}/>
                    <PageTitle title={this.state.title} introduction={RichText.asText(this.state.doc.data.introduction.value)} series={this.props.data.series} seriesslug={this.props.data.seriesslug} r2m={true}/>
                    <PageHero url={thumbnail}/>

                    <div className={contentClassName}>
                        <RichText render={this.state.doc.data.content.value} linkResolver={this.linkResolver} />
                        <div className={"buttonContainer _fr "+hideCTA}>
                            <a href={ctaHref} className={"button  _mb10 _mt10"}><img src={followMeIcon} className="whiteRabbit"/>{RichText.asText(this.state.doc.data.cta_text.value)}</a>
                        </div>
                    </div>

                    <div className={"_mb20"}/>

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