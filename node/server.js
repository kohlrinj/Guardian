var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res){
    if (req.url === "/") {
        fs.readFile("./public/index.html", "UTF-8", function(err, body){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(body);
        });
    }
    else if(req.urlmatch("/sysinfo")) {
        myHostName=os.hostname();
        html=`
        <!DOCTYPE>
        <html>
            <head>
                <title>Node JS Response</title>
            </head>
            <body>
                <p>Hostname: ${myHostName}</p>
                <p>IP: </p>
                <p>Server Uptime: </p>
                <p>Total Memory: </p>
                <p>Free Memory: </p>
                <p>CPUs: </p>
            </body>
        </html>
        `
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
    }
    else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("404 File Not Found");
    }
});

server.listen(3000);
console.log("Server is listening on port 3000");