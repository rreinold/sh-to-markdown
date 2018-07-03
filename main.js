const jsdoc = require('jsdoc-api')
const jsdocParse = require('jsdoc-parse')
const dmd = require('dmd')
const fs = require('fs')

var args = process.argv.slice(2);
if(args.length > 1){
	console.log("Warning: Only one file is supported. Ignoring " + args.length - 1 + " arguments.")
}

var filepath = args[0]
if( ! isBashScript(filepath)){
	console.log("Warning: Only bash scripts are supported.")
}
DEBUG = true
var data = fs.readFileSync(filepath,'utf8');
replacements = [
	[/: '/g,"/**"],
	[/\n:/,"\n*/"],
	[/(.*?) \(\)/g,'function $1()'],
	['#!/bin/sh','']
]
if (DEBUG) console.log({input:data});
var output = data
for(r of replacements){
	output = output.replace(r[0],r[1])
}
if(DEBUG) console.log({replaced:output});
var logThis = jsdoc.explainSync({ source:output })
if (DEBUG) console.log(logThis);
var options = {}
var finalOutput = jsdocParse(logThis, options)
if (DEBUG) console.log({finalOutput});
var finalFoReal = dmd(finalOutput, {})
 console.log(finalFoReal);

/**
 * Determines whether a provided file has a '.sh' extension
 * 
 * @param {string} filepath, ex /home/user/script.sh
 * @returns {boolean} isBashScript 
 */
function isBashScript(filepath){
	var len = filepath.length
	if(filepath.length > 3){
		return filepath.substring(len - 3, len) === ".sh"
	}
	return false
}
