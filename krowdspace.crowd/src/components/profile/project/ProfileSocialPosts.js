import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { core } from 'resources/js/krowdspace.core';


export class ProfileSocialPosts extends Component {
    state = {
        facebook_link: '',
        instagram_link: '',
    }
    handleOnInput = e => {
        // let { project } = this.state;
        // project.retail_url = e.target.value;
        // this.setState({project, valid: false}, () => this.isValid())
    }
    handleSubmit = () => {

    }
    handle
    componentDidMount(){
        //this.setInitialChart();
    }
    componentDidUpdate(){
        // const { metrics } = this.props;
        // const { data } = this.state;
        // if(JSON.stringify(metrics) !== JSON.stringify(data)){
        //     this.setInitialChart();
        // }
    }
    render() {
        return (
          <React.Fragment>
            <div className="profile-project-header-wrapper">
              <h2 className="profile-project-title">Krowdspace Social Media</h2>
              <h2 className="profile-project-title"></h2>
            </div>
            <div className="profile-chart-wrapper">
                <div className="profile-form-wrapper">
                Post to our Krowdspace social media channels. Coming soon!
                </div>

             </div>
          </React.Fragment>
        )
    }
}