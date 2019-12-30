const {Team, TeamMembers} = require('../models/Team');

module.exports = {
    
    async store(req, res) {
        try {
            const {player_id, name} = req.body;
            
        } catch(err) {
            res.json({error: err.message});
        }
    },

    async addMember(req, res) {
        try {

        } catch(err) {
            res.json({error: err.message});
        }
    },

    async kickMember(req, res) {
        try {

        } catch(err) {
            res.json({error: err.message});
        }
    }
    
};