// The task was to handle images and css on a http server, which i solved with the two functions below
// The html pages are dummy pages to see if it works, which it did

const http = require('http')
const fs = require('fs')

const showHTML = (path, response, statusCode) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            response.writeHead(500)
            response.end("Internal Server Error")
        }
        if (path.includes(".css")) {
            console.log("Css works")
            const pageString = data.toString()
            response.writeHead(statusCode, { "Content-Type": "text/css" })
            response.end(pageString)
        } else if (path.includes(".html")) {
            console.log("Html works")
            const dataString = data.toString()
            response.writeHead(statusCode, { "Content-Type": "text/html" })
            response.end(dataString)
        } else if (path.includes("/images")) {
            if (path.includes(".svg")) {
                console.log("SVG in the house")
                response.writeHead(statusCode, { "Content-Type": "image/svg+xml" })
                response.end(data)
            } else if (path.includes(".jpg")) {
                console.log("Jpeg inna hood")
                response.writeHead(statusCode, { "Content-Type": "image/jpeg" })
                response.end(data)
            } else if (path.includes(".png")) {
                console.log("png inna hood")
                response.writeHead(statusCode, { "Content-Type": "image/png" })
                response.end(data)
            }
        }
    })
}

const server = http.createServer((req, res) => {
    console.log(`New request via ${req.url}, Method: ${req.method}`)
    if (req.url.includes("images")) {
        showHTML(`./assets${req.url}`, res, 200)
    } else {
        switch (req.url) {
            case "/":
            case "/home":
                showHTML("./assets/html/home.html", res, 200)
                break;
            case "/about":
                showHTML("./assets/html/about.html", res, 200)
                break;
            case "/howitworks":
                showHTML("./assets/html/howItWorks.html", res, 200)
                break;
            case "/categories":
                showHTML("./assets/html/categories.html", res, 200)
                break;
            case "/testimony":
                showHTML("./assets/html/testimony.html", res, 200)
                break;
            case "/css/style.css":
                showHTML("./assets/css/style.css", res, 200)
                break;
            default:
                showHTML("./assets/html/errorPage.html", res, 404)
                break;
        }
    }


})

const port = 2022
server.listen(port, () => console.log(`Server is listening on port ${port}`))