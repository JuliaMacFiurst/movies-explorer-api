const { allowedMethods, allowedCors } = require('../utils/constants');

module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }
  next();
  return null;
});
