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
            user: this.props.data.user,
            doc: this.props.data.data,
        };

        this.linkResolver = this.linkResolver.bind(this);
    }

    componentDidMount(){
        //this.getContent();
    }

    linkResolver() {
        const doc = this.state.doc;
        // Define the url depending on the document type
        if (doc.type === 'page') {
            return '/page/' + doc.uid;
        } else if (doc.type === 'blog_post') {
            return '/blog/' + doc.uid;
        }

        // Default to homepage
        return '/';
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
        const bannerText2 = "We seriously need your help! please support us on Patreon!";
        const bannerUrl2 = "https://www.patreon.com/seriousscrum";

        const title = Object.entries(this.state.doc.title);

        if(this.state.doc) {
            return (
                <div className={appContainerClassName}>
                    <PageHeader functions={functions} user={this.state.user} />
                    <PageTitle title={RichText.asText(this.state.doc.title.value)} introduction={RichText.asText(this.state.doc.introduction.value)} author={this.props.data.author}/>
                    <PageHero url={this.state.doc.hero.value.main.url}/>
                    <div className={contentClassName}>
                        <RichText render={this.state.doc.content.value} linkResolver={this.linkResolver} />
                        <div className={"buttonContainer _fr"}>
                            <a href={this.state.doc.cta.value.document.slug} className={"button  _mb10 _mt10"}>Next article...</a>
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