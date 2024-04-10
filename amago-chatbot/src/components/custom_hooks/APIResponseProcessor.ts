import { APIResponseType, IAPIResponseProvider } from "../../interfaces/IHttpRequest";

export function getTicketResolvedResponse(): IAPIResponseProvider{
    // const sample = [{"ttLink": "https://t.corp.amazon.com/b22b2b84-60ec-4e05-8a2c-796d7883f684","shortDescription": "OPF deprecating support for AL2012 by 3/18"},{"ttLink": "https://t.corp.amazon.com/b22b2b84-60ec-4e05-8a2c-796d7883f684","shortDescription": "OPF deprecating support for AL2012 by 3/18"},{"ttLink": "https://t.corp.amazon.com/b954e2fc-6ef0-4c56-a733-dac3839d6083","shortDescription": "AEE_DEX_GLOBAL_CFS_HELP_NODE_ID_DATAPATH_403055: Please clean up your weblab"},{"ttLink": "https://t.corp.amazon.com/ab31f0fb-c145-4340-8541-246a99ff7b2c","shortDescription": "Update your allowed workflows in AST or you will lose permissions to submit translation requests"}];
    let response: string[] = ['Open tickets count: 21', 'Closed ticket on the month (03/2024): 20', 'OverSLA tickets (>30 days): 7'];
    // for (const item of sample){
    //     response.push(`${item.shortDescription} : ${item.ttLink}`);
    // }
    const apiResponse: IAPIResponseProvider = {reponse_type: APIResponseType.string_array, respone: response}
    return apiResponse;
}