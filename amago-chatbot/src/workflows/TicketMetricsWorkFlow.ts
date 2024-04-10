import { TICKET_METRICS_MSG } from "../constant/MessageConstant";
import { IMessagesContextListProp } from "../interfaces/IMessages";
import { IWorkFlow } from "../interfaces/IWorkFlows";

type TicketMetricProp = {content: string, messagesContext: IMessagesContextListProp, event?: React.FormEvent};

class TicketMetrics implements IWorkFlow<TicketMetricProp>{
    name: string = "ticket_metrics"
    message: string = TICKET_METRICS_MSG;

    public handler(handlerProps: TicketMetricProp): void{
        const messageArgs = handlerProps as TicketMetricProp;
        messageArgs.messagesContext.setCurrentThreadContext({type: "ticket_resolved"});
    }
}

export const ticketMetrics: TicketMetrics = new TicketMetrics();