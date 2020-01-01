const Part = require('../models/Part');
const Player = require('../models/Player');
const {Team} = require('../models/Team');

module.exports = {
    async store(req, res) {
       try {
            let {part_id, in_team, in_player} = req.body;
            if (!in_team && !in_player) return res.json({error: 'Não informado o tipo do participante!'});
            if (!in_team) in_team = false;
            if (!in_player) in_player = false;
            if (in_team == in_player) return res.json({error: 'Tipo de participante inválido!'});
            if (in_player) if (!await Player.findOne({where: {id: part_id}})) return res.json({error: 'Jogador não cadastrado!'});
            if (in_team) if (!await Team.findOne({where: {id: part_id}})) return res.json({error: 'Time não cadastrado!'});
            if (await Part.findOne({where: {part_id: part_id, in_player: in_player, in_team: in_team}})) return res.json({error: 'Participante já cadastrado!'});
            let part = await Part.create({part_id, in_team, in_player});
            return res.json({part});
       } catch(err) {
           res.json({error: err.message});
       }
    }
};