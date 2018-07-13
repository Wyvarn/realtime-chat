import React, { Component } from 'react';
import { string } from "prop-types";
import { messageBoxStyles, messageStyles } from './styles';

/**
 * ChatMessage component used to render a single Chat message
 * @extends Component
 */
class ChatMessage extends Component {
    render() { 
        const { position, message } = this.props;
        const isRight = position.toLowerCase() === "right";

        const align = isRight ? "text-right" : "text-left";
        const justify = isRight ? "justify-content-end" : "justify-content-start";

        return (  
            <div className={`w-100 my-1 d-flex ${justify}`}>
                <div className="bg-light rounded border border-gray p-2" style={messageBoxStyles}>
                    <span className={`d-block text-secondary ${align}`} style={messageStyles}>
                        {message}
                    </span>
                </div>
            </div>
        );
    }
}

ChatMessage.defaultProps = {
    position: "left"
}

ChatMessage.propTypes = {
    position: string,
    message: string
}
 
export default ChatMessage;