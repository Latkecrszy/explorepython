function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.occurrences = function(substring) {
    return this.split(substring).length-1
}

// Initialize variables
let codeArea, expected_output, output;
const lessons_to_nums = {"intro": 0, "variables": 1, "strings": 2, "builtins": 3, "ints_and_floats": 4,
    "math": 5, "booleans": 6, "if_statements": 7, "modules": 8, "lists": 9, "dictionaries": 10, "functions": 11}
const nums_to_lessons = {0: 'intro', 1: 'variables', 2: 'strings', 3: 'builtins', 4: 'ints_and_floats',
    5: 'math', 6: 'booleans', 7: 'if_statements', 8: 'modules', 9: 'lists', 10: 'dictionaries', 11: 'functions'}
const responses = ["Great job!", "Good work!", "Great work!", "Good work!", "Nicely done!", "Nice job!", "Nice work!", "Well done!"]
let questions = []
let original_questions = []
let input_responses = []

// Create the main function
async function main() {
    const lesson = localStorage.getItem('lesson')
    const last_lesson = localStorage.getItem('last_lesson')
    console.log(last_lesson)
    const response = await (await fetch(`/lesson?name=${lesson}`)).json()
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

    // Add lessons into the menu
    const lessonNum = lessons_to_nums[last_lesson]
    const lessons = document.getElementById("lessons")
    for (let lessonName in lessons_to_nums) {
        let newLesson = document.createElement("div")
        newLesson.classList.add("nav_lesson")
        newLesson.innerText = lessonName.replaceAll("_", " ").capitalize()
        if (lessons_to_nums[lessonName] <= lessonNum) {
            newLesson.addEventListener("click", () => {
                localStorage.setItem('lesson', lessonName)
                location.reload()}
            )
            newLesson.classList.add("available")
        }
        else {
            newLesson.classList.add("unavailable")
            /*
            let lock = document.createElement("img")
            lock.src = "static/images/lock.png"
            newLesson.appendChild(lock)*/
        }
        lessons.appendChild(newLesson)
    }
    console.log(lessonNum)
    console.log(lessons_to_nums[lesson])
    if (lessonNum > lessons_to_nums[lesson]) {
        document.getElementById("next").classList.add("valid")
    }
}


async function run() {
    let code = codeArea.getValue()
    console.log(code)
    if (code.includes("input(")) {
        return input()
    }
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
        if (i === "'") {
            i = ["'", '"']
            console.log(i)
            console.log(i.some(item => code.includes(item)))
            if (!i.some(item => code.includes(item))) {
                return await send_notif("incorrect_input", `You got the right result, but your code does not use the method required. Try again!`)
            }
        }
        else {
            if (!code.includes(i)) {
                console.log("Incorrect input")
                return await send_notif("incorrect_input", `You got the right result, but your code does not use the method required. Try again!`)
            }
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


async function nextLesson(prev) {
    let nextLessonNum
    let currentLesson = localStorage.getItem("lesson")
    let lastLesson = localStorage.getItem("last_lesson")
    if (prev) {
        if (document.getElementById("back").classList.contains("invalid")) {return}
        nextLessonNum = lessons_to_nums[currentLesson]-1
    }
    else {
        if (!document.getElementById("next").classList.contains("valid")) {return}
        nextLessonNum = lessons_to_nums[currentLesson]+1
    }
    if (nextLessonNum > lessons_to_nums[lastLesson]) {
        console.log(nextLessonNum)
        console.log(lessons_to_nums[lastLesson])
        console.log(lastLesson)
        console.log(nums_to_lessons[nextLessonNum])
        localStorage.setItem("last_lesson", nums_to_lessons[nextLessonNum])
    }
    localStorage.setItem("lesson", nums_to_lessons[nextLessonNum])
    location.reload()
}


function show_lessons() {
    const lessons = document.getElementById("lessons")
    const open_lessons = document.getElementById("open_lessons")
    if (open_lessons.innerText.includes("❰")) {
        open_lessons.innerText = "View lessons ❱"
    }
    else {
        open_lessons.innerText = "Close lessons ❰"
    }
    if (lessons.classList.length === 0 || lessons.classList.contains("shrinking")) {
        lessons.classList.remove("shrinking")
        lessons.classList.add("expanding")
    }
    else if (lessons.classList.contains("expanding")) {
        lessons.classList.add("shrinking")
        lessons.classList.remove("expanding")
    }


}

document.addEventListener("click", (e) => {
    console.log(e.target.id)
    const lessons = document.getElementById("lessons")
    if (e.target !== lessons && !lessons.contains(e.target) && e.target !== document.getElementById("open_lessons")) {
        if (document.getElementById("lessons").classList.length !== 0) {
            document.getElementById("lessons").classList.add("shrinking")
        }

        document.getElementById("open_lessons").innerText = "View lessons ❱"
    }
})


async function input() {
    let code = codeArea.getValue()
    code = code.split("input")
    for (let part of code) {
        if (part.startsWith('(')) {
            original_questions.push(part.split('(')[1].split(')')[0])
            let results = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: 'POST',
                body: JSON.stringify({
                    "language": "python",
                    "version": "3.9.4",
                    "files": [{"name": "code.py", "content": `print(${part.split('(')[1].split(')')[0]})`}]
                })
            })
            console.log(part)
            console.log("using API")
            results = await results.json()
            questions.push(results['run']['stdout'].replace("\n", ""))
        }
    }
    if (questions.length !== 0) {
        let previousOutput = output.getValue()
        output = createShell(previousOutput + '\n' + questions[0])
        document.getElementById("right").children[3].remove()
        console.log(output.getValue())
        console.log(questions)
        keyBindInput(output, questions[0])
    }
}

async function nextQuestion(question) {
    let previousOutput = output.getValue()
    if (questions.indexOf(question)+1 === questions.length) {
        let code = codeArea.getValue()
        code = code.split("input")
        console.log(code)
        for (let part of code) {
            if (part.startsWith('(')) {
                let originalPart = `${part}`
                console.log(part)
                /*part = part.split(`${question}')`)
                console.log(part)
                part = part.join('')
                part = part.split("\n")
                part[0] = `"${input_responses[questions.indexOf(question)]}"`
                console.log(part)*/
                console.log(original_questions[questions.indexOf(question)])
                console.log(input_responses[questions.indexOf(question)])
                code[code.indexOf(originalPart)] = part.replace(`(${original_questions[questions.indexOf(question)]})`, `"${input_responses[questions.indexOf(question)]}"`)
            }
        }
        code = code.join('')
        console.log(code)
        let results = await fetch("https://emkc.org/api/v2/piston/execute", {
            method: 'POST',
            body: JSON.stringify({
                "language": "python",
                "version": "3.9.4",
                "files": [{"name": "code.py", "content": code}]
            })
        })
        console.log("using API")
        results = await results.json()
        console.log(results)
        output = createShell(previousOutput + '\n' + results['run']['stdout'])
        document.getElementById("right").children[3].remove()
        input_responses = []
        questions = []
        original_questions = []
        keyBind(output)
        return await checkResults(results['run'], codeArea.getValue())
    }
    output = createShell(previousOutput + '\n' + questions[questions.indexOf(question)+1] + '\n>>> ')
    document.getElementById("right").children[3].remove()
    keyBindInput(output, questions[questions.indexOf(question)+1])

}

function keyBindInput(editor, question) {
    editor.setOption("extraKeys", {
        Enter: async () => {
            console.log(question)
            let content = editor.getValue()
            console.log(content)
            content = content.split("\n")
            console.log(content)
            content = content[content.length-1]
            console.log(content)
            if (content.occurrences(question) === 1) {content = content.replaceAll(`${question}`, "")}
            else {
                while (content.occurrences(question) > 1) {
                    content = content.replace(`${question}`, "")
                }
            }
            console.log(content)
            input_responses.push(content)
            await nextQuestion(question)
        }
    })
}

// When the page first loads, make the code check if there is already the key "lesson" in localstorage.
// If not, it creates one `"lesson": "intro"`
// It then passes it to the endpoint in the python
// When the user signs up for an account, it checks the localstorage to see if they have made progress.
// If they have, instead of setting their current lesson to "intro", it sets it to the one in localstorage.
