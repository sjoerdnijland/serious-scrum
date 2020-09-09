import React from 'react';

class PageElement extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        let className = "article";
        const thumbnailClassName = "thumbnail";
        const titleClassName = "title _pt10";
        const introClassName = "intro";
        const authorClassName = "author _mt10";
        const avatarClassName = "avatar";
        const authorNameClassName = "name";
        const authorRoleClassName = "role";
        const authorRankClassName = "rank";
        let reviewClassName = "hidden";
        let curatedClassName = "hidden";
        let showForm = false;
        let curated = "";

        let thumbnail = "/images/thumbnail_placeholder.png";
        if(typeof this.props.page.thumbnail !== "undefined" ) {
            if (this.props.page.thumbnail != "") {
                thumbnail = this.props.page.thumbnail;
            }
        }

        if( thumbnail !== null && thumbnail != "") {
            if (!thumbnail.includes('http')) {
                thumbnail = '/' + thumbnail;
            }
        }




        let show = "";

        if(!this.props.page.isApproved){
            reviewClassName = ""
        }

        if(this.props.page.isCurated){
            className += " curated";
            curated = "highlighted by our editorial";
            curatedClassName = "curatedText";
        }

        const avatar = "/images/avatar_placeholder.png";
        const rank = "/images/rank/founder.png";


        return (

            <div className={className}>
                <a href={this.props.page.slug} target="_blank">
                    <div className={thumbnailClassName}
                        style={{
                            backgroundImage: "url(" + thumbnail + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}/>
                    <div className={titleClassName}>
                        {this.props.page.title}
                    </div>
                    <div className={introClassName}>
                        {this.props.page.intro}
                    </div>
                    <div className={authorClassName}>
                        <div className={authorNameClassName}>
                            {this.props.page.author}
                        </div>
                    </div>
                </a>

            </div>
        );
    }
}
window.PageElement = PageElement;
/*
 <div className={avatarClassName}>
    <img src={avatar}/>
</div>
<div className={authorRoleClassName}>
    Co-Founder
</div>
<div className={authorRankClassName}>
    <img src={rank}/>
</div>
 */
/**/
