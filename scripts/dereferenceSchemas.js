const parser = require("@apidevtools/json-schema-ref-parser");
const path = require("path");
const fs = require("fs");
const { exit } = require("process");

(async () => {
  await dereferenceSchemas();
})();

/*
 * Walks through all schema in src/src_schema
 * For each schema, dereferences it and writes it to src/schema
 */
async function dereferenceSchemas() {

    const inputDir = path.resolve(`${__dirname}/../src/src_schemas`);
    const outputDir = path.resolve(`${__dirname}/../src/schemas`);
    const files = fs.readdirSync(inputDir);
    for await (const file of files) {
      const filePath = path.resolve(`${inputDir}/${file}`);
      // Load from file
      let schema = fs.readFileSync(filePath).toString();
      // Convert to JSON
      schema = JSON.parse(schema);
      // Set ID
      schema.$id = `${filePath}`;
      // Update references to current relative path
      schema = updateRefPaths(schema, inputDir);
      // Dereference schema
      schema = await parser.dereference(schema);
      console.log(schema)
    }
}


//   // Read files from schema directory
//   let files = fs.readdirSync(inputDir);
//   // Loop through all schema files
//   files.forEach(async (file) => {
//     // Exit early for files that don't match naming pattern
//     if (!file.includes(".schema.json")) return;
//     // Load schema from file
//     console.log(`${inputDir}/${file}`);
//     let schema = require(`${inputDir}/${file}`);
//     // Add dynamic ID based on file path
//     schema.$id = `${__dirname}/schemas/${file}`;
//     // Recursively update relative references with app root path
//     schema = updateRefPaths(schema);
//     // Dereference schema
//     schema = await parser.dereference(schema);
//     // Write to file
//     fs.writeFileSync(`${outputDir}/${file}`, JSON.stringify(schema, null, 2));
//   });
// }


// Prepend app-root path to referenced relative paths
function updateRefPaths(schema) {
    for (let [key, value] of Object.entries(schema)) {
      if (typeof value === "object") {
        updateRefPaths(value);
      }
      if (key === "$ref") {
        schema[key] = `${__dirname}/src_schemas/${value}`;
      }
    }
    return schema;
  }
  