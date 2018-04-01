import * as axios from 'axios';

let options = {
  baseURL: `${process.env.apiEndpoint}`,
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    return data;
  }],
  responseType: 'json', // default
  responseEncoding: 'utf8' // default

};
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`;
}

export default axios.create(options);
