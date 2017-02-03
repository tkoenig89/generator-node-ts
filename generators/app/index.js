var Generator = require("yeoman-generator");
class SimpleGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        //custom code
        this.argument('appname', { type: String, default: this.appname.replace(" ", "-") });
    }

    prompting() {
        return this.prompt([{
            type: 'confirm',
            name: 'test',
            message: 'Would you like to add testing with mocha and chai?',
            default: false
        }]).then((answers) => {
            this.options["test"] = answers.test;
        });
    }

    writing() {
        const useTests = this.options["test"];

        //copy package.json
        this.fs.copyTpl(
            this.templatePath("_package.json"),
            this.destinationPath("package.json"),
            {
                app: this.options["appname"],
                useTests: useTests
            }
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

        //copy typings.json
        this.fs.copyTpl(
            this.templatePath("_typings.json"),
            this.destinationPath("typings.json"),
            {
                useTests: useTests
            }
        );

        //copy main.module.ts template
        this.fs.copyTpl(
            this.templatePath("_main.module.ts"),
            this.destinationPath("src/main.module.ts"),
            {
                app: this.options["appname"]
            }
        );

        if (useTests) {
            //copy main.module.spec.ts template
            this.fs.copyTpl(
                this.templatePath("_main.module.spec.ts"),
                this.destinationPath("src/main.module.spec.ts"),
                { app: this.options["appname"] }
            );
        }
    }

    install() {
        //let npm handle the rest
        this.installDependencies({
            bower: false,
            npm: true
        });
    }
};

module.exports = SimpleGenerator;