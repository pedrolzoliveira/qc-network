const Tournament = require('../models/Tournament');
const Match = require('../models/Match');
const Part = require('../models/Part');
const connection = require('../database/index');

async function addMatch(req, res) {
    const t = await connection.transaction();
    try {
        const {tournament_id, stage, part1_id, part2_id} = req.body;

        if (!tournament_id || !stage || !part1_id || !part2_id)
            return res.json({error: 'informações faltando.'});

        if ((await Promise.all([
            Part.findByPk(part1_id), 
            Part.findByPk(part2_id), 
            Tournament.findOne({
                where: {tournament_id: tournament_id}
            })
        ])).includes(null))  return res.json({error: 'part ou torneio não encontrado.'});

        const match = await Match.create({
            tournament_id,
            stage,
            part1_id, 
            part2_id
        }, {transaction: t});

        const tournament = await Tournament.create({
            tournament_id,
            stage, 
            match_id: match.id
        }, {transaction: t});

        await t.commit();
        return res.json({tournament});
    } catch(err) {
        await t.rollback();
        return res.json({error: err.message});
    }
}

async function createTournament(req, res) {
    const t = await connection.transaction();
    try {
        const {part1_id, part2_id, tournament_id, stage} = req.body;

        if (!stage || !part1_id || !part2_id)
            return res.json({error: 'informações faltando.'});

        if ((await Promise.all([
            Part.findByPk(part1_id), 
            Part.findByPk(part2_id)
        ])).includes(null))  return res.json({error: 'part não encontrado.'});

        let firstMatch = await Match.create({
            part1_id,
            part2_id,
            tournament_id
        }, {transaction: t});

        const tournament = await Tournament.create({
            tournament_id,
            stage,
            match_id : firstMatch.id
        }, {transaction: t});
        await t.commit();
        return res.json({firstMatch, tournament});
    } catch(err) {
        await t.rollback();
        return res.json({error: err.message});
    }
}

async function myTournaments(req, res) {
    try {
        return res.json({'teste': 'testando'});
    } catch(err) {
        return res.json({error: err.message});
    }
}

module.exports = {
    addMatch,
    createTournament,
    myTournaments
};