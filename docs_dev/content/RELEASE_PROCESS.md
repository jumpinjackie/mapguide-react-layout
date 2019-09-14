Release Process
===============

1. Ensure appveyor.yml and package.json are using the new release version number
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