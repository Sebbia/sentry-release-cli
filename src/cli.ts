import * as yargs from "yargs";
import { exit } from "yargs";
import { publish } from "./publish";
import { removeSourcemaps } from "./removeSourcemaps";

const cmdLineParser = yargs
  .scriptName("sentry-release")
  .command("publish", "Publish build artefacts to Sentry")
  .command("remove-sourcemaps", "Remove source maps from build")
  .option("t", {
    alias: "tag",
    describe: "App version tag",
    nargs: 1,
    type: "string",
  })
  .option("b", {
    alias: "build",
    describe: "Path to build results",
    nargs: 1,
    default: "./build",
    type: "string",
  })
  .demandCommand();

const argv = cmdLineParser.argv;

const versionTag = argv.tag as string;
const buildFolder = argv.build as string;

console.log(`App version tag: ${versionTag}`);
console.log(`Build folder: ${buildFolder}`);

async function processCommands(commands: string[]) {
  try {
    if (commands.length < 1) throw new Error("Command required");
    for (const command of commands) {
      console.log(`Executing command: ${command}`);
      switch (command) {
        case "remove-sourcemaps":
          removeSourcemaps(buildFolder);
          break;
        case "publish":
          await publish(buildFolder, versionTag);
          break;
        default:
          throw new Error(`Unknown command: ${command}`);
      }
    }
  } catch (e) {
    console.error(e);
    exit(1, e.message);
  }
}

processCommands(argv._);
