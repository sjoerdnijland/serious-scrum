import '../css/app.scss';
import '../js/header.js';
import '../js/banner.js';
import '../js/search.js';
import '../js/socialMenu.js';
import '../js/login.js';
import '../js/categoryMenu.js';
import '../js/publishButton.js';
import '../js/submitButton.js';
import '../js/categories.js';
import '../js/category.js';
import '../js/subCategory.js';
import '../js/menu.js';
import '../js/menuItem.js';
import '../js/editorial.js';
import '../js/mastery.js';
import '../js/events.js';
import '../js/library.js';
import '../js/article.js';
import '../js/submitForm.js';
import '../js/reviewForm.js';
import '../js/formInputLink.js';
import '../js/categorySelect.js';
import '../js/reviewSelect.js';
import '../js/reviewButton';
import '../js/tsunami.js';
import '../js/meetup.js';
import '../js/meetup-past.js';
import '../js/channels.js';
import '../js/medium.js';
import '../js/slack.js';
import '../js/scrumbut.js';
import '../js/content.js';
import '../js/whySoSerious.js';
import '../js/editor.js';
import '../js/dod.js';
import '../js/divider.js';
import '../js/build.js';
import '../js/handbook.js';
import '../js/training.js';
import '../js/pages';
import '../js/pageElement';
import '../js/r2m_I';
import '../js/r2m_II';
import '../js/editorialHeader';


import React from 'react';
import ReactDOM from 'react-dom';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Prismic from 'prismic-javascript'
import { Date, Link, RichText } from 'prismic-reactjs'

import 'react-dropdown/style.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            library : this.props.data.library,
            contentPages : this.props.data.contentPages,
            category: false,
            label: this.props.data.label,
            search: false,
            active: 'latest',
            editorial: false,
            submitForm: false,
            displayArticleCount: 30,
            reviewForm: false,
            submitResponse: false,
            loadResponse: false,
            pages: this.props.data.pages,
            articles: this.props.data.articles,
            categories: this.props.data.categories,
            labels: [],
            user: this.props.data.user,
            submitData: '',
            submitUrl: '',
            submitCategory: 1,
            reviewCategory: false,
            reviewOption: 'isApproved',
        };

        this.closeMenus = this.closeMenus.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.getArticles = this.getArticles.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.toggleCategoryMenu = this.toggleCategoryMenu.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setLabel = this.setLabel.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.setActive = this.setActive.bind(this);
        this.toggleSubmitForm = this.toggleSubmitForm.bind(this);
        this.toggleReviewForm = this.toggleReviewForm.bind(this);
        this.toggleLibraryPages = this.toggleLibraryPages.bind(this);
        this.submitArticle = this.submitArticle.bind(this);
        this.reviewArticle = this.reviewArticle.bind(this);
        this.setSubmitCategory = this.setSubmitCategory.bind(this);
        this.setReviewCategory = this.setReviewCategory.bind(this);
        this.setReviewOption = this.setReviewOption.bind(this);
        this.setSubmitUrl = this.setSubmitUrl.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    closeMenus(){
        if(this.state.editorial){
            this.setState({
                editorial: false
            })
        }
    }

    scrollToTop(){
        window.scrollTo(0, 0);
    }

    getArticles(){
        const api = "/articles";
        fetch(api, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                this.setState({
                    loadResponse: 'error'
                });
            }else{
                this.setState({
                    loadResponse: 'success'
                });
            }
            return response.json();
        })
        .then(data => {
            this.setState({
                articles: data
            });

        })
        .catch((error) => {
            this.setState({
                loadResponse: 'error'
            });
        });
    }

    getCategories(){
        const api = "/categories";
        fetch(api, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    this.setState({
                        loadResponse: 'error'
                    });
                }else{
                    this.setState({
                        loadResponse: 'success'
                    });
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    categories: data
                });

            })
            .catch((error) => {
                this.setState({
                    loadResponse: 'error'
                });
            });
    }

    toggleCategoryMenu() {
        window.scrollTo(0, 0);
        this.setState({
            expanded: !this.state.expanded
        });
    }

    setCategory(category) {
        this.setState({
            category: category,
            search: false,
            displayArticleCount: 30,
            contentPages: "hidden",
            library: "",
            label: false
        });
    }

    setLabel(label) {
        this.setState({
            label: label,
            search: false
        });
        this.scrollToTop();
    }

    setSearch(value) {
        this.setState({
            category: false,
            active: false,
            search: value,
            displayArticleCount: 30
        });
    }

    toggleSubmitForm() {
        this.setState({
            submitForm: !this.state.submitForm
        });
    }

    toggleReviewForm(articleId) {
        if(this.state.reviewForm == articleId){
            articleId = false;
        }
        this.setState({
            reviewForm: articleId
        });
    }

    setSubmitUrl(submitUrl) {
        this.setState({
            submitUrl: submitUrl
        });
    }

    setSubmitCategory(submitCategory) {
        this.setState({
            submitCategory: submitCategory
        });
    }

    setReviewCategory(reviewCategory) {
        this.setState({
            reviewCategory: reviewCategory
        });
    }

    setReviewOption(reviewOption) {
        this.setState({
            reviewOption: reviewOption
        });
    }

    setActive(active) {
        if(active=="editorial" || active=="mastery" || active=="events"){
            if(this.state.editorial==active){
                active = false;
            }
            this.setState({
                editorial: active
            });
            return;
        }
        this.setState({
            active: active,
            category: false,
            search: false
        });
    }

    toggleLibraryPages(type) {
        if(type == 'contentPages'){
            this.setState({
                contentPages: "",
                library: "hidden",
                category: false
            });
        }else{
            this.setState({
                contentPages: "hidden",
                library: "",
                label: false
            });
        }
    }

    submitArticle(){

        const api = "/article/new";
        const article = {};
        article['url'] =  this.state.submitUrl;
        article['category'] =  this.state.submitCategory;
        if(this.state.user.roles.includes("ROLE_EDITOR") || this.state.user.roles.includes("ROLE_AMBASSADOR") || this.state.user.roles.includes("ROLE_ADMIN")){
            article['option'] =  this.state.reviewOption;
        }

        const appData = JSON.stringify(article);
        fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: appData
        })
        .then(response => {
            if (!response.ok) {
                this.setState({
                    submitResponse: 'error'
                });
            }else{
                this.setState({
                    submitResponse: 'success'
                });

                this.getArticles();

                setTimeout(function() { //Start the timer
                    this.setState({
                        submitForm: false,
                        submitResponse: false,
                        submitData: '',
                        submitUrl: '',
                        submitCategory: 1,
                    }) //After 3 second, set render to true
                }.bind(this), 3000)
            }

            return response.json();
        })
        .then(data => {
            this.setState({
                submitData: data
            });

        })
        .catch((error) => {
            this.setState({
                submitResponse: 'error',
                submitData: data
            });
        });
    }

    reviewArticle(articleId){

        const api = "/article/review";
        const article = {};
        article['id'] =  articleId;
        article['category'] =  this.state.reviewCategory;
        article['option'] =  this.state.reviewOption;
        const appData = JSON.stringify(article);
        fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: appData
        })
            .then(response => {
                if (!response.ok) {
                    this.setState({
                        submitResponse: 'error'
                    });
                }else{
                    this.setState({
                        submitResponse: 'success'
                    });
                    this.getArticles();

                    this.setState({
                        reviewForm: false,
                        submitResponse: false,
                        submitData: '',
                        reviewCategory: false,
                        reviewOption: false,
                    })

                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    submitData: data
                });

            })
            .catch((error) => {
                this.setState({
                    submitResponse: 'error',
                    submitData: data
                });
            });
    }

    loadMore(){
        console.log('loading more...');
        this.setState({
            displayArticleCount: this.state.displayArticleCount + 20,
            expanded: false
        });
    }

    render() {

        const functions = {};

        functions['toggleCategoryMenu'] = this.toggleCategoryMenu;
        functions['scrollToTop'] = this.scrollToTop;
        functions['setCategory'] = this.setCategory;
        functions['setLabel'] = this.setLabel;
        functions['setSearch'] = this.setSearch;
        functions['setActive'] = this.setActive;
        functions['toggleSubmitForm'] = this.toggleSubmitForm;
        functions['toggleReviewForm'] = this.toggleReviewForm;
        functions['submitArticle'] = this.submitArticle;
        functions['reviewArticle'] = this.reviewArticle;
        functions['setSubmitUrl'] = this.setSubmitUrl;
        functions['setSubmitCategory'] = this.setSubmitCategory;
        functions['setReviewCategory'] = this.setReviewCategory;
        functions['setReviewOption'] = this.setReviewOption;
        functions['toggleLibraryPages'] = this.toggleLibraryPages;

        const appContainerClassName = "appContainer";

        const bannerText1 = "Community by and for Scrum Practitioners";


        let bannerText2 = "We seriously need your help! please support us on Patreon!";
        if(this.state.user.patreon =="supporter"){
            bannerText2 = "Yes, you're Serious! Thank you for supporting us!";
        }
        const bannerUrl2 = "/patreon";

        return (
            <div className={appContainerClassName} onClick={this.closeMenus}>
                <Header functions={functions} search={this.state.search} expanded={this.state.expanded} user={this.state.user}/>
                <SubmitForm functions={functions} submitUrl={this.state.submitUrl} active={this.state.submitForm} submitResponse={this.state.submitResponse} submitData={this.state.submitData} category={this.state.submitCategory} categories={this.state.categories} roles={this.state.user.roles} form="submit"/>
                <Categories functions={functions} expanded={this.state.expanded} data={this.state.categories}/>
                <Editorial active={this.state.editorial == "editorial"} expanded={this.state.expanded} />
                <Mastery functions={functions} active={this.state.editorial == "mastery"} expanded={this.state.expanded}/>


                <Tsunami label={this.state.label}/>
                <R2MI label={this.state.label}/>
                <R2MII label={this.state.label}/>
                <EditorialHeader label={this.state.label}/>


                <Search functions={functions} value={this.state.search} type="mobile"/>
                <Menu functions={functions} active={this.state.active} editorial={this.state.editorial} category={this.state.category} categories={this.state.categories} label={this.state.label} />
                <Pages contentPages={this.state.pages} visible={this.state.contentPages} functions={functions} active={this.state.active} label={this.state.label} search={this.state.search} roles={this.state.user.roles}/>
                <Library articles={this.state.articles} visible={this.state.library} displayArticleCount={this.state.displayArticleCount} functions={functions} active={this.state.active} category={this.state.category} categories={this.state.categories} search={this.state.search} reviewForm={this.state.reviewForm} roles={this.state.user.roles}/>
                <SocialMenu type="footer"/>
                <Channels/>
                <Banner bannerText={bannerText2} url={bannerUrl2}/>
                <Build/>
                <BottomScrollListener onBottom={this.loadMore} offset={450} debounce={200} />
            </div>
        )
    }
}


const root = document.getElementById('root');
const data =  JSON.parse(root.dataset.preload);

ReactDOM.render(<App data={data} />, root);
/*<Banner bannerText={bannerText1}/>*/
/*
                */