import '../css/app.scss';
import '../js/r2m_header.js';
import '../js/banner.js';
import '../js/search.js';
import '../js/socialMenu.js';
import '../js/login.js';
import '../js/categoryMenu.js';
import '../js/joinButton.js';
import '../js/submitButton.js';
import '../js/subCategory.js';
import '../js/menu.js';
import '../js/menuItem.js';
import '../js/headerMenuItem.js';
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
import '../js/r2m_basecamp';
import '../js/r2m_tbr';
import '../js/r2m_I';
import '../js/r2m_II';
import '../js/editorialHeader';
import '../js/martyHeader';
import '../js/roadToMastery';
import '../js/r2m_home';
import '../js/r2m_coaching';
import '../js/r2m_selfmanagement';
import '../js/r2m_agile';
import '../js/r2m_definition';
import '../js/r2m_categories';
import '../js/r2m_category';
import '../js/r2m_mobileMenu';
import '../js/r2m_guides';
import '../js/r2m_travelgroups';
import '../js/r2m_guideItem';
import '../js/r2m_travelgroup';
import '../js/r2m_adventure';
import '../js/r2m_join';
import '../js/joinFirstname';
import '../js/joinLastname';
import '../js/joinLinkedIn';
import '../js/joinEmail';
import '../js/joinTerms';
import '../js/joinSubmitButton';
import '../js/travelgroupSelect';
import '../js/r2m_usps';
import '../js/r2m_subCategory';
import '../js/r2m_adventures';
import '../js/r2m_playbook';
import '../js/r2m_format';
import '../js/r2m_testimonials';
import '../js/r2m_testimonial';

import React from 'react';
import ReactDOM from 'react-dom';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Prismic from 'prismic-javascript'
import { Date, Link, RichText } from 'prismic-reactjs'

import 'react-dropdown/style.css';

class R2M extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            library : this.props.data.library,
            contentPages : this.props.data.contentPages,
            category: false,
            label: this.props.data.label,
            module: this.props.data.module,
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
            guides: this.props.data.guides,
            adventures: this.props.data.adventures,
            travelgroups: this.props.data.travelgroups,
            formats: this.props.data.formats,
            testimonials: this.props.data.testimonials,
            labels: [],
            user: this.props.data.user,
            submitData: '',
            submitUrl: '',
            firstname: '',
            lastname: '',
            linkedIn: '',
            email: '',
            terms: false,
            travelgroup: false,
            terms: false,
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
        this.setFirstname = this.setFirstname.bind(this);
        this.setLastname = this.setLastname.bind(this);
        this.setLinkedIn = this.setLinkedIn.bind(this);
        this.setTravelgroup = this.setTravelgroup.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.toggleTerms = this.toggleTerms.bind(this);
        this.join = this.join.bind(this);
        this.joinTravelgroup = this.joinTravelgroup.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.setR2MMenu = this.setR2MMenu.bind(this);

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

    getTravelgroups(){
        const api = "/travelgroups";
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
                    travelgroups: data
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
            label: false,
            module: false,
            expanded: false
        });
    }



    setLabel(label) {
        this.setState({
            label: label,
            search: false,
            contentPages: "",
            expanded: false,
            module: false
        });
        this.scrollToTop();
    }

    setSearch(value) {
        this.setState({
            category: false,
            active: false,
            search: value,
            displayArticleCount: 30,
            expanded: false,
            module: false
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

    setTravelgroup(travelgroup) {
        this.setState({
            travelgroup: travelgroup
        });
    }

    setReviewOption(reviewOption) {
        this.setState({
            reviewOption: reviewOption
        });
    }

    setFirstname(firstname) {
        this.setState({
            firstname: firstname
        });
    }

    setLastname(lastname) {
        this.setState({
            lastname: lastname
        });
    }

    setLinkedIn(linkedIn) {
        this.setState({
            linkedIn: linkedIn
        });
    }

    setEmail(email) {
        this.setState({
            email: email
        });
    }

    toggleTerms() {
        this.setState({
            terms: !this.state.terms
        });
    }

    joinTravelgroup(travelgroup) {
        this.setState({
            travelgroup: travelgroup
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
                        reviewOption: 'isApproved',
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

    join(){

        const api = "/traveler/new";
        const traveler = {};
        traveler['firstname'] =  this.state.firstname;
        traveler['lastname'] =  this.state.lastname;
        traveler['linkedIn'] =  this.state.linkedIn;
        traveler['email'] =  this.state.email;
        traveler['travelgroup'] =  this.state.travelgroup;
        traveler['terms'] =  this.state.terms;


        const appData = JSON.stringify(traveler);
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

                    this.getTravelgroups();

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

    setR2MMenu(target){
        window.location.href='/r2m/'+target;
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
        functions['setFirstname'] = this.setFirstname;
        functions['setLastname'] = this.setLastname;
        functions['setLinkedIn'] = this.setLinkedIn;
        functions['setEmail'] = this.setEmail;
        functions['setTravelgroup'] = this.setTravelgroup;
        functions['toggleTerms'] = this.toggleTerms;
        functions['join'] = this.join;
        functions['joinTravelgroup'] = this.joinTravelgroup;
        functions['toggleLibraryPages'] = this.toggleLibraryPages;
        functions['setR2MMenu'] = this.setR2MMenu;

        const appContainerClassName = "appContainer r2mContainer";

        const bannerText1 = "Community by and for Scrum Practitioners";


        let bannerText2 = "We seriously need your help! please support us on Patreon!";
        if(this.state.user.patreon =="supporter"){
            bannerText2 = "Yes, you're Serious! Thank you for supporting us!";
        }
        const bannerUrl2 = "/patreon";

        return (
            <div className={appContainerClassName} onClick={this.closeMenus}>

                <R2MHeader functions={functions} search={this.state.search} expanded={this.state.expanded} user={this.state.user}/>
                <R2MMobileMenu functions={functions}/>

                <R2MCategories functions={functions} expanded={this.state.expanded} data={this.state.categories} parentCategoryName={'Chapters'}/>


                <R2MHome label={this.state.label} module={this.state.module}/>
                <a name="usps"/>
                <R2MUSPS label={this.state.label}  module={this.state.module}/>
                <a name="guides"/>
                <R2MGuides label={this.state.label} module={this.state.module} guides={this.state.guides}/>
                <a name="travelgroups"/>
                <R2MTravelGroups label={this.state.label} module={this.state.module} functions={functions} user={this.state.user} data={this.state.travelgroups}/>
                <a name="testimonials"/>
                <R2MTestimonials data={this.state.testimonials} label={this.state.label}  module={this.state.module}/>
                <a name="adventures"/>
                <R2MAdventures label={this.state.label} module={this.state.module} functions={functions} user={this.state.user} data={this.state.adventures}/>
                <a name="join"/>
                <R2MJoin functions={functions} label={this.state.label} module={this.state.module} groupId={""} firstname={this.state.firstname} lastname={this.state.lastname} linkedIn={this.state.linkedIn}  email={this.state.email} travelgroups={this.state.travelgroups} travelgroup={this.state.travelgroup} submitResponse={this.state.submitResponse} terms={this.state.terms} submitData={this.state.submitData}/>
                <a name="playbook"/>
                <R2MPlaybook label={this.state.label} module={this.state.module} functions={functions} user={this.state.user} data={this.state.formats}/>

                <R2MBasecamp label={this.state.label} module={this.state.module}/>
                <R2MTBR label={this.state.label} module={this.state.module}/>
                <R2MAgile label={this.state.label} module={this.state.module}/>
                <R2MDefinition label={this.state.label} module={this.state.module}/>
                <R2MCoaching label={this.state.label} module={this.state.module}/>
                <R2MSelfmanagement label={this.state.label} module={this.state.module}/>

                <Pages contentPages={this.state.pages} visible={this.state.contentPages} functions={functions} active={this.state.active} label={this.state.label} search={this.state.search} roles={this.state.user.roles}/>

                <Build/>
                <BottomScrollListener onBottom={this.loadMore} offset={450} debounce={200} />
            </div>
        )
    }
}


const root = document.getElementById('root');
const data =  JSON.parse(root.dataset.preload);

ReactDOM.render(<R2M data={data} />, root);
/*<Banner bannerText={bannerText1}/>
*  <Search functions={functions} value={this.state.search}  type="mobile"/> */
/*

<Pages contentPages={this.state.pages} visible={this.state.contentPages} functions={functions} active={this.state.active} label={this.state.label} search={this.state.search} roles={this.state.user.roles}/>

                <Library articles={this.state.articles} visible={this.state.library} displayArticleCount={this.state.displayArticleCount} functions={functions} active={this.state.active} category={this.state.category} categories={this.state.categories} search={this.state.search} reviewForm={this.state.reviewForm} roles={this.state.user.roles}/>

                */