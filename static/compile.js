let codeArea = CodeMirror(document.getElementById("right"), {
            value: `print('Hello, World!')
# This is a comment
hello = "hi"
class Testing:
    def __init__(self, test):
        self.testing = test

    def test(self):
        print(hello)
        return self.testing

print(Testing("test").test())`,
            mode:  "python",
            lineNumbers: true,
            theme: "theme",
            indentUnit: 4
        });
let spacer = document.createElement("div")
spacer.id = "spacer"
let runButton = document.createElement("button")
runButton.addEventListener("click", () => {run()})
runButton.id = "run"
runButton.classList.add("run")
runButton.innerText = "Run ❯"
let clearButton = document.createElement("button")
clearButton.addEventListener("click", () => clear())
clearButton.id = "clear"
clearButton.classList.add("run")
clearButton.innerText = "Clear"
document.getElementById("right").appendChild(runButton)
document.getElementById("right").appendChild(spacer)
let output;
output = createShell('>>> ')
document.body.appendChild(clearButton)
codeArea.setSize(window.innerWidth/2, window.innerHeight/1.7)
async function run() {
    let code = codeArea.getValue()
    console.log(code)
    let results = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: 'POST',
        body: JSON.stringify({"language": "python", "version": "3.9.4", "files": [{"name": "code.py", "content": code}]})})

    console.log(results)
    results = await results.json()
    console.log(results)
    let previousOutput = output.getValue()
    output = createShell(previousOutput+'\n'+results['run']['stdout']+results['run']['stderr']+'\n>>> ')
    document.getElementById("right").children[3].remove()
}

function createShell(value) {
    output = CodeMirror(document.getElementById("right"), {
        value: value,
            mode: "python",
            lineNumbers: true,
            theme: "theme",
            indentUnit: 4}
    )
    output.setSize(window.innerWidth/2, window.innerHeight/2.57-60)
    keyBind(output)
    return output
}


function clear() {
    createShell('>>> ')
    document.getElementById("right").children[3].remove()
}

function keyBind(editor) {
    editor.setOption("extraKeys", {
        Enter: async () => {
            let content = editor.getValue()
            let splitContent = content.split(">>> ")
            console.log(splitContent)
            content = splitContent[content.split(">>> ").length-1]
            console.log(content)
            let results = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: 'POST',
                body: JSON.stringify({"language": "python", "version": "3.9.4", "files": [{"name": "code.py", "content": content}]})
            })
            results = await results.json()
            let previousOutput = output.getValue()
            output = createShell(previousOutput+'\n'+results['run']['stdout']+results['run']['stderr']+'\n>>> ')
            document.getElementById("right").children[3].remove()
        }
    })
}
