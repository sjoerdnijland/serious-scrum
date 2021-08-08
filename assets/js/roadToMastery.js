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

class RoadToMastery extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.data.user,
            title: "Welcome to the Road to Mastery",
            introduction: "Join the Train-the-Trainer program!",
            imageUrl: "/../images/roadtomastery-remastered.jpg",
            loginText: "Login!",
            connectText: "Connect with Patreon!",
            becomeText: "Select a membership level!",
            content:
            "<h3>So what can you expect from the Road to Mastery?</h3> " +
            "<ul>"+
            "<li>It's a weekly virtual co-creative 2-hour train-the-trainer for a minimum of 6 months.</li> \n" +
            "<li>For Scrum Trainers, Scrum Masters, Product Owners, Agile Leaders and Agile Coaches.</li>\n" +
            "<li>Practical experience with Scrum is a prerequisite.</li>\n" +
            "<li>It contains over 400 co-creative Miro learning activities and helpful canvasses.</li>\n" +
            "<li>The program is built around:\n" +
                "<ul>"+
                    "<li>Sharon L'. Bowman's 'Training from the BACK of the Room'</li>\n" +
                    "<li>Lyssa Adkins 'Agile Coaching X-Wing'</li>\n" +
                    "<li>Liberating Structures</li>\n" +
                "</ul>"+
            "<li>The journey begins in September. </li>\n" +
            "<li>Exact time and date will be aligned with registrants. Options are: </li>\n" +
                "<ul>"+
                    "<li>Mondays 15:00-17:00 or 20:00-22:00 CEST</li>\n" +
                    "<li>Wednesdays 14:00-16:00 CEST</li>\n" +
                    "<li>Thursdays 11:00-13:00 CEST</li>\n" +
                "</ul>"+
            "\n" +
            "<li>The group size will be ~8-11.</li>\n" +
            "<li>The trial fee is €125 per month per person. Miro account costs are included.</li>\n" +
            "<li>The intake session will be free. From then on it's a monthly subscription. We feel the journey should take a commitment of 6 months.</li>\n" +
            "\n" +
            "</ul>" +
            "\n" +
            "After registering you will be contacted for a 30 minute intake interview. During the intake you will be shown some of the training material and ground we cover. If you choose to opt-out after the intake that's perfectly okay! " +
            "\ <br/><br/>"+
            "<div class='buttonContainer'> <button class='button' id='checkout-button-price_1Iuf8RJrh5dS40VjdrjY6uOf'role='link' type='button' >Get your ticket! </button></div>"+

            "<div id='error-message'></div>"
        };

    }

    componentDidMount(){
        //this.getContent();
    }


    render() {

        const functions = {};

        const appContainerClassName = "appContainer";
        const contentClassName = "pageContent ";

        let content = this.state.content;
        const thumbnail = "/images/roadtomastery-remastered.png";

        return (
            <div className={appContainerClassName}>
                <PageHeader functions={functions} user={this.state.user} />
                <PageTitle title={this.state.title} introduction={this.state.introduction} author={this.props.data.author}/>
                <PageHero url={thumbnail} fill="full"/>

                <div className={contentClassName} >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: content
                        }}></div>

                </div>

            </div>
        )
    }
}


const root = document.getElementById('root');
const data =  JSON.parse(root.dataset.preload);

ReactDOM.render(<RoadToMastery data={data} />, root);