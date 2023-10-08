const Ping = require('../model/ping');

const postPing = async (req, res, next) => {
  console.log(req.query);
  const hostname = req.query.hostname;
  try {
    const result = await Ping.create({ hostname });
    res.status(201).json({ status: 'success', result });
  } catch (err) {
    next(err);
  }
};

module.exports = { postPing };
