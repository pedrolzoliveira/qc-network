const Match = require('../models/Match');
const User = require('../models/User');
const Team = require('../models/Team');


module.exports = {

    async addTeam(req, res) {
        try {

            const {team1_id, team2_id} = req.body;
            if (!team1_id || !team2_id)
                return res.json({error: 'times não informados!'});

            if (team1_id == team2_id)
                return res.json({error: 'times informados são iguais!'});

            const teams = await Promise.all([Team.findByPk(team1_id), Team.findByPk(team2_id)]);
            if(teams.includes(null))
                return res.json({error: 'um dos times informados não existe!'});
            
            const matches = await Promise.all([Match.addTeam(teams[0]), Match.addTeam(teams[1])]);
            
            return res.json(matches); 
        } catch(err) {
            return res.json({error: err.message});
        }
    },

    async addUser(req, res) {
        try {
            
            const {user1_id, user2_id} = req.body;
            if (!user1_id || !user2_id)
                return res.json({error: 'usuarios não informados!'});

            if (user1_id == user2_id)
                return res.json({error: 'usuarios informados são iguais!'});

            const users = await Promise.all([User.findByPk(user1_id), User.findByPk(user2_id)]);
            if(users.includes(null))
                return res.json({error: 'um dos usuarios informados não existe!'});
            
            const matches = await Promise.all([Match.addUser(users[0]), Match.addUser(users[1])]);
            
            return res.json(matches); 
        } catch(err) {
            return res.json({error: err.message});
        }
    }
};
