declare module "@sentry/cli" {
  interface UploadSourceMapsOptions {
    include: string[];
    ignore?: string[];
    ignoreFile?: string;
    rewrite?: boolean;
    sourceMapReference?: boolean;
    stripPrefix?: string[];
    stripCommonPrefix?: boolean;
    validate?: boolean;
    urlPrefix?: string;
    urlSuffix?: string;
    ext?: string[];
  }

  export default class SentryCli {
    constructor(configFile?: string, options?: Record<string, any>);
    releases: {
      "new"(release: string): Promise<string | undefined>;
      finalize(release: string): Promise<string | undefined>;
      proposeVersion(): Promise<string>;
      uploadSourceMaps(
        release: string,
        options: UploadSourceMapsOptions
      ): Promise<Array<string | undefined>>;
    };
  }
}
