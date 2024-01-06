const Game = require("../items/games");

exports.games_get_all = (req, res, next) => {
    Game.find()
    .then(result => {

        res.status(200).json({ info: 'All games:',
        info: result,
     });
    })
    .catch(err => res.status(500).json(err));
};

exports.games_add_new = (req, res, next) => {
    const game = new Game({
        title: req.body.title,
        genre: req.body.genre,
        platforms: req.body.platforms,
        year: req.body.year,
    });
    game.save()
        .then(result => {
            res.status(201).json({
                info: 'Adding new title',
                info: result,
              });
        })
        .catch(err => res.status(500).json(err));
};

exports.games_get_byid = (req, res, next) => {
    const id = req.params.gameId;
    Game.findById(id)
    .then(result => {
        res.status(200).json({ info: 'Game with the ID ' + id,
        info: result,
    });
    })
    .catch(err => res.status(500).json(err));
  };

exports.games_change = (req, res, next) => {
    const id = req.params.gameId;
    Game.findByIdAndUpdate(id, {title: req.body.title, genre: req.body.genre, platforms: req.body.platforms, year: req.body.year,})
    .then(() => {
        res.status(200).json({ info: 'Changed title ' + id });
    })
    .catch(err => res.status(500).json(err));
  };

exports.games_delete = (req, res, next) => {
    const id = req.params.gameId;
    Game.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ info: 'Deleted title ' + id });
    })
    .catch((err) => res.status(500).json(err));
};