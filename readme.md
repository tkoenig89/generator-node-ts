## node-ts generator

Creates a simple project structure for a node application using typescript. It installs the default node type definition files as well. 
You can choose to add mocha and chai for testing, via a prompt.

## Installation

If you have yeoman installed, simply call (if 'name' is not present, the working folders name will be used):
```bash
npm install node-ts [-g]
yo node-ts [name]
```

You will then be asked, if you like to add testing capabilities to your project (default is *false*):
```bash
Would you like to add mocha and chai (testing)? (y/N)
```

## npm scripts
The generator comes with the following npm scripts:
```
npm start
```
Will transpile the *.ts* in *src* folder to *.js* files in *dist* folder. And start the node application.

```
npm test
```
[Only available if you enabled testing!] This will also transpile all .ts files and will run mocha tests on all *.spec.js* files in the *dist* folder.

## Generated folder structure

<ul>root \
<li><ul>src \
<li>main.module.ts</li>
<li>(main.module.spec.ts)</li>
</ul></li>
<li>package.json</li>
<li>.gitignore</li>
<li>tsconfig.json</li>
<li>typings.json</li>
