const Match = require('../models/Match');
const Part = require('../models/Part');
const Tournament = require('../models/Tournament');

module.exports = {

    async store(req, res) {
        try {
            const { part1_id, part2_id, tournament_id } =  req.body;
            if (!part1_id || !part2_id) return res.json({error: 'Algum participante não foi informado!'});
            
            if (part1_id == part2_id) return res.json({error: 'Participantes informados são iguais'});
            
            if (tournament_id) if (!await Tournament.findOne({where: {tournament_id: tournament_id}})) return res.json({error: 'Torneio informado não encontrado!'});

            let part1 = await Part.findOne({where: {id: part1_id}});
            if (!part1) res.json({error: 'Participante 1 não encontrado!'});
            
            let part2 = await Part.findOne({where: {id: part2_id}});
            if (!part2) res.json({error: 'Participante 1 não encontrado!'});
            
            if (part1.in_player != part2.in_player || part1.in_team != part2.in_team) return res.json({error: 'Tipo dos participantes não coincidem!'});

            res.json({error: 'Participante 1 não encontrado!'});
            if (!await Part.findOne({where: {id: part2_id}})) res.json({error: 'Participante 2 não encontrado!'});
            
            let match = await Match.create({part1_id, part2_id, tournament_id});
            return res.json({match});
        } catch(err) {
            return res.json({error: err.message});
        }

    },

};