import React from 'react';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.searchAuthor = this.searchAuthor.bind(this);

    }

    searchAuthor(){
        this.props.functions.setSearch(this.props.article.author);
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

        if(this.props.reviewForm == this.props.article.id){
            showForm = true;
        }

        let thumbnail = "/images/thumbnail_placeholder.png";

        if(typeof this.props.article.thumbnail !== 'undefined') {
            if (this.props.article.thumbnail != "" ) {
                thumbnail = this.props.article.thumbnail;
            }
        }

        let show = "";

        if(!this.props.article.isApproved){
            reviewClassName = ""
        }

        if(this.props.article.isCurated){
            className += " curated";
            curated = "highlighted by our editorial";
            curatedClassName = "curatedText";
        }

        const avatar = "/images/avatar_placeholder.png";
        const rank = "/images/rank/founder.png";


        if( thumbnail !== null && thumbnail != "") {
            if (!thumbnail.includes('http')) {
                thumbnail = '/' + thumbnail;
            }
        }


        return (

            <div className={className}>
                <div className={reviewClassName}>
                    <ReviewButton key={'reviewButton'+this.props.article.id} articleId={this.props.article.id} functions={this.props.functions} category={this.props.article.category}/>
                </div>
                <ReviewForm key={'reviewForm'+this.props.article.id}  functions={this.props.functions} active={showForm} article={this.props.article.id} category={this.props.article.category} categories={this.props.categories} roles={this.props.roles} form="review"/>
                <a href={this.props.article.url} target="_blank">

                    <div className={thumbnailClassName}
                        style={{
                            backgroundImage: "url(" + thumbnail + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}/>
                    <div className={titleClassName}>
                        {this.props.article.title}
                    </div>
                    <div className={introClassName}>
                        {this.props.article.intro}
                    </div>
                </a>
                    <div className={authorClassName}>
                        <div className={authorNameClassName} onClick={this.searchAuthor}>
                            <a href="#library">{this.props.article.author}</a>
                        </div>
                    </div>
                    <div className={curatedClassName}>
                        {curated}
                    </div>


            </div>
        );
    }
}
window.Article = Article;
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
