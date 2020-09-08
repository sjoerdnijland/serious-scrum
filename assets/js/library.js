import React from 'react';

class Library extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        const ContainerClassName = this.props.visible+" library row ";

        let articleNodes = "loading articles...";

        if (typeof this.props.articles !== 'undefined' && this.props.articles.length > 0) {

           let articles =  JSON.parse(JSON.stringify(this.props.articles));

           articles.forEach(function(article, index) {

               if(this.active =='curated' && !article.isCurated){
                   console.log(articles[index].isCurated);
                   articles[index] = [];
               }

               if(article.category != this.category && this.category){
                   articles[index] = [];
               }

               if(this.search){
                   if( (article.title.toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) == -1) && (article.intro.toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) == -1)){
                       console.log(index);
                       articles[index] = [];
                   }
               }
            },{
               category: this.props.category,
               categories: this.props.categories,
               functions: this.props.functions,
               roles: this.props.roles,
               active: this.props.active,
               search: this.props.search,
               reviewForm: this.props.reviewForm,
           });

            let filtered = articles.filter(function (el) {
                return typeof el.id != 'undefined';
            });

            articleNodes = Object.values(filtered).slice(0, this.props.displayArticleCount).map(function (article) {
                if(article.id) {
                    const key = 'article_' + article.id;

                    return (
                        <Article key={key} article={article} categories={this.categories} reviewForm={this.reviewForm}
                                 functions={this.functions} roles={this.roles}/>);
                }
            },{
                category: this.props.category,
                categories: this.props.categories,
                functions: this.props.functions,
                roles: this.props.roles,
                active: this.props.active,
                search: this.props.search,
                reviewForm: this.props.reviewForm,
            });
        }



        return (
            <div className={ContainerClassName}>
                {articleNodes}
            </div>
        );
    }
}
window.Library = Library;