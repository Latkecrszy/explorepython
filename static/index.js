document.addEventListener("click", x => {if (x.target.matches("#hamburger") || x.target.matches("#line1") || x.target.matches("#line2") || x.target.matches("#line3")) {document.getElementById("hamburger").classList.toggle("expand"); document.getElementById("hamburger_dropdown").classList.toggle("expand")}})

const home_variables = {
    input: null,
    output: null
}


home_variables['input'] = CodeMirror(document.getElementById("right"), {
    value: `import random
greetings = ['Welcome to ExplorePython!', 'Glad to have you at ExplorePython!']
class ExplorePython:
    def __init__(self, greetings):
        self.greetings = greetings

    def welcome(self):
        print(random.choice(self.greetings))


explore_python = E`,
    mode: "python",
    lineNumbers: true,
    theme: "theme",
    indentUnit: 4,
    lineWrapping: true
})


home_variables['output'] = CodeMirror(document.getElementById("right"), {
    value: ">>> ",
    mode: "python",
    lineNumbers: true,
    theme: "theme",
    indentUnit: 4,
    lineWrapping: true
})

home_variables['input'].setSize(window.innerWidth / 2.2, window.innerHeight / 2.7)
home_variables['output'].setSize(window.innerWidth / 2.2, window.innerHeight / 3)

const runButton = document.createElement("button")
runButton.addEventListener("click", (e) => run(e))
runButton.id = "run"
runButton.classList.add("run")
runButton.innerText = "Run ❯"
document.getElementById("right").children[0].appendChild(runButton)
write()
async function write() {
    let complete = "xplorePython(greetings)\nexplore_python.welcome()"
    let newText
    while (complete !== "") {
        newText = home_variables['input'].getValue()
        newText += complete[0]
        complete = complete.substring(1)
        home_variables['input'].setValue(newText)
        await sleep(75)
    }
    home_variables['input'].focus()
    home_variables['input'].setCursor({
             line: 11,
             ch: 24,
           });
    await sleep(500)
    const results = await execute(home_variables['input'].getValue())
    home_variables['output'].setValue(results['run']['stdout']+results['run']['stderr']+'>>> ')
}

