const CalculateNoodleTimeService = require('../services/CalculateNoodleTimeService');

class NoodleController {
  async store(req, res) {
    const { noodleTimeTotal, hourglassTimeA, hourglassTimeB } = req.body;

    if (noodleTimeTotal >= hourglassTimeA || noodleTimeTotal >= hourglassTimeB) {
      return res.status(400).json({ error: 'The preparation time of noodles cannot be longer than hourglasses.' });
    }

    const response = CalculateNoodleTimeService(noodleTimeTotal, hourglassTimeA, hourglassTimeB)

    if (response) {
      return res.status(200).json(response);
    }

    return res.status(400).json({ error: 'Unable to calculate time' });
  }
}

module.exports = new NoodleController();