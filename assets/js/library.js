import React from 'react';

class Library extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const ContainerClassName = "library row";
        let articles = "loading articles..."

        if (typeof this.props.articles !== 'undefined' && this.props.articles.length > 0) {
            articles = Object.values(this.props.articles).map(function (article) {

                if(this.active =='curated' && !article.isCurated){
                    return;
                }

                if(article.category != this.category && this.category){
                    return;
                }

                if(this.search){
                    if( (article.title.toLowerCase().indexOf(this.search.toLowerCase()) == -1) && (article.intro.toLowerCase().indexOf(this.search.toLowerCase()) == -1)){
                        return;
                    }
                }

               const key = 'article_'+article.id;

                return (<Article key={key} article={article} categories={this.categories} reviewForm={this.reviewForm} functions={this.functions} roles={this.roles}/>);
            },{
                category: this.props.category,
                categories: this.props.categories,
                functions: this.props.functions,
                roles: this.props.roles,
                active: this.props.active,
                search: this.props.search,
                reviewForm: this.props.reviewForm
            });
        }

        return (
            <div className={ContainerClassName}>
                {articles}
            </div>
        );
    }
}
window.Library = Library;