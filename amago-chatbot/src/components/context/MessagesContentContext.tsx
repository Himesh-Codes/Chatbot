import { ReactNode, createContext, useContext, useReducer, useState } from "react";
import { ICurrentThreadContext, IMessagesContextListProp } from "../../interfaces/IMessages";
import { MessageOperationHandler } from "../reducer/MessageOperationHandler";
import { WORKFLOW_STEPS } from "../../constant/MessageConstant";
import { WorkFlowData } from "../../interfaces/IHttpRequest";

// Context to make MessageOperationHandler reducer available on all included components
export const MessagesContentContext = createContext<IMessagesContextListProp | undefined>(undefined);

export function useMessagesContext(){
    const messagesContext: IMessagesContextListProp | undefined = useContext(MessagesContentContext);
    if(messagesContext === undefined){
        throw new Error("UseTaskContext need to be used with initiliaze a value in context wrapper provider.");
    }

    return messagesContext;
}

// Context provider component
export const MessagesContentContextProvider = ({ children }: { children: ReactNode }) => {
    const [messages, dispatchMessageAction] = useReducer(MessageOperationHandler, []);
    const [apiLoading, setApiLoading] =  useState<boolean>(false);
    const [isWelcomeGreetingDone, setWelcomeGreetingDone] =  useState<boolean>(false);
    const [currentThreadContext, setCurrentThreadContext] = useState<ICurrentThreadContext>({type: "other"});
    const [currentWorkflowStep, setCurrentWorkflowStep] = useState<WORKFLOW_STEPS | null>(null);
    const [workflowPayload, setWorkflowPayload] = useState<WorkFlowData | null>(null);

    const messagesContextList: IMessagesContextListProp = {messages, dispatchMessageAction, apiLoading, setApiLoading, currentThreadContext, setCurrentThreadContext, isWelcomeGreetingDone, setWelcomeGreetingDone, currentWorkflowStep, setCurrentWorkflowStep, workflowPayload, setWorkflowPayload};

    return (
        <MessagesContentContext.Provider value={messagesContextList}>
        {children}
        </MessagesContentContext.Provider>
    );
};