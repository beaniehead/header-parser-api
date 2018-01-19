exports.whoAmI = (req, res) => {
console.dir(req);
res.send(req);
}