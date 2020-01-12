const Tournament = require('../models/Tournament');
const MatchController = require('./MatchController');

async function addMatch(req, res) {
    try {
        const {tournament_id, stage, part1_id, part2_id} = req.body;
        const match_req_json = {part1_id, part2_id, tournament_id};
        const match = await MatchController.addMatch(match_req_json);
        return res.json({match});
    } catch(err) {
        return res.json({error: err.message});
    }  
}

async function createTournament(req, res) {
    try {
        //const tournament = Tournament.create({});
    } catch(err) {
        return res.json({error: err.message});
    }
}

module.exports = {
    addMatch,
    createTournament
};