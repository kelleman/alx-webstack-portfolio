export default class Request {
  constructor(endpoint, method, data = {}) {
    this.endpoint = endpoint;
    this.method = method;
    this.data = data;
    // You can initialize any class properties here
  }

  async send() {
    try {
      const requestOptions = {
        method: this.method,
        headers: {
          'Content-Type': 'application/json', // Adjust as needed
        },
      };

      if (this.data) {
        requestOptions.body = JSON.stringify(this.data); // Use 'this' instead of 'data'
      }

      const response = await fetch(this.endpoint, requestOptions); // Use 'this' instead of 'endpoint'
      if (!response.ok) {
        let rez = await response.json();
        rez.ok = false
        return rez
        //throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //console.log(response)
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        let result = await response.json();
        result.ok = true;
        return result
      }
      // Change to response.text() if not JSON
      //console.log('Request successful. Response:', result);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
