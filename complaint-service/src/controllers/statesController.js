const stateProvider = require('../data/providers/stateProvider')

const querySearch = async (req, res, next) => {
    let {id, name, abbreviation} = req.query
    let db = req.db
    searchConfig = {
        id: id,
        name: name,
        abbreviation: abbreviation,
        db: db
    }

    try{
        req.states = await stateProvider.getStatesAsync(searchConfig)
    } catch(e) {
        return next(e)
    }

    return next();

}

const send = (req, res, next) => {
    return res.status(200).json(req.states)
}

exports.querySearch = [
    querySearch,
    send
];