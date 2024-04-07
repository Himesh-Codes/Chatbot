import { FormEvent } from "react";

export interface IMessages {
    sender?: string;
    content: string;
    isBot: boolean;
    id?: string;
    messageType?: string;
}

export interface IMessageTileProp{
    messages: IMessages;
    scroll: () => void;
}

export interface AddMesageProp{
    message: IMessages;
}

export interface IMessageActions {
    type: 'send' | 'respond' | 'loading' | 'usertyping';
    operation: AddMesageProp;
    messageContext: IMessagesContextListProp;
}

export interface IMessagesContextListProp{
    messages: IMessages[];
    dispatchMessageAction: React.Dispatch<IMessageActions>;
    apiLoading: boolean;
    setApiLoading: React.Dispatch<React.SetStateAction<boolean>>;
    currentThreadContext: ICurrentThreadContext;
    setCurrentThreadContext: React.Dispatch<React.SetStateAction<ICurrentThreadContext>>;
    isWelcomeGreetingDone: boolean;
    setWelcomeGreetingDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMessageBumping{
    content: string;
    setMessageContent: React.Dispatch<React.SetStateAction<string>>;
    addMessages: (event: FormEvent<Element>) => void;
}

export interface IMessageOption {
    name: string;
    url: string;
    message: string;
    nextStep: IMessageStep | null;
    handler: (content: string, messagesContext: IMessagesContextListProp, event?: FormEvent<Element>) => Promise<void>;
}

export interface IMessageStep {
    url: string;
    message: string;
    nextStep: string;
    handler: (content: string, messagesContext: IMessagesContextListProp, event?: FormEvent<Element>) => void;
}

export interface ICurrentThreadContext {
    type: "ticket_resolved" | "ticket_priority" | "reply_greeting_or_unable_to_ans" | "greetings" | "other";
}

export interface IProcessInputResponse { 
    message: string; 
    context: ICurrentThreadContext;  
}