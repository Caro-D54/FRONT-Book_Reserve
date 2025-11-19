const API_BASE = "http://localhost:8000/api";

function getToken() {
    return localStorage.getItem("access_token");
}

async function request(path, { method = "GET", body, params, headers = {}} = {}) {
    const url = new URL(API_BASE + path);
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    const token = getToken();
    const init = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
    };
    if (body) init.body = JSON.stringify(body);
    const res = await fetch(url.toString(), init);
    if (!res.ok) {
        const text = await res.text();
        const err = new Error(text || res.statusText);
        err.status = res.status;
        throw err;
    }
    if (res.status === 204) return null;
    return res.json();
}

export const apiAdmin = {
    listRequests: (params) => request("/requests/", { params }),
    updateRequest: (id, patch) => request(`/requests/${id}/`, { method: "PATCH", body: patch }),

    listBooks: (params) => request("/books/", { params }),
    createBook: (payload) => request("/books/", { method: "POST", body: payload }),
    updateBook: (id, payload) => request(`/books/${id}/`, { method: "PATCH", body: payload }),
    deleteBook: (id) => request(`/books/${id}/`, { method: "DELETE" }),

    listBranches: (params) => request("/branches/", { params }),
};