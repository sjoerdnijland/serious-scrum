import React from 'react';

class PageMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.functions.togglePageMenu();
    }

    render() {

        let containerClassName = "pageMenu ";
        
        if(!this.props.expanded){
            containerClassName += "closedPageMenu ";
        }

        let pages = [];

        pages = Object.values(this.props.pages).map(function (page) {
            return (<PageMenuItem key={page.slug} slug={page.slug} active={this.slug} title={page.title}/>);
        },{
            functions: this.props.functions,
            slug: this.props.slug,
        });

        if (pages.length === 0) {
            containerClassName += "hidden";
        }

        return (

            <div className={containerClassName} onClick={this.handleClick}>
                <div className={'toggleMenu'}><img src={this.props.followMeIcon} /></div>
                <div>
                {pages}
                </div>
            </div>

        );
    }
}
window.PageMenu = PageMenu;
