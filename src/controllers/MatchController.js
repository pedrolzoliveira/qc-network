const Match = require('../models/Match');
const Part = require('../models/Part');

async function store(req, res) {
    try {
        const { part1_id, part2_id} =  req.body;
        if (!part1_id || !part2_id) return {error: 'Algum participante não foi informado!'};
        
        if (part1_id == part2_id) return {error: 'Participantes informados são iguais'};

        if ((await Promise.all([Part.findByPk(part1_id), Part.findByPk(part2_id)])).includes(null))
            return res.json({error: 'Algum participante não foi encontrado!'});
            
        if (part1.in_player != part2.in_player || part1.in_team != part2.in_team) return {error: 'Tipo dos participantes não coincidem!'};

        let match = await Match.create({
            part1_id, 
            part2_id, 
            tournament_id
        });
        return res.json({match});
    } catch(err) {
        return res.json({error: err.message});
    }
}


module.exports = {
    store
};