const http = require('http')
const fs = require('fs')
const url = require('url')
const ejs = require('ejs')

/********* htmlの読み込み *********/
// const html = fs.readFileSync('./index.html', 'UTF-8')
// const html404 = fs.readFileSync('./404.html', 'UTF-8')

// console.log('aaa')

// const server = http.createServer((request, response) => {
//   const address = url.parse(request.url)
//   response.writeHead(200, { 'Content-Type': 'text/html' })

//   // ルーティング
//   switch(address.pathname) {
//     case '/':
//       response.write(html)
//       break
//     default:
//       response.write(html404)
//   }

//   console.log('bbbb');

//   response.end()
// })
/*********************************/

/********* ejsの読み込み *********/
const index = fs.readFileSync('./ejs/index.ejs', 'UTF-8');
const sampleBPage = fs.readFileSync('./ejs/sampleB.ejs', 'UTF-8');
const styleCss = fs.readFileSync('./css/style.css', 'UTF-8')

const server = http.createServer((request, response) => {
  const urlPath = url.parse(request.url).pathname;
  let status = null;
  let headers = null;
  let content = null;

  switch (urlPath) {
    case '/css/style.css':
      content = styleCss

      status = 200;
      headers = { 'Content-Type': 'text/css' }
      break;

    case '/':
      content = ejs.render(index, {
        title: 'index',
        content: 'indexページです！'
      });

      status = 200;
      headers = { 'Content-Type': 'text/html' }
      break;

    case '/sampleB':
      content = ejs.render(sampleBPage, {
        title: 'サンプルページB',
        content: 'サンプルページBです！'
      });

      status = 200;
      headers = { 'Content-Type': 'text/html' }
      break;
    default:
      status = 404;
  }
  console.log(urlPath, status, headers);

  if (status !== 404) {
    response.writeHead(status, headers);
    response.write(content)
  }
  response.end();
})
/*********************************/

server.listen(3000)