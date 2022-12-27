import React from 'react';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "menu";

        let categoryName = "";

        let hideLeftMenu = false;
        let hideRightMenu = false;

        let menuTitle = " ";

        if(this.props.label){
            hideLeftMenu = true;
            menuTitle = this.props.label.split("-").join(" ");
            menuTitle = menuTitle.charAt(0).toUpperCase() + menuTitle.slice(1);
            if(this.props.label == 'editorial' || this.props.label == 'Marty'){
                hideRightMenu = true;
            }

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

        let showSearchText = true;
        if(!this.props.search){
            showSearchText = false;
        }



        return (
            <div className={containerClassName}>
                <div className="background"/>
                <div className={"one-half column _pl20"}>

                    <MenuItem functions={this.props.functions} filter={this.props.search} id="search" active={showSearchText} category={this.props.category} type="default" hide={hideLeftMenu}/>

                    <MenuItem functions={this.props.functions} filter="Latest" id="latest" active={this.props.active == "latest"} category={this.props.category} type="default" hide={hideLeftMenu}/>
                    <MenuItem functions={this.props.functions} filter="Curated" id="curated" active={this.props.active == "curated"} category={this.props.category} type="default" hide={hideLeftMenu}/>
                    <MenuItem functions={this.props.functions} filter={categoryName} id="category" active={true} category={this.props.category} type="category" hide={hideLeftMenu}/>
                    <div className="menuTitle">{menuTitle}</div>
                </div>
                <div className="one-half column _pr40">

                </div>
            </div>

        );
    }
}
window.Menu = Menu;

/*
<MenuItem functions={this.props.functions} filter="Road to Mastery" id="mastery" active={this.props.editorial == "mastery"} type="editorial" hide={hideRightMenu}/>

  <MenuItem functions={this.props.functions} filter="Editorial" id="editorial" active={this.props.editorial == "editorial"} type="editorial" hide={hideRightMenu}/>
 */