import "whatwg-fetch";

const api = "http://localhost:8090";

const headers = {
    Accept: "application/json",
};
export const getAll = () => {
    return fetch(`${api}/products/all`, { headers }).then(res => res.json());
}


export const get = (id) => {
    return fetch(`${api}/products/${id}`, { headers }).then(res => res.json());
}