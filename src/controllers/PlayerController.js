const Player = require('../models/Player');

module.exports = {

    async store(req, res) {
        try {
            const {user_id, nickname} = req.body; 
            console.log(user_id, nickname);
            const player = await Player.create( {user_id, nickname} );
            console.log('player');
            res.json(player);
        }
        catch(err) {
            res.json({error: err.message});
        }
       
    } 
};