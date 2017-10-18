const GitHub = require("github-api");

async function loadGist(id, authCredentials = null) {
  let gist = new GitHub(authCredentials).getGist(id);
  const response = await gist.read().catch(function(error) {
    throw Error(error.response.data.message);
  });
  // if (response.status !== 200) throw Error(response.data.message);
  return response.data;
}

export async function loadGistCode(id) {
  let gist = await loadGist(id);
  return gist.files["graph.js"].content;
}

// loadGistCode('572fb9500506b48f547de255e5540729').then(console.log)
