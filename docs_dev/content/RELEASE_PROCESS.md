Release Process
===============

1. Ensure the following files are using the new release version number:
   * `appveyor.yml`
   * `package.json`
   * `docs_dev/content/API_NPM.md` (In the **Introduction** section). You may skip this part if doing a point (bugfix) release.
2. Write up new features/fixes in `docs_dev/content/RELEASE_NOTES.md`
3. Generate API docs and copy output to a new versioned subdirectory in the `gh-pages` branch
4. Regenerate static site content and overwrite existing site html in the `gh-pages` branch
   4.1. Ensure the following static site content reside in the versioned subdirectory as well:
     * `api_browser.html`
5. Build the npm package `yarn run build:npm` and publish a `-pre` package
6. Verify the [sample project](https://github.com/jumpinjackie/mapguide-react-layout-example) works with the published package
7. Once the sample project is verified as working, start the actual release process:
   
   7.1. `git tag <new version>`
   
   7.2. `git push origin --tags`
   
   7.3. This will trigger appveyor build and automate the creation of a GitHub release for `<new version>`

8. Switch to this new tag to publish the real npm package

   8.1. `yarn run build:npm`

   8.2. `cd package`

   8.3. `npm publish`

9. Go to the new GitHub release and publish it with the new release notes.


Release Process - Pre-release packages
======================================

Pre-release packages should be published under the `next` tag

1. Set version in `package.json` to include a pre-release suffix (eg. `-alpha.123`)
2. Run `yarn run build:npm`
3. `cd package`
4. Run `npm publish --tag next`