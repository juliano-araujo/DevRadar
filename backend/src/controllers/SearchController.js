const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res){
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);
    const devs = await Dev.find({
      location: { $near : {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      },
      techs: { $in: techsArray }
    });

    return res.json({ devs })
  }
}