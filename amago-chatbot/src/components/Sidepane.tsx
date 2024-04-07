import { ISidePane } from '../interfaces/ISidepane';
import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import Message from './Message';
import InputField from './InputMessage';
import {IMessageBumping, IMessagesContextListProp } from '../interfaces/IMessages';
import { useEffect, useState } from 'react';
import { MessageAdd } from './custom_hooks/MessageHelper';
import { useMessagesContext } from './context/MessagesContentContext';
import { WELCOME_GREETING } from '../constant/MessageConstant';

export default function Sidepane(sidePaneProps: ISidePane) : React.JSX.Element {
    const [content, setContent] = useState<string>("");
    const messagesContext: IMessagesContextListProp = useMessagesContext();

    // add messages handler
    const addMessages = async (event: React.FormEvent) => {
        messagesContext.setCurrentThreadContext({type: "other"});
        await MessageAdd(event, content, messagesContext);
        // empty the input after add
        setContent("");
    };

    const inputProps: IMessageBumping = {content: content, setMessageContent: setContent, addMessages: addMessages};

    useEffect(() => {
        if(sidePaneProps.isOpen && !messagesContext.isWelcomeGreetingDone){
            messagesContext.setCurrentThreadContext({type: "greetings"});
            MessageAdd(null, WELCOME_GREETING, messagesContext, true, "greetings");
            messagesContext.setWelcomeGreetingDone(true);
        }
    }, [sidePaneProps.isOpen]);

    return (
        <>
            <div className={`side-pane ${sidePaneProps.isOpen ? 'open-pane': ''}`}>
                <div className='close-button-headpane'>
                    <FontAwesomeIcon className='close-button' onClick={(event)=>closePane(sidePaneProps, event)} icon={far.faWindowClose} />
                </div>
                <div className='content d-flex'>
                    <Message/>
                </div>
                <InputField {...inputProps}/>
            </div>
        </>
    );
}

function closePane(sidePaneProps: ISidePane, event:  React.MouseEvent<SVGSVGElement, MouseEvent>){
    event.preventDefault();
    sidePaneProps.open(false);
}