# the web these days

James Halliday (substack)

https://bits.coop

follow me on secure scuttlebutt (p2p decentralized social database):

@9nTgtYmvW4HID6ayt6Icwc8WZxdifx5SlSKKIX/X/1g=.ed25519

---
# state of technology

* walled garden app stores
* proprietary web platforms (facebook, twitter, etc)
* proprietary, monolithic game dev stacks
* adoption of industry tools driven by marketing

---
# power dyanamics of web server technology

* servers - private property (DNS record, hardware)
* clients - subject to the whims of server operators

---
# dimensions of access

* access to a personal computer
* access to electricity and internet access
* sound, color, text size, contrast (temporary to permanent)
* device capabilities

---
# how can we build a better web?

* more equal
* more democratic
* more suitable for real world situations

---
# alternative: cooperative technology

* peers provide the infrastructure for each other
* no gatekeepers
* users control the network topology

---
# peer to peer

* secure scuttlebutt
* bitorrent
* ipfs
* dat/hyper{drive,core}
* hyperlog

---
# peer to peer

* DHT - look up keys in a global hash table
* kappa architecture - logs as a single source of truth
* gossip network - share information with peers, like rumors or a virus

---
# gossip architecture

secure scuttlebutt network model:

* when you follow somebody's feed, you replicate their data
* your followers help to host your content

---
# kappa architecture

* log - as the single source of truth for data
* materialized views - build indexes completely from the log
* merkle DAGs (like git!) for logs

---
# tiny modules

* do one thing well
* easy to learn, replace, and repair
* ecosystem of cooperative peer production

---
# tiny modules

if programmer X uses a module written by programmer Y
and programmer Y uses a module written by programmer X

X <---> Y

Now you have a reciprocal loop of mutual cooperation!

---
# web features

* indexeddb
* webrtc
* websockets
* webgl
* webaudio
* service workers

---
# web features

* indexeddb  - store data on the client
* webrtc     - transfer data to other users without servers
* websockets - transfer data to cooperatively run servers
* webgl      - graphics and calculations on the GPU
* webaudio   - audio interfaces and multimedia
* service workers - cache content offline

we can do so much in the browser!

what do we need servers and app stores for?

---
# demo: p2p social network on the web!

some tiny modules:

* level-browserify
* webrtc-swarm
* hyperlog
* yo-yo

---
# demo: webgl!

using:

* regl
* glslify

---
EOF
