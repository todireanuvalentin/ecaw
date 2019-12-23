const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

export const BASE_URL = "http://localhost:3000";

export const Request = (method, url, data) => {
    if (!ALLOWED_METHODS.includes(method)) {
        console.error("Method not allowed");
        return false;
    }
    
    var options = {
        method,
        body: JSON.stringify(data),
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        json: true
    };
    return fetch(url, options).then(response => response.json());
}