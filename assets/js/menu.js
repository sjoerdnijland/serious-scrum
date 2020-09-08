import React from 'react';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "menu";

        let categoryName = "";

        let hideMenu = false;

        let menuTitle = " ";

        if(this.props.label){
            hideMenu = true;
            menuTitle = this.props.label.split("-").join(" ");
            menuTitle = menuTitle.charAt(0).toUpperCase() + menuTitle.slice(1);
        }

        if(this.props.category){
            const categories = this.props.categories;
            const categoryId = this.props.category;

            for (var i in categories) {
                if(categories[i].id == categoryId){
                    categoryName = categories[i].name;
                    break;
                }

                for (var j in categories[i].subCategories) {
                    if(categories[i].subCategories[j].id == categoryId) {
                        categoryName = categories[i].subCategories[j].name;
                        break;
                    }
                }
            }
        }



        return (
            <div className={containerClassName}>
                <div className="background"/>
                <div className={"one-half column _pl20"}>
                    <MenuItem functions={this.props.functions} filter="Latest" id="latest" active={this.props.active == "latest"} category={this.props.category} type="default" hide={hideMenu}/>
                    <MenuItem functions={this.props.functions} filter="Curated" id="curated" active={this.props.active == "curated"} category={this.props.category} type="default" hide={hideMenu}/>
                    <MenuItem functions={this.props.functions} filter={categoryName} id="category" active={true} category={this.props.category} type="category" hide={hideMenu}/>
                    <div className="menuTitle">{menuTitle}</div>
                </div>
                <div className="one-half column _pr40">
                    <MenuItem functions={this.props.functions} filter="Road to Mastery" id="mastery" active={this.props.editorial == "mastery"} type="editorial"/>
                    <MenuItem functions={this.props.functions} filter="Editorial" id="editorial" active={this.props.editorial == "editorial"} type="editorial"/>
                </div>
            </div>

        );
    }
}
window.Menu = Menu;