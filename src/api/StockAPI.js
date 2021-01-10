import "whatwg-fetch";

const api = "http://localhost:8090";

const headers = {
    Accept: "application/json",
};

export const get = (id) => {
    return fetch(`${api}/stock/products/${id}`, { headers }).then(res => res.json());
}