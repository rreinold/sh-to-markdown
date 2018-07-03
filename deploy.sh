#!/bin/sh

: '
@typedef "deploy.sh"
@param {string} semver Semantic Version of Docker image, ex. 1.0.0-rc2
@param {number} timeout Timeout period between retries
:

buildImage (){ }