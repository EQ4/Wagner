'use strict';

var glslify = require('glslify');
var Pass = require('../../Pass');
var vertex = glslify('../../shaders/vertex/basic.glsl');
var fragment = glslify('./dof-fs.glsl');

function DOFPass(options) {
  Pass.call(this);

  options = options || {};

  this.setShader(vertex, fragment);

  this.params.focalDistance = 0.01;
  this.params.aperture = .005;
  this.params.tBias = null;
  this.params.blurAmount = 1;
}

module.exports = DOFPass;

DOFPass.prototype = Object.create(Pass.prototype);
DOFPass.prototype.constructor = DOFPass;

DOFPass.prototype.run = function(composer) {
  this.shader.uniforms.tBias.value = this.params.tBias;
  this.shader.uniforms.focalDistance.value = this.params.focalDistance;
  this.shader.uniforms.aperture.value = this.params.aperture;
  this.shader.uniforms.blurAmount.value = this.params.blurAmount;

  this.shader.uniforms.delta.value.set( 1, 0 );
  composer.pass(this.shader);

  this.shader.uniforms.delta.value.set( 0, 1 );
  composer.pass(this.shader);
};
