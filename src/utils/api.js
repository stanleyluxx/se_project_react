const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getClothingItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export const addClothingItem = ({ name, imageUrl, weather }, token) => {
  const requestHeaders = token
    ? { ...headers, authorization: `Bearer ${token}` }
    : { ...headers };

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

export const deleteClothingItem = (id, token) => {
  const requestHeaders = token
    ? { ...headers, authorization: `Bearer ${token}` }
    : { ...headers };

  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: requestHeaders,
  }).then(handleServerResponse);
};

export const updateUserProfile = ({ name, avatar }, token) => {
  const requestHeaders = token
    ? { ...headers, authorization: `Bearer ${token}` }
    : { ...headers };

  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
};

export const addCardLike = (id, token) => {
  const requestHeaders = token
    ? { ...headers, authorization: `Bearer ${token}` }
    : { ...headers };

  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: requestHeaders,
  }).then(handleServerResponse);
};

export const removeCardLike = (id, token) => {
  const requestHeaders = token
    ? { ...headers, authorization: `Bearer ${token}` }
    : { ...headers };

  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: requestHeaders,
  }).then(handleServerResponse);
};
