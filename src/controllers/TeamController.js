const {Team, TeamMembers} = require('../models/Team');

async function store(req, res) {
    try {
        const {player_id, name} = req.body;
        if (await Team.findOne({where: {player_id: player_id, name: name}})) return res.json({error: 'Usuário já tem um time com este nome'});
        const team = Team.Create({player_id, name});
        const team_members = TeamMembers.Create({player_id, team_id: team.id, in_admin: true});
        return res.json({team, team_members});
    } catch(err) {
        res.json({error: err.message});
    }
}

async function addMember(req, res) {
    try {
        const {player_id, admin_id, team_id, player_in_admin} = req.body;
        if (player_id == admin_id) return res.json({error: 'Administrador e usuário informado é o mesmo'});
        if (!await TeamMembers.findOne({where: {player_id: admin_id, team_id: team_id, in_admin: true}})) return res.json({error: 'Usuário não é administrador.'});
        if (await TeamMembers.findOne({where: {player_id: player_id, team_id: team_id}})) return res.json({error: 'Usuário já esta no time'});
        const team_member = TeamMembers.Create({player_id: player_id, team_id: team_id, in_admin: player_in_admin});
        return res.json(team_member);
    } catch(err) {
        res.json({error: err.message});
    }
}

async function kickMember(req, res) {
    try {
        const {player_id, admin_id, team_id} = req.body;
        if (!await TeamMembers.findOne({where: {player_id: admin_id, team_id: team_id, in_admin: true}}) && player_id != admin_id) return res.json({error: 'Usuário não é administrador.'});
        if (!await TeamMembers.findOne({where: {player_id: player_id, team_id: team_id}})) return res.json({error: 'Usuário não esta no time'});            
        TeamMembers.destroy({where: {player_id: player_id}});
        return res.json({ok: true});
    } catch(err) {
        res.json({error: err.message});
    }
}

module.exports = {
    store,
    addMember,
    kickMember    
};