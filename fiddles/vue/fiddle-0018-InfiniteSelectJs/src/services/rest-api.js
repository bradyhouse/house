export default class RestApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl
  }

  async getPage(req) {
    return await this._post(`${this.apiUrl}/api/v1/pages`, req)
  }

  async _post(url, body, requestId = null) {
    const headers = this._defaultHeaders()
    headers['Content-Type'] = 'application/json'
    if (requestId) {
      headers['Request-Id'] = requestId
    }

    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(body)
    }).then((r) => r.json())
  }

  _defaultHeaders() {
    const accessToken = localStorage.getItem('id_token')
    if (accessToken) {
      return { Authorization: `Bearer ${accessToken}` }
    } else {
      return {}
    }
  }
}
