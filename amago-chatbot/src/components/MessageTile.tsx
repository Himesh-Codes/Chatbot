import { useEffect, useRef, useState } from "react";
import ChatBotAvatar from "../../public/static/img/chat-bot-avatar.gif";
import UserAvatar from "../../public/static/img/talk.gif";
import { MESSAGE_OPTIONS, MESSAGE_OPTION_SUBJECT, OPTION_AVAILABLE_CONTEXTS } from "../constant/MessageConstant";
import { IMessageTileProp, IMessages } from "../interfaces/IMessages";
import MessageOption from "./MessageOption";
import { MIN_WORDS_MESSAGE_PER_TWENTY_MS_SPEED } from "../constant/AppConstant";

export default function MessageTile(messageTileProp: IMessageTileProp) : React.JSX.Element {
    const messages: IMessages = messageTileProp.messages;
    const [messageOptionsDom, setMessageOptionsDom] = useState<JSX.Element[]>([]);
    const optionSubjectRef = useRef<HTMLDivElement>(null);
    // slow text typing effect
    const [displayText, setDisplayText] = useState("");
    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
        if (index < messages.content.length) {
            const substring: string = index+MIN_WORDS_MESSAGE_PER_TWENTY_MS_SPEED !== -1 ? messages.content.substring(index, index+MIN_WORDS_MESSAGE_PER_TWENTY_MS_SPEED) : messages.content.substring(index);
            setDisplayText(prevDisplayText => prevDisplayText + substring);
            index += MIN_WORDS_MESSAGE_PER_TWENTY_MS_SPEED;
            messageTileProp.scroll();
        }
        else {
            clearInterval(typingInterval);
            //make the options visble after the load
            if(optionSubjectRef.current?.style.display) optionSubjectRef.current.style.display = "block";
            // add options dom also into the chat
            const optionsDom: JSX.Element[] = Object.entries(MESSAGE_OPTIONS).map(([option, optionProperties]) => (<MessageOption key={option} {...optionProperties} />));
            setMessageOptionsDom(optionsDom);
            setTimeout(()=>{
                messageTileProp.scroll();
            }, 200);   
        }
        }, 20); // Adjust the delay between each character (in milliseconds)

        return () => clearInterval(typingInterval); // Cleanup on unmount
    }, []);

    const messageType = messages.messageType ? messages.messageType : "";

    return (
        <>
        {
             messages.isBot ? ( 
                <div className="message-tile">
                    <div className="p-2">
                        <p className="message-avatar chatbot-avatar"><img src={ChatBotAvatar} alt=""/><b>AMAGO</b></p>
                    </div>
                    <div className="message-content-bot p-2">  
                        {displayText}
                    </div>
                    {
                        OPTION_AVAILABLE_CONTEXTS.includes(messageType) ? (
                            <>
                                <div className="message-option-subject p-2" ref={optionSubjectRef} style={{ display: 'none' }}>
                                    {MESSAGE_OPTION_SUBJECT}
                                </div>
                                <div className="message-option p-2 d-flex">
                                    {messageOptionsDom}
                                </div>
                            </>
                            
                        ) : (
                           <></>
                        )
                    }
                    
                    
                </div>

             ) : (
                <div className="message-tile">
                    <div className="p-2">
                        <p className="message-avatar user-avatar"><b>YOU</b><img src={UserAvatar} alt=""/></p>
                    </div>
                    <div className="message-content-user p-2">  
                        {displayText}
                    </div>
                </div>
             )
        }
        </>
    );
}