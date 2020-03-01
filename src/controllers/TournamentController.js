const Tournament = require('../models/Tournament');
const Match = require('../models/Match');
const Team = require('../models/Team');
const Currency = require('../models/Currency');
const connection = require('../database/index');

module.exports = {
    async createTournament(req, res) {
        try {
            const {price, prize, currency, start_at} = req.body;
            
            if (currency) {
                if (price < 0 || prize < 0)
                    return res.json({error: 'price or prize is bellow 0.'});

                if (!await Currency.findByPk(currency)) 
                    return res.json({error: 'moeda informada não consta no banco de dados.'});
            } else {
                if (price || prize)
                    return res.json({error: 'valor informado sem moeda.'});
            }

            const tournament = await Tournament.create({
                price,
                prize,
                currency,
                start_at
            });

            return res.json(tournament);
        } catch(err) {
            return res.json({error: err.message});
        }
    },

    async addTeamMatch(req, res) {
        const t = await connection.transaction();
        try {
            const {tournament_id, team1_id, team2_id} = req.body;

            if (!tournament_id || !team1_id || !team2_id)
                return res.json({error: 'informações faltando!'});

            const participantes = await Promise.all([Tournament.findByPk(tournament_id), Team.findByPk(team1_id), Team.findByPk(team2_id)]);
            if (participantes.includes(null))
                return res.json({error: 'torneio ou times inexistentes.'});

            const match = await Match.create({
                tournament_id
            }, {transaction: t});

            const matches = await Promise.all([
                match.addTeam(
                    participantes[1], {transaction: t}
                ), 
                match.addTeam(
                    participantes[2], {transaction: t}
                )]);
                    
            await t.commit();
            return res.json(matches);
        } catch(err) {
            await t.rollback();
            return res.json({error: err.message});
        }
    }
};