import { BOT_UNABLE_TO_ANSWER_DEFAULT_MESSAGE, MESSAGE_OPTIONS, REPLY_BOT_GREETING, TICKET_RESOLVED_RESPONSE_SUBJECT, USER_GREETINGS_WHITELISTS, WORKFLOW_STEPS } from "../../constant/MessageConstant";
import { IAPIResponseProvider } from "../../interfaces/IHttpRequest";
import { IMessages, IMessagesContextListProp, IProcessInputResponse } from "../../interfaces/IMessages";
import { getTicketResolvedResponse } from "./APIResponseProcessor";
import { intersection } from "./UtilityMethods";

export async function processInputMessage(message: IMessages, messagesContext: IMessagesContextListProp): Promise<IProcessInputResponse>{
    if(identifyUserGreetings(message.content)){
        return {message: REPLY_BOT_GREETING, context: {type: "reply_greeting_or_unable_to_ans"}};
    } else if (messagesContext.currentThreadContext.type == "ticket_resolved") {
        if (messagesContext.currentWorkflowStep == WORKFLOW_STEPS.ticket_resolved) {
            // check next step is defined or not in MESSAGE_OPTIONS
            const nextStep = MESSAGE_OPTIONS["ticket_resolved"]?.nextStep;
            if(nextStep){
                messagesContext.setCurrentWorkflowStep(WORKFLOW_STEPS.after_ask_resolver_group_ask_month);
                return {message: nextStep.message, context: {type: "ticket_resolved"}, handler: nextStep.handler};
            }
        } else if (messagesContext.currentWorkflowStep == WORKFLOW_STEPS.after_ask_resolver_group_ask_month) {
            // check next step is defined or not in MESSAGE_OPTIONS
            const nextStep = MESSAGE_OPTIONS[WORKFLOW_STEPS.after_ask_resolver_group_ask_month]?.nextStep;
            if(nextStep){
                messagesContext.setCurrentWorkflowStep(null);
                return {message: nextStep.message, context: {type: ""}};
            } else {
                const responseMessage: IAPIResponseProvider = getTicketResolvedResponse();
                return {message: TICKET_RESOLVED_RESPONSE_SUBJECT, context: {type: ""}, apiResponse: responseMessage};
            }
        }
        
        return {message: BOT_UNABLE_TO_ANSWER_DEFAULT_MESSAGE, context: {type: "reply_greeting_or_unable_to_ans"}};
    }
    else {
        return {message: BOT_UNABLE_TO_ANSWER_DEFAULT_MESSAGE, context: {type: "reply_greeting_or_unable_to_ans"}};
    }

}

function identifyUserGreetings(content: string): boolean {
    // search for greeting, without exclamations, with exclaimations, with question mark or without question mark.
    content = content.toUpperCase();
    if ( USER_GREETINGS_WHITELISTS.includes(content) || (intersection([content+"!", content+"?"], USER_GREETINGS_WHITELISTS).length != 0)) {
        return true
    }
    return false;
}