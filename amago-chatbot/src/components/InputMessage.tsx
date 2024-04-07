import {useRef } from "react";
import "../App.css";
import { IMessageBumping } from "../interfaces/IMessages";
import { INPUT_MESSAGE_PLACEHOLDER } from "../constant/AppConstant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";

export default function InputField(inputProps: IMessageBumping): React.JSX.Element{
    const inputFieldActive = useRef<HTMLInputElement>(null);

    return(
        <div className="chat-inputbox d-flex absolute-bottom">
            <form className="formContainer" onSubmit={(event)=> HandleSubmit(inputProps, event, inputFieldActive)}>
                <div className="add-message">
                    <input ref={inputFieldActive} type="text" placeholder={INPUT_MESSAGE_PLACEHOLDER} value={inputProps.content} onChange={(event)=> inputProps.setMessageContent(event.target.value)} className="inputField"/>
                    <FontAwesomeIcon className="add-message-btn" icon={far.faPaperPlane}/>
               </div>
            </form>
        </div>
    );
}

function HandleSubmit(inputProps: IMessageBumping, event: React.FormEvent, inputFieldActive: React.RefObject<HTMLInputElement>){
    inputProps.addMessages(event);
    inputFieldActive.current?.blur();
}