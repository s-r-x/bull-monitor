import { Config } from "./typings/config";

const pkg = require('../package.json');

export class UI {
  private uiVersion = '5.0.2-alpha.2.0';
  private pkgName = '@ataboo/bull-monitor-ui';
  private cdnRoot = `https://cdn.jsdelivr.net/npm/${this.pkgName}@${this.uiVersion}`;
  private resourcesRoot = this.cdnRoot + '/build';
  private buildCdnUrl(resource: string) {
    return this.resourcesRoot + resource;
  }
  public render(config: Config) {
    const keyCloakBlock = config.keycloak ? `
      <script>
        window.BULL_KEYCLOAK_REALM='${config.keycloak?.realm}';
        window.BULL_KEYCLOAK_URL='${config.keycloak.url}';
        window.BULL_KEYCLOAK_CLIENT='${config.keycloak.client}';
      </script>` : '';

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Bull monitor</title>
      <meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      ${keyCloakBlock}
      <link rel="stylesheet" href="${this.buildCdnUrl('/style.css')}"/>
      <script type="module" src="${this.buildCdnUrl('/main.js')}"></script>
    </head>
    <body>
      <div id="root"></div>
      <noscript>You need to enable JavaScript to run this app.</noscript>
    </body>
    </html>
    `;
  }
}
