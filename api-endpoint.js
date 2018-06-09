var http = require('http');

var server = http.createServer().listen(3001);

server.on('request', function (req, res) {
  if (req.method == 'POST') {
    var body = '';
  }

  let getData = '';

  try {
    http.get('http://nodejs.org/dist/index.json', (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
          `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
          `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          getData = parsedData;
          console.log('DATA');

        } catch (e) {
          console.error(e.message);
        }
      });
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
    });
    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function () {

      console.log('END');

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(getData);
    });
  }
  catch(e) {

  }


});

console.log('Listening on port 3000');