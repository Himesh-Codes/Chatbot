import { ICurrentThreadContext } from "./IMessages";

export interface ITicketPriorityorrOpenPayload {
    resolver_group: string;
}

export interface ITicketClosePayload {
    date: string;
    resolver_group: string;
}

export interface IMessageWorkflowDetails {
    workflow_type: ICurrentThreadContext;
    payload: ITicketClosePayload | ITicketPriorityorrOpenPayload;
}

export type WorkFlowData = ITicketClosePayload | ITicketPriorityorrOpenPayload;

export const WorkFlowPayload: Record<string, WorkFlowData> = {
    "ticket_resolved" : {date: "", resolver_group: ""},
    "ticket_open_or_priority" : {resolver_group: ""}
}

export enum APIResponseType {
   string_array = "string_array",
   string = "string"
}

export interface IAPIResponseProvider {
    reponse_type: APIResponseType,
    respone: string | string[]
}