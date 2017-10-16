require("isomorphic-fetch")

async function fetchHTML(url) {
  const response = await fetch(url)
  return await response.text()
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new Error(response.statusText)
  }
}

async function fetchJSON(url) {
  const response = await fetch(url).then(checkStatus)
  const json = await response.json().catch(function(error) {
    throw Error("COULD NOT PARSE JSON");
  });
  return {
    json,
    status: response.status
  }
}

// fetchHTML('https://google.com')
//   .then(json => console.log(json))

fetchJSON('https://jsonplaceholder.typicode.com/posts')
  .then(json => console.log(json))
  .catch(e => console.error(e.message))
