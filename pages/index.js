import React, { Component } from 'react';
import Layout from '../components/Layout'
import { nameInputStyles } from './styles';

/**
 * IndexPage component is the index of the application. This is rendered as the index of the application
 * @extends Component
 */
class IndexPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: null
        }
    }

    /**
     * Handle KeyUp
     * @param {Object} e Event object
     */
    handleKeyUp = e => {
        if(e.keyCode === 13){
            const user = e.target.value;
            this.setState({
                user
            })
        }
    }

    render(){
        const { user } = this.state;

        return (
            <Layout pageTitle="RealTime Chat">
                <main className="container-fluid position-absolute h-100 bg-dark">
                    <div className="row position-absolute w-100 h-100">
                        <section className="col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center px-5">
                            <div className="px-5 mx-5">
                                <span className="d-block w-100 h1 text-light" style={{marginTop: -50}}>
                                 {
                                     user ?
                                     (<span>
                                         <span style={{ color: "#999"}}>Hello!</span>{user}
                                     </span>):
                                    "What is your name?"
                                 }
                                </span>
                                {
                                    !user && <input 
                                            type="text" 
                                            className="form-control mt-3 px-3 py-2" 
                                            onKeyUp={this.handleKeyUp} 
                                            autoComplete="off" 
                                            style={nameInputStyles}/>
                                }
                            </div>
                        </section>

                        <section  className="col-md-4 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-white px-0"></section>
                    </div>
                </main>
            </Layout>
        )
    }
}

export default () => {
    <IndexPage/>
}