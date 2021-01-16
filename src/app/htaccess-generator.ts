export class HtaccessGenerator {
  private content = '';

  constructor(private questions: any, version: string) {
    this.content = `# Generated with ngx-htaccess-generator v${version}
# https://julianpoemp.github.io/ngx-htaccess-generator/

<IfModule mod_rewrite.c>
  RewriteEngine On
`;
  }

  public generate(): string {
    if (this.questions.httpsRedirection.checked) {
      this.addHttpsRedirection();
    }

    if (this.questions.exclusions.checked && this.questions.exclusions.list.length > 0) {
      this.addExclusions();
    }

    this.addDefaults();
    this.closeIfModule();

    if (this.questions.browserCachingDisabled.checked) {
      this.addBrowserCacheFix();
    }
    return this.content;
  }

  private addHttpsRedirection() {
    this.content += `
  # Redirection to HTTPS:
  RewriteCond %{HTTPS} !on
  RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
  `;
  }

  private addExclusions() {
    this.content += `
  # Excluded directories:
`;
    for (const exclusion of this.questions.exclusions.list) {
      this.content += `  RewriteRule ^${exclusion}?(.*) %{REQUEST_URI} [L,R=301]\n`;
    }
  }

  private addDefaults() {
    this.content += `
  # Redirection of requests to index.html
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
  RewriteRule ^.*$ - [NC,L]
  RewriteRule ^(.*) index.html [NC,L]`;
  }

  private addBrowserCacheFix() {
    this.content += `

# Disable browser caching for all files that don't get a hash string by Angular.
<FilesMatch "^(?!.*\\.([0-9a-z]{20})\\.).*$">
  <IfModule mod_headers.c>
    FileETag None
    Header unset ETag
    Header unset Pragma
    Header unset Cache-Control
    Header unset Last-Modified
    Header set Pragma "no-cache"
    Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
    Header set Expires "Mon, 10 Apr 1972 00:00:00 GMT"
  </IfModule>
</FilesMatch>`;
  }

  private closeIfModule() {
    this.content += `
</IfModule>`;
  }
}
