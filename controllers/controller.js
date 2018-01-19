exports.whoAmI = (req, res) => {
console.log(req.headers['x-forwarded-for']);
  console.log(req.headers['user-agent']);
  console.log(req.headers['accept-language']);
res.send("Hey");
}