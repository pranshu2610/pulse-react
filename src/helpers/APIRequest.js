const API_ENDPOINT = 'https://08e1a4433d39.ngrok.io'
export class APIRequestHelper {
  static async get(endpoint, params) {
    let init = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    };
    const response = await APIRequestHelper.fetch(endpoint, params, init);
    const json = await response.json();
    if (json.status !== 200) {
      throw new Error("Error in GET");
    }
    return json;
  }

  static async post(endpoint, params) {
    let init = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(params),
      redirect: 'follow'
    };
    const response = await APIRequestHelper.fetch(endpoint, params, init);
    const json = await response.json();

    if (json.status !== 200) {
      throw new Error("Error in POST");
    }
    return json;
  }

  static async fetch(endpoint, params, init) {
    let url = API_ENDPOINT + endpoint;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url += `&${key}=${value}`;
      });
    }
    return await window.fetch(url, init);
  }
}

export default APIRequestHelper;
