const Tournament = require('../models/Tournament');
const Match = require('../models/Match');
const sequelize = require('sequelize');
const Part = require('../models/Part');

async function addMatch(req, res) {
    
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
        });

        const tournament = await Tournament.create({
            tournament_id,
            stage, 
            match_id: match.id
        });

        //await t.commit();
        return res.json({tournament});
    } catch(err) {
        //await t.rollback();
        return res.json({error: err.message});
    }
}

async function createTournament(req, res) {
    //const t = await sequelize.Transaction();
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
        });

        const tournament = await Tournament.create({
            tournament_id,
            stage,
            match_id : firstMatch.id
        });
        
        return res.json({firstMatch, tournament});
    } catch(err) {
        return res.json({error: err.message});
    }
}

module.exports = {
    addMatch,
    createTournament
};