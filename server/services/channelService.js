let channels = [
  {'id': 1, 'name': 'movies', 'group': 1, 'usersIdChannel':[1, 2, 3, 4, 5]},
  {'id': 2, 'name': 'reviews', 'group': 1, 'usersIdChannel':[1, 4]},
  {'id': 3, 'name': 'transformers', 'group': 1, 'usersIdChannel':[1, 3]},
  {'id': 4, 'name': 'spanish', 'group': 2, 'usersIdChannel':[2, 5]},
  {'id': 5, 'name': 'english', 'group': 2, 'usersIdChannel':[2]},
  {'id': 6, 'name': 'italian', 'group': 2, 'usersIdChannel':[2]},
  {'id': 7, 'name': 'computers', 'group': 3, 'usersIdChannel':[3]},
  {'id': 8, 'name': 'houses', 'group': 4, 'usersIdChannel':[4]},
]

function getChannels() {
  return channels;
}

module.exports = {
  getChannels,
};