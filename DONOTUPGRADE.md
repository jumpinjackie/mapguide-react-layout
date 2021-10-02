# Packages which cannot be upgraded until further notice

## webpack

Current version: `5.54.0`

Why we can't upgrade: Storybook build breaks (probably because of [this](https://github.com/webpack/webpack/commit/5f22bffdd1d8808a4fe7cc5d65deeb72fb8e4c62))

```
info @storybook/react v6.3.9
info
info => Cleaning outputDir: C:\Workspace\mapguide-react-layout\storybook-static
info => Copying static files: ././src/stories/static => ./
info => Loading presets
info => Compiling manager..
info => Compiling preview..
info => Loading 1 config file in "C:\Workspace\mapguide-react-layout\.storybook"
info => Loading 4 other files in "C:\Workspace\mapguide-react-layout\.storybook"
info => Adding stories defined in "C:\Workspace\mapguide-react-layout\.storybook\main.js"  
info => Using implicit CSS loaders
info => Loading custom Webpack config (full-control mode).
9% setup compilation DefinePluginERR! TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received an instance of Set
ERR!     at new NodeError (node:internal/errors:278:15)
ERR!     at Hash.update (node:internal/crypto/hash:105:11)
ERR!     at BulkUpdateDecorator.update (C:\Workspace\mapguide-react-layout\node_modules\webpack\lib\util\createHash.js:51:14)
ERR!     at C:\Workspace\mapguide-react-layout\node_modules\webpack\lib\DefinePlugin.js:290:14
ERR!     at _next0 (eval at create (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:19:10), <anonymous>:203:1)
ERR!     at Hook.eval [as call] (eval at create (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:19:10), <anonymous>:286:1)
ERR!     at Hook.CALL_DELEGATE [as _call] (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\node_modules\tapable\lib\Hook.js:14:14)   
ERR!     at Compiler.newCompilation (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\lib\Compiler.js:1044:26)
ERR!     at C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\lib\Compiler.js:1088:29
ERR!     at Hook.eval [as callAsync] (eval at create (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:33:10), <anonymous>:22:1)
ERR!     at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\node_modules\tapable\lib\Hook.js:18:14)
ERR!     at Compiler.compile (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\lib\Compiler.js:1083:28)
ERR!     at C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\lib\Compiler.js:508:12
ERR!     at Compiler.readRecords (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\lib\Compiler.js:920:11)
ERR!     at C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\lib\Compiler.js:505:11
ERR!     at Hook.eval [as callAsync] (eval at create (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:33:10), <anonymous>:10:1)
ERR!  TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received an instance of Set
ERR!     at new NodeError (node:internal/errors:278:15)
ERR!     at Hash.update (node:internal/crypto/hash:105:11)
ERR!     at BulkUpdateDecorator.update (C:\Workspace\mapguide-react-layout\node_modules\webpack\lib\util\createHash.js:51:14)
ERR!     at C:\Workspace\mapguide-react-layout\node_modules\webpack\lib\DefinePlugin.js:290:14
ERR!     at _next0 (eval at create (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:19:10), <anonymous>:203:1)
ERR!     at Hook.eval [as call] (eval at create (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:19:10), <anonymous>:286:1)
ERR!     at Hook.CALL_DELEGATE [as _call] (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\node_modules\tapable\lib\Hook.js:14:14)   
ERR!     at Compiler.newCompilation (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\lib\Compiler.js:1044:26)
ERR!     at C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\lib\Compiler.js:1088:29
ERR!     at Hook.eval [as callAsync] (eval at create (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:33:10), <anonymous>:22:1)
ERR!     at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\node_modules\tapable\lib\Hook.js:18:14)
ERR!     at Compiler.compile (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\lib\Compiler.js:1083:28)
ERR!     at C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\lib\Compiler.js:508:12
ERR!     at Compiler.readRecords (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\lib\Compiler.js:920:11)
ERR!     at C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\lib\Compiler.js:505:11
ERR!     at Hook.eval [as callAsync] (eval at create (C:\Workspace\mapguide-react-layout\node_modules\@storybook\builder-webpack5\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:33:10), <anonymous>:10:1) {
ERR!   code: 'ERR_INVALID_ARG_TYPE'
ERR! }
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.       
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.       
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
```