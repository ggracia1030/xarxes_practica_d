var notes = {};

exports.list = function(req, res) {
  res.json(Object.keys(notes));     
}
exports.get = function(note_name, req, res) {
  if (!notes.hasOwnProperty(note_name)) {
    res.status(404);
    res.end();
    console.error(note_name + " NOT FOUND!");
  } else {
    res.json(notes[note_name]);
  }
};

exports.insert = function(note_name, req, res) {
  if (notes.hasOwnProperty(note_name)) {
    res.status(409);
    return console.error(note_name + " ALREADY THERE!");
  } else {
    if (!req.body.content) {
      res.status(422);
      res.end();
      return console.error(note_name + " INCORRECT BODY JSON!");
    }
    notes[note_name] = { content: req.body.content, inserted: new Date() };
    res.end();
  }
};


exports.upsert = function(note_name, req, res) {
  if (notes.hasOwnProperty(note_name)) {
    notes[note_name] = { content: req.body.content, modified: new Date() };
    res.end();
  } else {
    this.insert(note_name, req, res);
  }
};