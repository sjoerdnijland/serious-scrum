import React from 'react';

class Categories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFilter: false
        }

        this.expandCategories = this.expandCategories.bind(this);
    }

    expandCategories(){
        this.props.functions.toggleCategoryMenu();
    }

    render() {

        let categories = [];

        if (typeof this.props.data !== 'undefined' && this.props.data.length > 0) {
            categories = Object.values(this.props.data).map(function (category) {
                return (<Category key={category.id} data={category} functions={this.functions}/>);
            },{
                functions:this.props.functions,
            });
        }

        let containerClassName = "categories";
        let expandClassName = "collapse _pl20 _pr20";

        if(!this.props.expanded){
            containerClassName += " collapse";
            expandClassName = "expand";
        }else{
            expandClassName = "hidden";
        }

        return (
            <div className={containerClassName}>
                <div className={expandClassName} onClick={this.expandCategories}>
                    <div>show topics</div>
                </div>
                {categories}
            </div>

        );
    }
}
window.Categories = Categories;
