# dependabot-config-generator

CLI tool for [Dependabot config](https://dependabot.com/docs/config-file/) generate.

This CLI tool requires a Node.js version of 10 or higher.

## Install

```bash
npm install -g shinshin86/dependabot-config-generator
# or
yarn global add shinshin86/dependabot-config-generator
```

## Usage

```bash
dependabot-config-generator
```

### GIF

![dependabot-config-generator demo gif](./gif/dependabot-config-generator-demo.gif)

Generate a configuration of "Dependabot".

Example:

```yaml
version: 1
update_configs:
  - package_manager: javascript
    directory: /
    update_schedule: daily
    automerged_updates:
      - match:
          dependency_type: all
          update_type: 'semver:minor'
```

## Future Plans

Only required items are supported.
I want this tool to be simple, so I'm thinking of implementing the other settings as optional features.
