var http = require("http");
var fs = require("fs");
var os = require("os");




var server = http.createServer(function(req, res){
    if (req.url === "/") {
        fs.readFile("./public/index.html", "UTF-8", function(err, body){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(body);
        });
    }
    else if(req.url.match("/sysinfo")) {
        myHostName=os.hostname();
        //IP Address
        interfaces = os.networkInterfaces();
        ip = [];
        for (var k in interfaces) {
            for (k2 in interfaces[k]) {
                address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    ip.push(address.address);
                }
            }
        }
        //Uptime
        uptime = os.uptime();
        m = Math.floor(uptime / 60);
        s = Math.floor(uptime) % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;
        //Total Memory
        totalMemory = os.totalmem();
        totalMemoryMB = (totalMemory/1048576).toFixed(2);
        //Free Memory
        freeMemory = os.freemem();
        freeMemoryMB = (freeMemory/1048576).toFixed(2);
        //CPU Count
        cpuCount = os.cpus().length;
        //HTML
        html=`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Node JS Response</title>
            </head>
            <body>
                <p>Hostname: ${myHostName}</p>
                <p>IP: ${ip}</p>
                <p>Server Uptime: ${d} Days, ${h} Hours, ${m} Minutes, ${s} Seconds </p>
                <p>Total Memory: ${totalMemoryMB}MB</p>
                <p>Free Memory: ${freeMemoryMB}MB</p>
                <p>CPUs: ${cpuCount}</p>
            </body>
        </html>
        `
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
    }
    else {
        res.writeHead(404, {"Content-Type": "text/text"});
        res.end("404 File Not Found");
    }
});

server.listen(3000);
console.log("Server is listening on port 3000");