const Match = require('../models/Match');
const Part = require('../models/Part');

module.exports = {

    async store(req, res) {
        try {
            const { part1_id, part2_id, tournament_id } =  req.body;
            if (!part1_id || !part2_id) return res.json({error: 'Participantes não informados!'});
            
            if (!await Part.findOne({where: {id: part1_id}})) res.json({error: 'Participante 1 não encontrado!'});
            if (!await Part.findOne({where: {id: part2_id}})) res.json({error: 'Participante 2 não encontrado!'});
            
                      
            let match = await Match.create({part1_id, part2_id, tournament_id});
            return res.json({match});
        } catch(err) {
            return res.json({error: err.message});
        }

    },

};