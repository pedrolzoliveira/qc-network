const Part = require('../models/Part');

module.exports = {
    async store(req, res) {
       try {

       } catch(err) {
           res.json({error: err.message});
       }
    }
};