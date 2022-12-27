import React from 'react';

class Pages extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        const ContainerClassName = this.props.visible+" library row ";

        console.log('count '+this.props.displayArticleCount);

        let pageNodes = "loading pages...";

        if (typeof this.props.contentPages !== 'undefined' && this.props.contentPages.length > 0) {

           let contentPages =  JSON.parse(JSON.stringify(this.props.contentPages));

            contentPages.forEach(function(page, index) {


                let labelMatch = false;
                for (var i = 0; i < page.labels.length + 1; i++) {
                    if (page.labels[i] == this.label ) {
                        labelMatch = true;
                        break;
                    }
                }

                if(!labelMatch && this.label){
                    contentPages[index] = [];
                }

               if(this.search){
                   if( (page.title.toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) == -1) &&
                       (page.intro.toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) == -1) &&
                       (page.author.toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) == -1)
                   ){
                       console.log(index);
                       contentPages[index] = [];
                   }
               }

            },{
               label: this.props.label,
               functions: this.props.functions,
               roles: this.props.roles,
               active: this.props.active,
               search: this.props.search
           });

            let filtered = contentPages.filter(function (el) {
                return typeof el.id != 'undefined';
            });

            pageNodes = Object.values(filtered).slice(0, this.props.displayArticleCount).map(function (page) {
                if(page.id) {
                    const key = 'page_' + page.id;

                    return (
                        <PageElement key={key} page={page} labels={this.labels}
                                 functions={this.functions} roles={this.roles}/>);
                }
            },{
                label: this.props.label,
                labels: this.props.categories,
                functions: this.props.functions,
                roles: this.props.roles,
                active: this.props.active,
                search: this.props.search
            });
        }



        return (
            <div className={ContainerClassName} >
                {pageNodes}
            </div>
        );
    }
}
window.Pages = Pages;