# Sentry Release CLI

This CLI simplifies some actions when publishing new a release of WEB application to Sentry.

These actions is:

* creating new release
* uploading source maps
* clean distributive from source maps

## Requirements

* Node >= 10
* Tested on CRA atm

## Install
```sh
cd my-web-app
npm i -D @sebbia/sentry-release-cli
```

## Configure defaults

Create a file `.sentryclirc` inside your top level project directory with the followed content:

```
[defaults]
project=your-project-name-here
org=your-organisation-here
url=https://sentry.your-domain-here.com
```

## Usage

To perform publish the new release you need to provide an authorization token.

This token can be acquired from `Tokens` group box in `You project->Settings->Developer Settings->New integration`.

```sh
export SENTRY_AUTH_TOKEN=xxxxxxxxxxxxxxxxxx
npx sentry-release publish -t 1.0.0
npx sentry-release remove-sourcemaps
```
