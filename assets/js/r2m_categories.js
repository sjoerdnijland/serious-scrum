import React from 'react';

class R2MCategories extends React.Component {
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
                if(category.isSeries == true && category.name == this.parentCategoryName){
                    return (<R2MCategory key={category.id} data={category} functions={this.functions}/>);
                }
            },{
                functions:this.props.functions,
                parentCategoryName:this.props.parentCategoryName,
            });
        }

        let containerClassName = "r2m_categories";
        let expandClassName = "collapse _pl20 _pr20";

        if(!this.props.expanded){
            containerClassName += " collapse";
            expandClassName = "r2m_expand";
        }else{
            expandClassName = "hidden";
        }

        return (
            <div className={containerClassName}>
                <div className={expandClassName} onClick={this.expandCategories}>
                    <div><img className="categoryMenuSmall" src="/images/r2m_menu_active.png"/>{this.props.parentCategoryName}</div>
                </div>
                {categories}
            </div>

        );
    }
}
window.R2MCategories = R2MCategories;
