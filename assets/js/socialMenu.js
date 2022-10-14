import React from 'react';

class SocialMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const containerClassName = "socialMenuContainer social"+this.props.type;

        const slackAlt = "Slack";
        const slackLogo = "slackLogo";
        const slackUrl = '/invite';
        const slackIconSrc = '/images/social/slack-logo.png';

        const mediumAlt = "Medium";
        const mediumLogo = "mediumLogo";
        const mediumUrl = 'https://www.medium.com/serious-scrum';
        const mediumIconSrc = '/images/social/medium-logo.png';

        const twitterAlt = "Twitter";
        const twitterLogo = "twitterLogo";
        const twitterUrl = 'https://twitter.com/SeriousScrum';
        const twitterIconSrc = '/images/social/twitter-logo.png';

        const linkedInAlt = "linkedIn";
        const linkedInLogo = "linkedInLogo";
        const linkedInUrl = 'https://www.linkedin.com/company/18811445';
        const linkedInIconSrc = '/images/social/linkedIn-logo.png';

        const instagramAlt = "Instagram";
        const instagramLogo = "instagramLogo";
        const instagramUrl = 'https://www.instagram.com/seriousscrum/';
        const instagramIconSrc = '/images/social/instagram-logo.png';

        const patreonAlt = "Support us on Patreon";
        const patreonLogo = "patreonLogo";
        const patreonUrl = 'https://www.patreon.com/seriousscrum';
        const patreonIconSrc = '/images/social/patreon-logo.png';

        const meetupAlt = "Meetup!";
        const meetupLogo = "meetupLogo";
        const meetupUrl = 'https://www.meetup.com/nl-NL/Serious-Scrum/';
        const meetupIconSrc = '/images/social/meetup-logo.png';

        const youtubeAlt = "Youtube";
        const youtubeLogo = "youtubeLogo";
        const youtubeUrl = 'https://www.youtube.com/channel/UCJqtVtsuW6mOKykV6jZ_F7g';
        const youtubeIconSrc = '/images/social/youtube-logo.png';



        const sponsorAlt = "Sponsored by Vamp!";
        let sponsorLogo = "sponsorLogo";
        if(this.props.type == "header"){
            sponsorLogo += " hidden";
        }
        const sponsorUrl = 'https://vamp.io/';
        const sponsorIconSrc = '/images/sponsors.png';

        return (
            <div className={containerClassName}>
                <a href={slackUrl} target="_blank" className="socialMenuItem "><img className={slackLogo} src={slackIconSrc} title={slackAlt}/> </a>
                <a href={mediumUrl} target="_blank" className="socialMenuItem "><img className={mediumLogo} src={mediumIconSrc} title={mediumAlt}/> </a>
                <a href={youtubeUrl} target="_blank" className="socialMenuItem "><img className={youtubeLogo} src={youtubeIconSrc} title={youtubeAlt}/> </a>
                <a href={patreonUrl} target="_blank" className="socialMenuItem "><img className={patreonLogo} src={patreonIconSrc} title={patreonAlt}/> </a>
                <a href={meetupUrl} target="_blank" className="socialMenuItem "><img className={meetupLogo} src={meetupIconSrc} title={meetupAlt}/> </a>
                <a href={twitterUrl} target="_blank" className="socialMenuItem "><img className={twitterLogo} src={twitterIconSrc} title={twitterAlt}/> </a>
                <a href={linkedInUrl} target="_blank" className="socialMenuItem "><img className={linkedInLogo} src={linkedInIconSrc} title={linkedInAlt}/> </a>
                <a href={sponsorUrl} target="_blank" className="socialMenuItem "><img className={sponsorLogo} src={sponsorIconSrc} title={sponsorAlt}/> </a>
            </div>
        );
    }
}
window.SocialMenu = SocialMenu;