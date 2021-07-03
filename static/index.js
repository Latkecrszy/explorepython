// Centralize editor variables
const editors = {
    input: null,
    output: null
}

// Create the editor to write code
editors['input'] = CodeMirror(document.getElementById("right"), {
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

// Create the editor to output code
editors['output'] = CodeMirror(document.getElementById("right"), {
    value: ">>> ",
    mode: "python",
    lineNumbers: true,
    theme: "theme",
    indentUnit: 4,
    lineWrapping: true
})

// Set the sizes of the editors
editors['input'].setSize(window.innerWidth / 2.2, Math.max(250, window.innerHeight / 2.7))
editors['output'].setSize(window.innerWidth / 2.2, window.innerHeight / 3)

write()


async function write() {
    let complete = "xplorePython(greetings)\nexplore_python.welcome()"
    let newText
    while (complete !== "") {
        newText = editors['input'].getValue()
        newText += complete[0]
        complete = complete.substring(1)
        editors['input'].setValue(newText)
        await sleep(75)
    }
    await sleep(500)
    const results = await execute(editors['input'].getValue())
    editors['output'].setValue('>>> \n'+results['run']['stdout']+results['run']['stderr']+'>>> ')
}

async function runHome() {
    const results = await execute(editors['input'].getValue())
    editors['output'].setValue(editors['output'].getValue()+'\n'+results['run']['output']+'>>> ')
}
