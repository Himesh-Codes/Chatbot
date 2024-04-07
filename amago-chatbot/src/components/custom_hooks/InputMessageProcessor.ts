import { BOT_UNABLE_TO_ANSWER_DEFAULT_MESSAGE, REPLY_BOT_GREETING, USER_GREETINGS_WHITELISTS } from "../../constant/MessageConstant";
import { IMessages, IProcessInputResponse } from "../../interfaces/IMessages";
import { intersection } from "./UtilityMethods";

export async function processInputMessage(message: IMessages): Promise<IProcessInputResponse>{
    if(identifyUserGreetings(message.content)){
        return {message: REPLY_BOT_GREETING, context: {type: "reply_greeting_or_unable_to_ans"}};
    } else {
        return {message: BOT_UNABLE_TO_ANSWER_DEFAULT_MESSAGE, context: {type: "reply_greeting_or_unable_to_ans"}};
    }
}

function identifyUserGreetings(content: string): boolean {
    // search for greeting, without exclamations, with exclaimations, with question mark or without question mark.
    if ( USER_GREETINGS_WHITELISTS.includes(content) || (intersection([content+"!", content+"?"], USER_GREETINGS_WHITELISTS).length != 0)) {
        return true
    }
    return false;
}