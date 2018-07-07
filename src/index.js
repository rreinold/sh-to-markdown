DEBUG = true

const jsdoc = require('jsdoc-api')
const jsdocParse = require('jsdoc-parse')
const dmd = require('dmd')
const fs = require('fs')

const BASH_TO_JS_MAPPING = [
	[/: '/g,"/**"],
	[/\n'/,"\n*/"],
]

const DMD_OPTIONS = {
	"example-lang":"bash",
	"plugin":"dmd-bitbucket"
}

var args = process.argv.slice(2);
if(args.length > 1){
	console.log("Warning: Only one file is supported. Ignoring " + args.length - 1 + " arguments.")
}

var filepath = args[0]
if( ! isBashScript(filepath)){
	console.log("Warning: Only bash scripts are supported.")
}

var fileContents = fs.readFileSync(filepath,'utf8');
if(DEBUG) console.log({fileContents});




var matches = fileContents.match(/: '\n(.*?)\n'/gms);
if (DEBUG) console.log({matches});
for(i in matches){
	for(r of BASH_TO_JS_MAPPING){
		matches[i] = matches[i].replace(r[0],r[1])
	}
}

assembledSource = matches.join('\n')
if(DEBUG) console.log({replaced:assembledSource});

var jsdocd = jsdoc.explainSync({ source:assembledSource })
if (DEBUG) console.log(jsdocd);

var options = {}
var jsdocParsed = jsdocParse(jsdocd, options)
if (DEBUG) console.log({jsdocParsed});

var markdown = dmd(jsdocParsed, DMD_OPTIONS)
console.log(markdown);

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
