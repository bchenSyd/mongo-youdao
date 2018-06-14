let connection_str = process.env.MONGODB_URI;
// ssh -vnNT -L 9000:ds131512.mlab.com:31512 52.243.82.117
connection_str = connection_str || require("./config.json").url;

module.exports = {
  connection_str
};
