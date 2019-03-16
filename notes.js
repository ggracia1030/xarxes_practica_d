var notes = {};
var names = [];

exports.list = function(req, res) {
  console.log(notes);
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
    names.push(note_name);
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

exports.GetByContent = function(content, req, res) {
  let found = false;
  var temp = {};
  for(let i = 0; i < names.length; i++) {
    if(notes[names[i]].content.includes(content)) {
      found = true;
      temp[names[i]] = notes[names[i]];
      console.log("Found " + names[i] + "!");
    }
  }
  if(!found) {
    res.status(404);
    res.end();
    console.error(note_name + " NOT FOUND!");
  }
  else {
    res.json(Object.keys(temp));
  }
};

exports.delete = function(note_name, req, res) {
  if (!notes.hasOwnProperty(note_name)) {
    res.status(404);
    res.end();
    console.error(note_name + " NOT FOUND!");
  } else {
    delete notes[note_name];
    res.json(Object.keys(notes));     
  }
}