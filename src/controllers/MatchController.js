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

async function ModifyMatch(params) {
    try {
        const promises = [];
        const {id, part1_id, part2_id, tournament_id, winner_id} = params;
        const match = await Match.findOne({where: {id: id}});
        if (!match) return {error: 'Match não encontrada!'};
        if (winner_id && (part1_id || part2_id)) return {error: 'Não é permitido mudar o participante e atualizar o vencedor no mesmo instante'};
        if (part1_id) if (part1_id == match.part1_id || part1_id == match.part2_id) return {error: 'Participante 1 já está na partida!'};
        if (part2_id) if (part2_id == match.part1_id || part2_id == match.part2_id) return {error: 'Participante 2 já está na partida!'};
        if (part1_id == part2_id) return {error: 'Participantes iguais informados'};
        if (part1_id) if (!await Part.findOne({where: {id: part1_id}})) return {error: 'Participante 1 informado não encontrado!'};
        if (part2_id) if (!await Part.findOne({where: {id: part2_id}})) return {error: 'Participante 2 informado não encontrado!'};
        if (tournament_id) if (!await Tournament.findOne({where: {tournament_id: tournament_id}})) return {error: 'Torneio informado não encontrado'};    
        if (winner_id) if (winner_id != match.part1_id && winner_id != match.part2_id) return {error: 'Vencedor não está na partida!'};
        
        if (part1_id) 
            promises.push(match.update({part1_id: part1_id}));
        if (part2_id) 
            promises.push(match.update({part2_id: part2_id}));
        if (tournament_id) 
            promises.push(match.update({tournament_id: tournament_id}));
        if (winner_id) 
            promises.push(match.update({winner_id: winner_id}));
        //return {id: match.id, tournament_id: match.tournament_id, part1_id: match.part1_id, part2_id: match.part2_id, winner_id: match.winner_id};
        //return {match};
        return Promise.all(promises).then(result => {result});
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
    ModifyMatch,
    store
};