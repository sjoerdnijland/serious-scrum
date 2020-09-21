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

class Patreon extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.data.user,
            title: "Welcome to our Patreon Program",
            introduction: "Support those who support you!",
            imageUrl: "/../images/seriouspatreon.png",
            loginText: "Login!",
            connectText: "Connect with Patreon!",
            becomeText: "Select a membership level!",
            content:
            "<h3>Scrum is by and for us all.</h3> " +
            "As a community we offer opportunities. Collectively we share a world of ideas, practices, connections, knowledge and experience. Every member has a chance to be seen, heard and thrive. " +
            "We encourage the community to be more than followers, to be each other's supporters. " +
            "We aim to sustain the community <i>through</i> its supporters and return value to those who contribute value. " +
            "It allows us to differentiate between professionals who are there to get some info and then peace out and those who are exchanging value. " +
            "Please support those who help drive (y)our ambitions forward. <br/><br/>"
        };

    }

    componentDidMount(){
        //this.getContent();
    }


    render() {

        const functions = {};

        const appContainerClassName = "appContainer";
        const contentClassName = "pageContent ";

        const bannerText1 = "Community by and for Scrum Practitioners";
        const bannerText2 = "We seriously need your help! please support us on Patreon!";
        const bannerUrl2 = "https://www.patreon.com/seriousscrum";

        let hideCTA1 = " hidden";
        let hideCTA2 = "";
        let hideCTA3 = " hidden";

        let content = this.state.content;

        if(!this.state.user.roles.includes("ROLE_USER")){
            content += "<b>Please login so we can connect your Patreon membership to your Serious Scrum Account.</b><br/><br/>";
            hideCTA2 = " hidden";
            hideCTA3 = " ";
        }else if(this.state.user.patreon == "member"){
            content = "Awesome you are a Patreon member! <br/><b>Please select a membership level to get access to exclusive content.</b><br/><br/>";
            hideCTA1 = " ";
            hideCTA2 = " hidden";
        }else if(this.state.user.patreon == "supporter"){
            content = "Thank you for supporting us! ";
            hideCTA2 = " hidden";
        }


        return (
            <div className={appContainerClassName}>
                <PageHeader functions={functions} user={this.state.user} />
                <PageTitle title={this.state.title} introduction={this.state.introduction} author={this.props.data.author}/>


                <div className={contentClassName} >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: content
                        }}></div>
                    <div className={"buttonContainer _fl "+hideCTA1}>
                        <a href={"https://www.patreon.com/seriousscrum"} target ="_blank" className={"button  _mb10 _mt10"}>{this.state.becomeText}</a>
                    </div>

                    <div className={"buttonContainer "+hideCTA2}>
                        <a href={"/patreon/login"} className={"button  _mb10 _mt10"}>{this.state.connectText}</a>
                    </div>

                    <div className={"buttonContainer "+hideCTA3}>
                        <a href={"/connect/google"} className={"button  _mb10 _mt10"}>{this.state.loginText}</a>
                    </div>
                </div>

            </div>
        )

    }
}


const root = document.getElementById('root');
const data =  JSON.parse(root.dataset.preload);

ReactDOM.render(<Patreon data={data} />, root);