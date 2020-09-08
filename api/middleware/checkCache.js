const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);
// This function checks the cache to see if requested data is in it.
// If it's in the cache,
const checkCache = (req, res, next) => {
  const request = JSON.stringify(req.body);
  console.log('Checking for this request:', request);
  client.get(request, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      console.log('\nData found in Redis Cache!\n');
      res.send(data);
    } else {
      console.log('\n Data not found in Redis Cache!\n');
      next();
    }
  });
};
module.exports = checkCache;
