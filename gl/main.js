var regl = require('regl')()
var camera = require('regl-camera')(regl, { distance: 3 })
var icosphere = require('icosphere')
var glsl = require('glslify')
var anormals = require('angle-normals')
var wireframe = require('screen-projected-lines')
var baudio = require('webaudio')
var b = baudio(require('./song.js'))
//b.play()

var mesh = icosphere(3)
var wmesh = wireframe(mesh)
var draw = regl({
  frag: glsl`
    precision highp float;
    #pragma glslify: snoise = require('glsl-noise/simplex/4d')
    #pragma glslify: hsl2rgb = require('glsl-hsl2rgb')
    varying vec3 vpos;
    uniform float time;
    void main () {
      float h = (snoise(vec4(vpos,time*0.2))+1.0)*0.5;
      gl_FragColor = vec4(hsl2rgb(h,1.0,0.5),1);
    }
  `,
  vert: glsl`
    precision highp float;
    #pragma glslify: snoise = require('glsl-noise/simplex/4d')
    #pragma glslify: linevoffset = require('screen-projected-lines')
    attribute vec3 position, normal, nextpos;
    attribute float direction;
    uniform mat4 projection, view;
    uniform float time, aspect;
    varying vec3 vpos;
    void main () {
      mat4 proj = projection * view;
      float x = snoise(vec4(position,time*0.2));
      vec4 p = proj * vec4(position + normal * x * 0.5,1);
      vec4 n = proj * vec4(nextpos + normal * x * 0.5,1);
      vec4 offset = linevoffset(p,n,direction,aspect);
      vpos = p.xyz;
      gl_Position = p + offset * 0.02;
    }
  `,
  attributes: {
    position: wmesh.positions,
    normal: anormals(wmesh.cells, wmesh.positions),
    nextpos: wmesh.nextPositions,
    direction: wmesh.directions
  },
  uniforms: {
    time: regl.context('time'),
    aspect: function (context, props) {
      return context.viewportWidth / context.viewportHeight
    }
  },
  elements: wmesh.cells
})
regl.frame(function () {
  regl.clear({ color: [0,0,0,1], depth: true })
  camera(function () {
    draw()
  })
})
