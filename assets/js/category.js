import React from 'react';

class Category extends React.Component {
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
                return (<SubCategory key={subCategory.id} data={subCategory} functions={this.functions}/>);
            },{
                functions:this.props.functions,
            });
        }

        let categoryClassName = "category _pl20 ";

        return (
            <ul className={categoryClassName}>
                <li id={this.props.data.id} onClick={this.setCategory}>{this.props.data.name}</li>
                {subCategories}
            </ul>
        );
    }
}
window.Category = Category;