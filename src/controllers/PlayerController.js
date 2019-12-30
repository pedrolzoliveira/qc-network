const Player = require('../models/Player');

module.exports = {

    async store(req, res) {
        try {
            const {user_id, nickname} = req.body; 
            const player = await Player.create( {user_id, nickname} );
            return res.json(player);
        }
        catch(err) {
            res.json({error: err.message});
        } 
    },

    async ChangeNick(req, res) { 
        try {
            const {user_id, nickname, new_nickname}  = req.body;
            let player = Player.findOne({where: {user_id: user_id, nickname: nickname}});
            if (!player) 
                return res.json({error: 'Player não encontrado!'});
            
            (await player).update({nickname: new_nickname});
            
            return res.json({player});

        } catch(err) {
            return res.json({error: err.message});
        }
    }
};