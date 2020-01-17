const Tournament = require('../models/Tournament');
const MatchController = require('./MatchController');

async function addFirstMatch(req, res) {
    try {
        const {tournament_id, stage, part1_id, part2_id} = req.body;
        const match_req_json = {part1_id, part2_id, tournament_id};
        const match = await MatchController.addMatch(match_req_json);
        const tournament = await Tournament.create({tournament_id, stage, match_id: match.id});
        await match.update({tournament_id: tournament_id});
        return res.json({tournament});
    } catch(err) {
        return res.json({error: err.message});
    }  
}

async function addMatch(req, res) {
    try {
        const {tournament_id, stage, part1_id, part2_id} = req.body;
        const match = await MatchController.addMatch({tournament_id, stage, part1_id, part2_id});
        const tournament = await Tournament.create({tournament_id, stage, match_id: match.id});
        return res.json({tournament});
    } catch(err) {
        return res.json({error: err.message});
    }
}

async function createTournament(req, res) {
    try {
        const {part1_id, part2_id, tournament_id, stage} = req.body;
        let firstMatch = await MatchController.addMatch({part1_id, part2_id});
        const tournament = Tournament.create({tournament_id, stage, match_id : firstMatch.id});
        firstMatch = await MatchController.ModifyMatch({id : firstMatch.id, tournament_id});
        return res.json({firstMatch});
    } catch(err) {
        return res.json({error: err.message});
    }
}

module.exports = {
    addFirstMatch,
    addMatch,
    createTournament
};