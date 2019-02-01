const program = require("commander");
const handler = require("./lib/handler")
const color = require("colors");


program
  .command("get <username> [otherUserNames...]")
  .description("Fetch data for specified user or users ")
  .alias("g")
  .option("-tf, --to-file", "Create file with user data")
  .option("-f, --full", "Fetch full details")
  .action(handler)
  .on("--help", function() {
    console.log("");
    console.log("Examples:");
    console.log("");
    console.log(`  $ trieve get ${color.yellow.bold("marvinjudek")}`);
    console.log(`  $ trieve get ${color.yellow.bold("marvinjudek kvng_zeez")}`);
    console.log("");
    console.log("  Create File with data:");
    console.log("");
    console.log(`  $ trieve get ${color.yellow.bold("marvinjudek")} -tf`);
    console.log(`  $ trieve get ${color.yellow.bold("marvinjudek kvng_zeez")} -tf`);
  });

program.command("search <username> ").action(function() {
  console.log("Coming soon!!");
});

program.parse(process.argv);
