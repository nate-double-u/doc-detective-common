# Doc Detective Common

![Current version](https://img.shields.io/github/package-json/v/doc-detective/doc-detective-common?color=orange)
[![NPM Shield](https://img.shields.io/npm/v/doc-detective-common)](https://www.npmjs.com/package/doc-detective-common)
[![Discord Shield](https://img.shields.io/badge/chat-on%20discord-purple)](https://discord.gg/mSCCRAhH)

Shared resources for Doc Detective projects.

## Install

```bash
npm i doc-detective-common
```

## Init

```javascript
const common = require("doc-detective-common");
```

## Methods

### `.validate(schemaKey: string, object: object)`

Validate that `object` matches the specified [schema](#.schemas) definition.

Returns an object with the following schema:

```json
{
  "valid": boolean,
  "errors": [
    {
      "instancePath": string,
      "schemaPath": string,
      "keyword": string,
      "params": [{Object}],
      "message": string
    }
  ]
}
```

#### Usage

```js
const schemaKey = "runShell_v1";
const object = {
  action: "runShell",
  command: "echo $username",
};
console.log(common.validate(schemaKey, object));
```

### `.readFile(fileURL)`

Load file contents from a URL or a file path. If a JSON or YAML file, returns an object. If a different file, returns a string.

## Objects

### `.schemas`

JSON schema definitions for various objects used throughout Doc Detective.

Schema objects are located in the [`/schemas`](https://github.com/doc-detective/doc-detective-common/tree/schema/schemas) directory and made available through the `.schemas` object.

```json
{
  "analytics_v1": {Object},
  "checkLink_v1": {Object},
  "click_v1": {Object},
  "find_v1": {Object},
  "goTo_v1": {Object},
  "httpRequest_v1": {Object},
  "matchText_v1": {Object},
  "moveMouse_v1": {Object},
  "runShell_v1": {Object},
  "screenshot_v1": {Object},
  "scroll_v1": {Object},
  "startRecording_v1": {Object},
  "stopRecording_v1": {Object},
  "type_v1": {Object},
  "wait_v1": {Object}
}
```
