import { MESSAGE_OPTIONS, MESSAGE_STEPS, WORKFLOW_STEPS } from "../../constant/MessageConstant";
import { IAPIResponseProvider } from "../../interfaces/IHttpRequest";
import { AddMesageProp, IMessageActions, IMessages, IMessagesContextListProp, IProcessInputResponse } from "../../interfaces/IMessages";
import { processInputMessage } from "./InputMessageProcessor";

export async function MessageAdd(event: React.FormEvent | null, content: string, messagesContext: IMessagesContextListProp, isBot?: boolean, messageType?:string, apiResponse?: IAPIResponseProvider, isLoading?: boolean){
    // prevent the page refresh
    if(event) event.preventDefault();

    if (content) {
        const message: IMessages = {
            content: content,
            apiResponse: apiResponse,
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
            const processResponse: IProcessInputResponse = await processInputMessage(message, messagesContext);
            messagesContext.setCurrentThreadContext(processResponse.context);
            if (["ticket_resolved"].includes(processResponse.context.type) && processResponse.handler) {
                await processResponse.handler(processResponse.message, messagesContext);
            } else if (messagesContext.currentWorkflowStep == WORKFLOW_STEPS.after_ask_resolver_group_ask_month){
                await MessageAdd(null , processResponse.message, messagesContext, true, processResponse.context.type, processResponse.apiResponse);
            }
            else {
                messagesContext.setCurrentWorkflowStep(null);
                await MessageAdd(null , processResponse.message, messagesContext, true, processResponse.context.type);
            }
        }
    }

    return true;
}

export async function ticketResolvedHandler(content: string, messagesContext: IMessagesContextListProp, event?: React.FormEvent){
        messagesContext.setCurrentThreadContext({type: "ticket_resolved"});
        messagesContext.setCurrentWorkflowStep(WORKFLOW_STEPS.ticket_resolved);
        await MessageAdd(event ? event : null ,content, messagesContext, true);
        // call to URL using axios here
            // HttpHelper.axios('post', payload, url);
}
export async function ticketPriorityHandler(content: string, messagesContext: IMessagesContextListProp, event?: React.FormEvent){
        messagesContext.setCurrentThreadContext({type: "ticket_priority"});
        await MessageAdd(event ? event : null ,content, messagesContext, true);
        // call to URL using axios here
            // HttpHelper.axios('post', payload, url);
        // check next step is defined or not in MESSAGE_OPTIONS
            // if(MESSAGE_OPTIONS[messagesContext.currentThreadContext.type].nextStep){}
}

export async function askMonthHandler(content: string, messagesContext: IMessagesContextListProp){
        await MessageAdd(null ,content, messagesContext, true);
         // call to URL using axios here
            // HttpHelper.axios('post', payload, url);
        // check next step is defined or not in MESSAGE_OPTIONS
            // if(MESSAGE_OPTIONS[messagesContext.currentThreadContext.type].nextStep){}
}