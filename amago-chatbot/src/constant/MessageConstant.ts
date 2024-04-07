import { ticketPriorityHandler, ticketResolvedHandler } from "../components/custom_hooks/MessageHelper";
import { IMessageOption, IMessageStep } from "../interfaces/IMessages";

export const USER_GREETINGS_WHITELISTS = ["Hello!", "Hi!", "Hi there!", "Hey!", "Howdy!", "Greetings!", "Good morning!", "Good afternoon!", "Good evening!", "What's up?",  "How's it going?",  "Nice to see you!", "How are you?", "Yo!", "Hiya!", "Salutations!"];
export const REPLY_BOT_GREETING = "Hello, Good Day! How can I assist you today?";
export const BOT_UNABLE_TO_ANSWER_DEFAULT_MESSAGE = "Thank you for your query. Unfortunately, I am unable to provide an answer to this question at the moment. If you have any other inquiries or require assistance on a different topic, please don't hesitate to ask, and I'll be happy to help.";
export const WELCOME_GREETING: string = "Welcome to AMAGO, your ultimate productivity companion! 🚀 Whether you're looking to streamline your workflow, boost your efficiency, or simply organize your tasks, I'm here to help. Let's supercharge your productivity together! How can I assist you today?";

export const MESSAGE_STEPS: Record<string, IMessageStep> = {
    "after_ask_resolver_group_ask_month" : {url:"", message: "For which month you need the ticket data ", nextStep: "", handler: ticketResolvedHandler}
}

export const OPTION_AVAILABLE_CONTEXTS = ["greetings", "reply_greeting_or_unable_to_ans"];

const APPEND_TICKET_MESSAGE_CONTENT = " for a month give me your resolver group name (Note: Enter the resolver group name alone).";
export const MESSAGE_OPTIONS: Record<string, IMessageOption> = {
    "ticket_resolved" : {name: "Tickets Resolved", url:"", message: "For getting the ticket resolved" + APPEND_TICKET_MESSAGE_CONTENT, nextStep: MESSAGE_STEPS["after_ask_resolver_group_ask_month"], handler: ticketResolvedHandler},
    "ticket_priority" : {name: "Get The Ticket Priorities", url:"", message: "For getting the ticket priority" + APPEND_TICKET_MESSAGE_CONTENT, nextStep: null, handler: ticketPriorityHandler}
}

export const MESSAGE_OPTION_SUBJECT: string = "Click on any of the below options to get more details!";