const userAgentParser = require("buster-user-agent-parser");

exports.whoAmI = (req, res) => {
  const data = req.headers;
  const ipaddress = data['x-forwarded-for'].split(",")[0];
  const userAgent = data['user-agent'];
console.log(req.headers['x-forwarded-for']);
  console.log(req.headers['user-agent']);
  console.log(req.headers['accept-language']);
res.send(ip);
}