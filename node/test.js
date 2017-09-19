var dns = require("dns");

function reverseLookup(ip) {
    dns.reverse(ip, function(err, domains) {
        if(err!=null) callback(err);
        domains.forEach(function(domain) {
            dns.lookup(domain, function(err, address, family){
                console.log(domain);
            })
        })
    })
}

if (process.argv.length <=2) {
    console.log("USAGE: " + __filename + " IPADDR");
    process.exit(-1)
}

var ip = process.argv[2];
console.log(`Argument 3: ${ip}`);
reverseLookup(ip)
