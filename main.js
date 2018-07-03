const jsdoc = require('jsdoc-api')
const jsdocParse = require('jsdoc-parse')
const dmd = require('dmd')
// const DmdOptions = require('./dmd-options')
DEBUG = false
var fs = require('fs')
var data = fs.readFileSync('/Users/RobReinold/Documents/Projects/bashdoc-to-markdown/input.sh','utf8');
replacements = [[/: '/g,"/**"],[/\n:/,"\n*/"]]
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
// const dmdOptions = new DmdOptions(options)
var finalFoReal = dmd(finalOutput, {})
 console.log(finalFoReal);

