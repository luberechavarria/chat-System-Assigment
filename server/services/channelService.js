let channels = [
  {'id': 1, 'name': 'movies', 'group': 1},
  {'id': 2, 'name': 'reviews', 'group': 1},
  {'id': 3, 'name': 'transformers', 'group': 1},
  {'id': 4, 'name': 'spanish', 'group': 2},
  {'id': 5, 'name': 'english', 'group': 2},
  {'id': 6, 'name': 'italian', 'group': 2},
  {'id': 7, 'name': 'computers', 'group': 4},
  {'id': 8, 'name': 'houses', 'group': 5},
]

function getChannels() {
  return channels;
}

module.exports = {
  getChannels,
};