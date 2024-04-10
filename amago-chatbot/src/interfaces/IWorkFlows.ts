export interface IWorkFlow<T> {
    name: string;
    message: string;
    handler(handlerProps: T): void;
}

export interface IWorkFlowStep<T, S> {
    name: string;
    message: string;
    addMessageWaitForInput(handlerProps: T): void;
    checkConditionToPickNextStep(handlerProps: S): void;
}