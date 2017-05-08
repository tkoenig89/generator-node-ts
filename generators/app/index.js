var Generator = require("yeoman-generator");
class SimpleGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);

        //custom code
        this.argument('appname', { type: String, default: this.appname.replace(/\s/g, "-") });
    }

    prompting() {
        return this.prompt([{
            type: 'confirm',
            name: 'test',
            message: 'Would you like to add mocha and chai (testing)?',
            default: false
        }]).then((answers) => {
            this.options["test"] = answers.test;

            if (answers.test) {
                return this.prompt([{
                    type: 'confirm',
                    name: 'testFolder',
                    message: generateTestFolderPrompt(this.options["appname"]),
                    default: false
                }]).then((answers) => {
                    this.options["testFolder"] = answers.testFolder;
                });
            }
        });
    }

    writing() {
        const useTests = this.options["test"];
        const useTestFolder = useTests && this.options["testFolder"];

        //copy package.json
        this.fs.copyTpl(
            this.templatePath("_package.json"),
            this.destinationPath("package.json"),
            {
                app: this.options["appname"],
                useTests: useTests,
                npmTestPath: useTestFolder ? "dist/test/*.spec.js" : "dist/**/*.spec.js"
            }
        );

        //copy tsconfig.json
        this.fs.copyTpl(
            this.templatePath("_tsconfig.json"),
            this.destinationPath("tsconfig.json"), {
                useTestFolder: useTestFolder
            }
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
            var testPath = useTestFolder ? "test/" : "src/";
            //copy main.module.spec.ts template
            this.fs.copyTpl(
                this.templatePath("_main.module.spec.ts"),
                this.destinationPath(testPath + "main.module.spec.ts"),
                {
                    app: this.options["appname"],
                    srcFolder: useTestFolder ? "../src" : "."
                }
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

function generateTestFolderPrompt(rootFolderName) {
    return 'Should tests be stored in a separate folder, instead of next to the source files?\n' +
        "-yes:\n " + rootFolderName + "/\n   src/\n     .ts\n   test/\n     .spec.ts\n" +
        "-no:\n " + rootFolderName + "/\n   src/\n     .ts\n     .spec.ts\n";
}

module.exports = SimpleGenerator;