import { useRef } from "react";
import "../App.css";
import { IMessagesContextListProp } from "../interfaces/IMessages";
import MessageTile from "./MessageTile";
import { useMessagesContext } from "./context/MessagesContentContext";

export default function Message() : React.JSX.Element{
    const messageContentContext: IMessagesContextListProp = useMessagesContext();
    const messageContentRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        const divElement = messageContentRef.current;
        if (divElement) {
            divElement.scrollTop = divElement.scrollHeight;
        }
    };

    const messageListDom: JSX.Element[] = messageContentContext.messages.map(message => <MessageTile  key={message.id} messages={message} scroll ={scrollToBottom}/>);


    return (
        <div className="message-content d-flex flex-column align-self-start" ref={messageContentRef}>
            {messageListDom}
        </div>
    );
}