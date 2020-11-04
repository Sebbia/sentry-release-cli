import SentryCli from "@sentry/cli";

export async function publish(buildFolder: string, versionTag: string) {
  const cli = new SentryCli();
  console.log(`Creating sentry release ${versionTag}`);
  await cli.releases.new(versionTag);
  console.log("Uploading source maps");
  await cli.releases.uploadSourceMaps(versionTag, {
    include: [`${buildFolder}/static/js`],
    urlPrefix: "~/static/js",
    rewrite: false,
  });
  console.log("Finalizing release");
  await cli.releases.finalize(versionTag);
}
