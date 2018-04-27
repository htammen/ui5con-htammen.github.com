const	express = require('express'),
		port = process.argv[2] || 8080,
		app = express();

app.use('/', express.static('.'));
app.get('/', function(req, res){
	res.redirect('/index.html');;
});

app.listen(port, function () {
  console.log(`app listening on port ${port}`);
});
