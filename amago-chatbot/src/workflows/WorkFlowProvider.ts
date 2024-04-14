import { IWorkFlow } from "../interfaces/IWorkFlows";
import { ticketMetrics } from "./TicketMetricsWorkFlow";

class WorkFlowProvider {
    private static workFlowProvider: WorkFlowProvider | null = null;
    private workFlows: IWorkFlow<any>[] = [];

    private constructor() {
        WorkFlowProvider.workFlowProvider = new WorkFlowProvider();
        this.workFlows = [ticketMetrics];
    }

    public static getInstance(){
        if(!WorkFlowProvider.workFlowProvider){
            WorkFlowProvider.workFlowProvider = new WorkFlowProvider();
        }

        return WorkFlowProvider.workFlowProvider;
    }

    public getWorkFlows(){
        return this.workFlows;
    }

}