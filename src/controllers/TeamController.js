const Team = require('../models/Team');
const User = require('../models/User');
const connection = require('../database/index');

async function store(req, res) {
    const t = await connection.transaction();
    try {
        const {creator_id, name} = req.body;
        if (await Team.findOne({where: {creator_id: creator_id, name: name}})) return res.json({error: 'Usuário já tem um time com este nome'});
        const team = await Team.create({
            creator_id, 
            name
        }, {transaction: t});

        const team_member = await team.addUser(await User.findByPk(creator_id), {transaction: t});

        await t.commit();

        return res.json({team, team_member});
    } catch(err) {
        await t.rollback();
        res.json({error: err.message});
    }
}
/*
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
        await TeamMembers.destroy({where: {player_id: player_id}});
        return res.json({ok: true});
    } catch(err) {
        res.json({error: err.message});
    }
}
*/
module.exports = {
    store,
    //addMember,
    //kickMember    
};