var Generator = require("yeoman-generator");
class SimpleGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        //custom code
        this.argument('appname', { type: String, default: "my-app" });
    }

    writing() {
        this.log('write');

        //copy package.json
        this.fs.copyTpl(
            this.templatePath("_package.json"),
            this.destinationPath("package.json"),
            { app: this.options["appname"] }
        );

        //copy tsconfig.json
        this.fs.copy(
            this.templatePath("_tsconfig.json"),
            this.destinationPath("tsconfig.json")
        );

        //copy .gitignore
        this.fs.copy(
            this.templatePath("_.gitignore"),
            this.destinationPath(".gitignore")
        );

        //create main.ts
        this.fs.write(
            this.destinationPath("src/main.ts"),
            `console.log("running ${this.options["appname"]}");`
        )
    }
};

module.exports = SimpleGenerator;