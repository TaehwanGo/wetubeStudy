// ** http server **
const http = require('http')

// const port = process.env.PORT
const port = 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<h1>Hello, World!</h1>')
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})




// ** Perform a GET Request **
const https = require('http')
const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/',
  method: 'GET'
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})
console.log(req);
req.on('error', error => {
  console.error(error)
})

req.end()


