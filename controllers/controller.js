const userAgentParser = require("useragent");
const moment = require("moment");
const timezone = require("moment-timezone");
const sat = require("satelize");
exports.whoAmI = (req, res) => {
  const data = req.headers;
  const ipaddress = data['x-forwarded-for'].split(",")[0];
  const userAgent = data['user-agent'];
  const browser = userAgentParser.parse(userAgent).toAgent();
  const operating_system = userAgentParser.parse(userAgent).os.toString();
  const language = req.headers['accept-language'].split(",")[0];
  const software = req.headers['user-agent'].split("(")[1].split(")")[0];
  const zone = sat.satelize({ip: ipaddress}, (err, pl) =>  pl.timezone
  });
  const time = timezone.tz(zone).format("hh:mm:ss");
  const date = timezone.tz(zone).format("ddd, YYYY-MM-DD");
  const parsed = {
    ipaddress,
    date,
    time,
    browser,
    operating_system,
    software,
    language
  }
  res.json(parsed);
}