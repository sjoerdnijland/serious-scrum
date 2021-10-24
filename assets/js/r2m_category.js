import React from 'react';

class R2MCategory extends React.Component {
    constructor(props) {
        super(props);
        this.setCategory = this.setCategory.bind(this);
    }

    setCategory(event){
        let { id } = event.target;
        this.props.functions.setCategory(id);
        this.props.functions.toggleCategoryMenu();
    }

    render() {

        let subCategories = "loading categories..."

        if (typeof this.props.data.subCategories !== 'undefined' && this.props.data.subCategories.length > 0) {
            subCategories = Object.values(this.props.data.subCategories).map(function (subCategory) {
                return (<R2MSubCategory key={subCategory.id} data={subCategory} functions={this.functions}/>);
            },{
                functions:this.props.functions,
            });
        }

        let categoryClassName = "category _pl10 ";

        return (
            <ul className={categoryClassName}>
                {subCategories}
            </ul>
        );
    }
}
window.R2MCategory = R2MCategory;