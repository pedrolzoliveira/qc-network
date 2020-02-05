const Tournament = require('../models/Tournament');
const Match = require('../models/Match');
const sequelize = require('sequelize');

async function addFirstMatch(req, res) {
    const t = await sequelize.Transaction();
    try {
        const {tournament_id, stage, part1_id, part2_id} = req.body;
        const match = await Match.create({
            tournament_id, 
            stage, 
            part1_id, 
            part2_id
        }, {transaction: t});

        const tournament = await Tournament.create({
            tournament_id, 
            stage, match_id: match.id
        }, {transaction: t});

        await match.update({
            tournament_id: tournament_id
        }, {transaction: t});

        t.commit();

        return res.json({tournament});
    } catch(err) {
        t.rollback();
        return res.json({error: err.message});
    }  
}

async function addMatch(req, res) {
    const t = await sequelize.Transaction();
    try {
        const {tournament_id, stage, part1_id, part2_id} = req.body;
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
    const t = await sequelize.Transaction();
    try {
        const {part1_id, part2_id, tournament_id, stage} = req.body;

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

module.exports = {
    addFirstMatch,
    addMatch,
    createTournament
};