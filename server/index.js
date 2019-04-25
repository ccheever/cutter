let path = require('path');

let express = require('express');

let app = express();
let port = 3000;

app.use('/', express.static(path.join(__dirname, '../')));
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
