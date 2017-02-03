## node-ts generator

Creates a simple project structure for a node application using typescript.
It installs the default node typings and can be compiled and started via 'npm start'. 
This will create a *dist* folder an transpile all .ts files in *src* into .js files placed in *dist*.

With an additional paramater, you can set the applications name, used for the *package.json*, in case it should not be the current folder's name.

- yo node-ts **'application name'**

You can also decide to use mocha and chai for testing, via a prompt.

### Project structure

root \\\
|--- src \\\
|--------- main.module.ts\
|---------(main.module.spec.ts)\
|--- package.json\
|--- .gitignore\
|--- tsconfig.json
|--- typings.json