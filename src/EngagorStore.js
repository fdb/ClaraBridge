const ACCESS_TOKEN = 'e88f6c1657533d781c62bd619acb77c1';

export default class EngagorStore {

    static async _wrappedRequest(url) {
        const wrappedUrl = `https://cors.io?${url}`;
        const res = await fetch(wrappedUrl);
        const json = await res.json();
        return json;
    }

    static _encodeParams(params) {
        return Object.entries(params).map(([k, v]) => `${k}=${encodeURI(v)}`).join('&');
      }

      static _checkResponse(response) {
          if (response.meta.code !== 200) {
              throw new Error('Invalid response:' + response);
          }
      }

    static async getCannedResponses() {
        const url = `https://api.engagor.com/17966/settings/canned_responses/?access_token=${ACCESS_TOKEN}`;
        const response = await this._wrappedRequest(url);
        this._checkResponse(response);
        return response.response.data;
    }

    static async getSentiment(text) {
        const params = {
            access_token: ACCESS_TOKEN,
            language: 'en',
            string: Array.isArray(text) ? JSON.stringify(text) : text
        }
        const url = `https://api.engagor.com/tools/sentiment/?${this._encodeParams(params)}`;
        const response = await this._wrappedRequest(url);
        this._checkResponse(response);
        return response.response;
    }

}