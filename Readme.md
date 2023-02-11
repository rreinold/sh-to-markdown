![](https://img.shields.io/npm/v/sh-to-markdown)
# sh-to-markdown

## Overview

Existing bash script documentation tools are lackluster, so I created a documentation generation tool that allows you to document bash scripts with typing, type links in markdown.

## Formatting

Multi-line comments are detected as JSDoc comment blocks:

```bash
: '
@typedef myScript
@...
:
```

are interpreted in an identical fashion as JSDoc comments blocks:

```javascript
/**
 * @typdef myScript
 * @...
 */
```

## API

### CLI

Example bash script: 

#### deploy.sh

```bash
#!/bin/sh

: '
@typedef "deploy.sh"
@param {string} semver Semantic Version of Docker image, ex. 1.0.0-rc2
@param {number} timeout Timeout period between retries
:

buildImage (){ }

```

#### Generation

```bash
# sh2md deploy.sh > api.md
```


<a name="you"></a>

### deploy.sh
**Kind**: global typedef

| Param | Type | Description |
| --- | --- | --- |
| semver | <code>string</code> | Semantic Version of Docker image, ex. 1.0.0-rc2 |
| timeout | <code>number</code> | Timeout period between retries


## Credit

dmd  
jsdoc  
jsdoc-api  
jsdoc-parse
