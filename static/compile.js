function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
// Initialize variables
let codeArea;
let expected_output;
let output;
const lessons_to_nums = {"intro": 0, "variables": 1, "strings": 2, "builtins": 3, "ints_and_floats": 4,
    "math": 5, "booleans": 6, "if_statements": 7, "lists": 8, "dictionaries": 9, "functions": 10}
const nums_to_lessons = {0: 'intro', 1: 'variables', 2: 'strings', 3: 'builtins', 4: 'ints_and_floats',
    5: 'math', 6: 'booleans', 7: 'if_statements', 8: 'lists', 9: 'dictionaries', 10: 'functions'}
const responses = ["Great job!", "Good work!", "Great work!", "Good work!", "Nicely done!", "Nice job!", "Nice work!", "Well done!"]


// Create the main function
async function main() {
    const response = await (await fetch(`/lesson?name=${localStorage.getItem('lesson')}`)).json()
    console.log(response)
    document.getElementById("left").innerHTML = response['lesson']
    expected_output = response['expected_output']
    codeArea = CodeMirror(document.getElementById("right"), {
        value: response['code'],
        mode: "python",
        lineNumbers: true,
        theme: "theme",
        indentUnit: 4
    });
    console.log(response['name'])
    if (response['name'] === "intro") {document.getElementById("back").classList.add("invalid")}
    let spacer = document.createElement("div")
    spacer.id = "spacer"
    let runButton = document.createElement("button")
    runButton.addEventListener("click", () => run())
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
    output = createShell('>>> ')
    document.body.appendChild(clearButton)
    codeArea.setSize(window.innerWidth / 2, window.innerHeight / 1.7)
}


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
    await checkResults(results['run'], code)
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


async function checkResults(results, code) {
    console.log(expected_output)
    console.log(results)
    if (results['stderr'] !== '') {
        console.log("error")
        let newResults = results['stderr'].split("line")[0]
        newResults = results['stderr'].replace(newResults, '')
        return await send_notif("error", `Error: \n${newResults}\nTry again!`)
    }
    if (!results['stdout'].match(expected_output['output'])) {
        console.log("Incorrect output")
        console.log(results['stdout'])
        if (results['stdout'] === '\n') {
            return await send_notif("incorrect_output", `Incorrect output. Try again!`)
        }
        return await send_notif("incorrect_output", `Incorrect output: \n${results['stdout']}\nTry again!`)
    }
    for (let i of expected_output['input']) {
        if (i.includes("*|*")) {
            i = i.split("*|*")
            const check = (array, input) => array.some(item => input.includes(item));
            if (!i.some(item => code.includes(item))) {

            }
        }
        if (!code.includes(i)) {
        console.log("Incorrect input")
        return await send_notif("incorrect_input", `You got the right result, but your code does not use the method required. Try again!`)
        }
    }

    console.log("Correct")
    let response = responses[Math.floor(Math.random()*responses.length)];
    document.getElementById("next").classList.add("valid")
    return await send_notif("correct", `${response} Click Next to continue!`)
}


async function send_notif(status, text) {
    let notif = document.getElementById("notif")
    if (status === "correct") {
        notif.style.border = "3px solid #22e325"
    }
    else if (status.includes("incorrect")) {
        notif.style.border = "3px solid #f5aa20"
    }
    else if (status === "error") {
        notif.style.border = "3px solid #f53520"
    }
    notif.innerText = text
    notif.style.display = "block"
    for (let i=0; i<=1; i+=0.01) {
        notif.style.opacity = i.toString()
        await sleep(5)
    }
    await sleep(10000)
    for (let i=1; i>=0; i-=0.01) {
        await sleep(5)
        notif.style.opacity = i.toString()
    }
    notif.style.display = "none"
}


function nextLesson(prev) {
    let lessonNum;
    if (prev) {
        lessonNum = lessons_to_nums[localStorage.getItem('lesson')]-1
        if (document.getElementById("back").classList.contains("invalid")) {return}
    }
    else {
        lessonNum = lessons_to_nums[localStorage.getItem('lesson')]+1
        if (!document.getElementById("next").classList.contains("valid")) {return}
    }
    let newLesson = nums_to_lessons[lessonNum]
    localStorage.setItem("lesson", newLesson)
    location.reload()
}

// When the page first loads, make the code check if there is already the key "lesson" in localstorage.
// If not, it creates one `"lesson": "intro"`
// It then passes it to the endpoint in the python
// When the user signs up for an account, it checks the localstorage to see if they have made progress.
// If they have, instead of setting their current lesson to "intro", it sets it to the one in localstorage.
