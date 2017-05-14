var html = require('yo-yo')
var root = document.body.appendChild(document.createElement('div'))
var level = require('level-browserify')
var db = level('socnet.db')
var hyperlog = require('hyperlog')
var log = hyperlog(db, { valueEncoding: 'json' })
var to = require('to2')
var wswarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var sw = wswarm(signalhub('socnet-demo',['http://localhost:9005/']))
sw.on('peer', function (peer, id) {
  console.log('PEER',id)
  peer.pipe(log.replicate()).pipe(peer)
})

var state = { posts: [] }
log.createReadStream().pipe(to.obj(function (row, enc, next) {
  state.posts.push(row)
  update()
  next()
}))
update()

function update () {
  html.update(root, html`<div>
    <form onsubmit=${onsubmit}>
      <textarea name="msg"></textarea>
      <button type="submit">SUBMIT</button>
    </form>
    <hr>
    <div>
      ${state.posts.map(function (node) {
        return html`<pre>${JSON.stringify(node)}</pre>`
      })}
    </div>
  </div>`)
  function onsubmit (ev) {
    ev.preventDefault()
    var msg = this.elements.msg.value
    log.append({ msg: msg }, function (err, node) {
      if (err) return console.error(err)
      state.posts.push(node)
      update()
    })
  }
}
