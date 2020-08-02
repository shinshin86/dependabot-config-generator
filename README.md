# dependabot-config-generator (WIP)

CLI tool for [Dependabot config](https://dependabot.com/docs/config-file/) generate.

## Install

TODO

## Usage

TODO

Generate a configuration file for "Dependabot".

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
