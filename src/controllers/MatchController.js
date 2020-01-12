const Match = require('../models/Match');
const Part = require('../models/Part');
const Tournament = require('../models/Tournament');

async function addMatch(json_request) {
    try {
        const { part1_id, part2_id, tournament_id } =  json_request;
        if (!part1_id || !part2_id) return {error: 'Algum participante não foi informado!'};
        
        if (part1_id == part2_id) return {error: 'Participantes informados são iguais'};
        
        if (tournament_id) if (!await Tournament.findOne({where: {tournament_id: tournament_id}})) return {error: 'Torneio informado não encontrado!'};

        let part1 = await Part.findOne({where: {id: part1_id}});
        if (!part1) return {error: 'Participante 1 não encontrado!'};
        
        let part2 = await Part.findOne({where: {id: part2_id}});
        if (!part2) return {error: 'Participante 1 não encontrado!'};
        
        if (part1.in_player != part2.in_player || part1.in_team != part2.in_team) return {error: 'Tipo dos participantes não coincidem!'};

        let match = await Match.create({part1_id, part2_id, tournament_id});
        return {match};
    } catch(err) {
        return {error: err.message};
    }
}

async function store(req, res) {
    try {
        const { part1_id, part2_id, tournament_id } = req.body;
        const retorno = await addMatch({ part1_id, part2_id, tournament_id });
        return res.json(retorno);
    } catch(err) {
        return res.json({error: err.message});
    }
}

module.exports = {
    addMatch,
    store,
};