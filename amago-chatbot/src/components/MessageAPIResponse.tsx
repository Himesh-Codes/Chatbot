import { APIResponseType, IAPIResponseProvider } from "../interfaces/IHttpRequest";

export default function MessageAPIResponse(apiResponse: IAPIResponseProvider) : React.JSX.Element {
    return (
        apiResponse.reponse_type == APIResponseType.string ? (
                <div className="message-api-response">
                    {apiResponse.respone}
                </div>
        ) : (
            <ul className="message-api-response">
                {Array.isArray(apiResponse.respone) && apiResponse.respone.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        )

    );
}