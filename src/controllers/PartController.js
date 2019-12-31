const Part = require('../models/Part');

module.exports = {
    async store(req, res) {
       try {
            const {part_id, in_team, in_player} = req.body;
            if (!in_team && !in_player) return res.json({error: 'Não informado o tipo do participante!'});
            if (await Part.findOne({where: {part_id: part_id, in_player: in_player, in_team: in_team}})) return res.json({error: 'Participante já cadastrado!'});
            let part = await Part.create({part_id, in_team, in_player});
            return res.json({part});
       } catch(err) {
           res.json({error: err.message});
       }
    }
};