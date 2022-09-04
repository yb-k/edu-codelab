const isAuthorized = function (req, res) {
  console.log("authentication check");
  const token = req.headers["access-token"];
};

module.exports = isAuthorized;
