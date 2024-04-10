class WorkFlowBuilder {
    private static workFlowProvider: WorkFlowProvider | null = null;
    private workFlows: string[] = [];

    private constructor() {
        WorkFlowProvider.workFlowProvider = new WorkFlowProvider();
        this.workFlows = ["sdds"];
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