import { WELCOME_GREETING } from "../../constant/MessageConstant";
import { AddMesageProp, IMessageActions, IMessages } from "../../interfaces/IMessages";

// this function make copy of state and according to type of action will do some operation of copy state and return it
export function MessageOperationHandler(messages: IMessages[], actions: IMessageActions): IMessages[]{
    if (!actions.messageContext) {
        throw new Error('useSharedState must be used within a SharedStateProvider');
    }

    // decouple with destructuring assignment statement, extract the type property from the action
    const {type} = actions;
    switch (type) {
        case 'send':
            // check user activity is still on else add messages
            return checkWaitAndAddMessage(messages, actions, actions.messageContext?.apiLoading);
        case 'respond':
            // check user activity is still on else add messages
            return checkWaitAndAddMessage(messages, actions, actions.messageContext?.apiLoading);
        case 'loading':
            actions.messageContext.setApiLoading(true);
            break;
        default:
            break;
     }

     return messages;
}

export function GetInitialLoadMessage() : IMessages {
    const messageUid = `${Date.now().toString()}-bot`;
    const loadMessage: IMessages = {content: WELCOME_GREETING, isBot: false, id: messageUid};
    return loadMessage;
}

function checkWaitAndAddMessage(messages: IMessages[], actions: IMessageActions, apiLoading: boolean): IMessages[] {
    const messageType = (actions.operation as AddMesageProp).message.messageType ? (actions.operation as AddMesageProp).message.messageType  : "";
    if (!apiLoading) {
        return [...messages, {id:(actions.operation as AddMesageProp).message.id,content:(actions.operation as AddMesageProp).message.content, isBot: (actions.operation as AddMesageProp).message.isBot, messageType: messageType}];
    }
    return messages;
}