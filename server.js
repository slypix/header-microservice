var express = require('express')
var path =  require('path')
var sass = require('node-sass-middleware');
var app = express()

app.set('views', (path.join(__dirname, '/views')))
app.set('view engine', 'jade')
app.use(express.static(__dirname+'/public'))
app.use(sass({
    /* Options */
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));


function buildObj(r) {
  var ip = r.headers['x-forwarded-for'] || r.connection.remoteAddress;
  return({
    "ipaddress" : ip.match(/([0-9]{1,3}\.){3}[0-9]{1,3}/)[0],
    //"ipaddress" : headers["host"].match(/([0-9]{1,3}\.){3}[0-9]{1,3}/)[0],
    "language" : r.headers["accept-language"].match(/[a-z]{2}\-[A-Z]{2}/)[0],
    "software" : r.headers["user-agent"].match(/\(.+?\)/)[0]
  })
}

app.get('/', function(req, res) {
  res.render('index', {
    title: "Header Parser API", 
    repo: "slypix/header-microservice"
  })
})

app.get('/api', function (req, res) {
  var info = buildObj(req)
  res.writeHead(200, { 'content-type': 'application/json' })
  res.write(JSON.stringify(info))
  res.end()
});

app.use(function(req, res, next) {
  //res.status(404).send('Sorry cant find that!');
  res.status(404).render('404')
});

app.listen(process.env.PORT || 3000)