import { IMessageOption, IMessagesContextListProp } from "../interfaces/IMessages";
import { useMessagesContext } from "./context/MessagesContentContext";

export default function MessageOption(optionProperties: IMessageOption): React.JSX.Element{
    const messagesContext: IMessagesContextListProp = useMessagesContext();

    return (
        <div className="optionContainer" onClick={(event)=>optionClickHandler(event, optionProperties, messagesContext)}>
            <p>{optionProperties.name}</p>
        </div>
    );
}

async function optionClickHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>, optionProperties: IMessageOption, messagesContext: IMessagesContextListProp){
    event.preventDefault();
    await optionProperties.handler(optionProperties.message, messagesContext);
}