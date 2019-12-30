const Match = require('../models/Match');

module.exports = {

    async store(req, res) {
        try {
            const { part1_id, part2_id, tournament_id } =  req.body;
            let match = await Match.create({part1_id, part2_id, tournament_id});
            return res.json({match});
        } catch(err) {
            return res.json({error: err.message});
        }

    },

};