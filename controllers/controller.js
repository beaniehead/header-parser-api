const userAgentParser = require("useragent");

exports.whoAmI = (req, res) => {
  const data = req.headers;
  const ipaddress = data['x-forwarded-for'].split(",")[0];
  const userAgent = data['user-agent'];
console.log(userAgentParser.parse(userAgent).toAgent());
  console.log(userAgentParser.parse(userAgent)());
  console.log(userAgentParser.parse(userAgent).os.toString());
  console.log(req.headers['accept-language']);
res.send(ipaddress);
}