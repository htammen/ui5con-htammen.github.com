const	express = require('express'),
		port = process.argv[2] || 8080,
		app = express();

app.use('/webapp', express.static('webapp'));
app.get('/', function(req, res){
	res.redirect('/webapp/index.html');;
});

app.listen(port, function () {
  console.log(`app listening on port ${port}`);
});
