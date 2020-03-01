const Team = require('../models/Team');
const User = require('../models/User');
const connection = require('../database/index');

module.exports = {
    async store(req, res) {
        const t = await connection.transaction();
        try {
            const {name} = req.body;
            const creator_id = req.user.id;
            const user = await User.findByPk(creator_id);

            if (!user)
                return res.json({error: 'user not found.'});
    
            if (await Team.findOne({where: {creator_id: creator_id, name: name}})) return res.json({error: 'Usuário já tem um time com este nome'});
            
            const team = await Team.create({
                creator_id, 
                name
            }, {transaction: t});
    
            const [team_member] = await team.addUser(user, {
                through: {in_admin: true}, 
                transaction: t
            });

            await t.commit();
    
            return res.json({team, team_member});
        } catch(err) {
            await t.rollback();
            res.json({error: err.message});
        }
    },
};

