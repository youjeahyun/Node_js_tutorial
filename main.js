//var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();

app.get('/', function (request, response) {
  app.use(express.static('./data')); //현재경로

  var _url = request.url;
  var title = request.query.id;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname; //없는 경로에 접근했을때 예외처리

  fs.readFile(`data/${title}`, 'utf8', function(err, description){
    fs.readFile(`data/${queryData.id}`,'utf8',function(err, description){

      if(_url == '/'){
        title = 'Welcome';
        description = fs.readFileSync(`data/index`,'utf-8');
      }else {
        var description = description;
      }

      var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      response.writeHead(200);
      response.end(template);
    } );

  });

});
//없는 경로로 접근할때 예외처리
app.get('*', function (request, response) {
  response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
  response.end('잘못된 접근입니다.');

});

app.listen(3000);