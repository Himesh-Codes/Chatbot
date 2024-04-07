import { MESSAGE_OPTIONS } from "../../constant/MessageConstant";
import { AddMesageProp, IMessageActions, IMessages, IMessagesContextListProp, IProcessInputResponse } from "../../interfaces/IMessages";
import { processInputMessage } from "./InputMessageProcessor";

export async function MessageAdd(event: React.FormEvent | null, content: string, messagesContext: IMessagesContextListProp, isBot?: boolean, messageType?:string, isLoading?: boolean){
    // prevent the page refresh
    if(event) event.preventDefault();

    if (content) {
        const message: IMessages = {
            content: content,
            isBot: isBot ? true : false,
            id: `${Date.now()}-${isBot ? 'bot' : 'user'}`,
            messageType: messageType ? messageType : ""
        }
        //useReducer dispatch usage replacing state
        const addProp: AddMesageProp = {
            message: message,
        }
        const actionProp: IMessageActions = {
            type: isBot ? 'respond' : 'send',
            operation: addProp,
            messageContext: messagesContext
        }
        // async call to update state
        messagesContext.dispatchMessageAction(actionProp);
        if (!isBot){
            const processResponse: IProcessInputResponse = await processInputMessage(message);
            messagesContext.setCurrentThreadContext(processResponse.context);
            await MessageAdd(null , processResponse.message, messagesContext, true, processResponse.context.type);
        }
    }
}

export async function ticketResolvedHandler(content: string, messagesContext: IMessagesContextListProp, event?: React.FormEvent){
        messagesContext.setCurrentThreadContext({type: "ticket_resolved"});
        await MessageAdd(event ? event : null ,content, messagesContext, true);
        // call to URL using axios here
            // HttpHelper.axios('post', payload, url);
        // check next step is defined or not in MESSAGE_OPTIONS
            // if(MESSAGE_OPTIONS[messagesContext.currentThreadContext.type].nextStep){}
}

export async function ticketPriorityHandler(content: string, messagesContext: IMessagesContextListProp, event?: React.FormEvent){
        messagesContext.setCurrentThreadContext({type: "ticket_priority"});
        await MessageAdd(event ? event : null ,content, messagesContext, true);
        // call to URL using axios here
            // HttpHelper.axios('post', payload, url);
        // check next step is defined or not in MESSAGE_OPTIONS
            // if(MESSAGE_OPTIONS[messagesContext.currentThreadContext.type].nextStep){}
}