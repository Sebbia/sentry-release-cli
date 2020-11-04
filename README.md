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
```sh
npx sentry-release-cli publish -t 1.0.0
npx sentry-release-cli remove-sourcemaps
```
