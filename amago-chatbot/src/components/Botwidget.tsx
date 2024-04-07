import "../App.css";
import { ISidePane } from "../interfaces/ISidepane";
import ChatBotIcon from "../../public/static/img/chat-bot.gif";

export default function Botwidget(sidePaneProps: ISidePane) : React.JSX.Element{
    return (
        <div className="floating-widget">
            <img src={ChatBotIcon} alt="" onClick={(event)=>{openPane(sidePaneProps, event)}}/>
            <span className="tooltiptext">Chat with AMAGO !</span>
        </div>
    );
}

function openPane(sidePaneProps: ISidePane, event:  React.MouseEvent<HTMLImageElement, MouseEvent>){
    event.preventDefault();
    sidePaneProps.open(true);
}