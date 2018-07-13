/**
 * Chat Component
 */
import React, { Component, Fragment} from 'react'
import { string } from "prop-types";
import axios from "axios";
import Pusher from "pusher-js";
import ChatMessage from './ChatMessage'

/**
 * Chat component
 * @extends Component
 */
class Chat extends Component {

    constructor(props){
        super(props);
        this.state = {
            chats: [],
            error: {}
        }
    }

    /**
     * Handles key up events. This will be used to record chat messages
     * @param {Object} e destructured Event object
     */
    handleKeyUp = ({ target: {value}, shiftKey, keyCode }) => {
        // if the keycode is an enter key and not the shift key
        if (keyCode === 13 && !shiftKey){
            // get the activeUser from the props
            const { activeUser: user } = this.props;
            // create a chat object, with the user, message and timestamp
            const chat = { user, message: value, timeStamp: +new Date };
            // set the value back to an empty string
            value = "";
            
            // create a POST /message request with the chat in the body of the request
            // post the message to the /messages route
            axios.post("/message", chat)
        }
    }

    render(){
        const {activeUser} = this.props;
        const { chats } = this.state;
        return (
            activeUser && 
            <Fragment>
                <div className="border-bottom border-gray w-100 d-flex align-items-center bg-white" style={{ height: 90 }}>
                    <h2 className="text-dark mb-0 mx-4 px-2">{activeUser}</h2>
                </div>

                <div className="px-4 pb-4 w-100 d-flex flex-row flex-wrap align-items-start align-content-start position-relative" style={{ height: 'calc(100% - 180px)', overflowY: 'scroll' }}>
                    {
                        chats.map(({ user, message, timestamp, score}, index) => {

                            const previous = Math.max(0, index - 1);
                            const previousChat = this.state.chats[previous];
                            const position = user === this.props.activeUser ? "right" : "left";
                
                            const isFirst = previous === index;
                            const inSequence = user === previousChat.user;
                            const hasDelay = Math.ceil((timestamp - previousChat.timestamp) / (1000 * 60)) > 1;
                    
                            const mood = score > 0 ? HAPPY_EMOJI : (score === 0 ? NEUTRAL_EMOJI : SAD_EMOJI);
                
                            return (
                                <Fragment key={index}>
                                   { 
                                       (isFirst || !inSequence || hasDelay) && (
                                        <div className={`d-block w-100 font-weight-bold text-dark mt-4 pb-1 px-1 text-${position}`} style={{ fontSize: '0.9rem' }}>
                                            <span className="d-block" style={{ fontSize: '1.6rem' }}>
                                                {String.fromCodePoint(...mood)}
                                            </span>
                                            <span>{user || 'Anonymous'}</span>
                                        </div>
                                    ) }
                                    <ChatMessage message={message} position={position} />
                                </Fragment>
                            )
                        })
                    }
                </div>

                <div className="border-top border-gray w-100 px-4 d-flex align-items-center bg-light" style={{ minHeight: 90 }}>
                    <textarea 
                        className="form-control px-3 py-2" 
                        onKeyUp={this.handleKeyUp} 
                        placeholder="Enter a chat message" 
                        style={{ resize: 'none' }}/>
                </div>
            </Fragment>
        )
    }

    /**
     * When the component mounts, set up a pusher instance and configure with the api key and
     * config, passing in the cluster and the enryption option,
     * This then subscribes to the chat-room channel in the pusher connection
     * 
     * We then bind to the new-message event in the chat-room channel and passing in the callback
     * This will be used to update the chats by appending the chat from the channel the chats array initialized
     * in the state and update the state
     * 
     * We then establish a connection and bind to the connected event, which will then send a POST to the /messages
     * route to update the state
     */
    componentDidMount(){
        this.pusher = new Pusher(process.env.PUSHER_APP_KEY, {
            cluster: process.env.PUSHER_APP_CLUSTER,
            encrypted: true
        });

        // subscribe to a channel 'chat-room'
        this.channel = this.pusher.subscribe("chat-room");

        this.channel.bind("new-message", ({ chat = null}) => {
            const { chats } = this.state;

            chat && chats.push(chat);
            this.setState({ chats })
        })

        this.pusher.connection.bind("connected", () => {
            axios.post("/messages")
                .then(({ 
                    data: {
                        messages
                    }}
                ) => {
                    this.setState({ chats : messages })
                }).catch(error => {
                    this.setState({ error })
                })
        })
    }

    componentWillUnmount(){
        this.pusher.disconnect()
    }
}

Chat.propTypes = {
    activeUser: string,
}

export default Chat;