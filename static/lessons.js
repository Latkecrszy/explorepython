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
let variables = {
    codeAreas: {desktop: {input: null, output: null}, mobile: {input: null, output: null}},
    expected_output: null,
    statements: [],
    original_statements: [],
    input_responses: [],
    lesson: localStorage.getItem('lesson'),
    last_lesson: localStorage.getItem('last_lesson'),
    lesson_info: null,
    hints: null,
    hint: 0
}
const lessons_to_nums = {"intro": 0, "variables": 1, "strings": 2, "builtins": 3, "ints_and_floats": 4,
    "math": 5, "booleans": 6, "if_statements": 7, "while_loops": 8, "lists": 9, "for_loops": 10, "functions": 11, "final": 12}
const nums_to_lessons = {0: 'intro', 1: 'variables', 2: 'strings', 3: 'builtins', 4: 'ints_and_floats',
    5: 'math', 6: 'booleans', 7: 'if_statements', 8: 'while_loops', 9: 'lists', 10: 'for_loops', 11: "functions", 12: "final"}
const responses = ["Great job!", "Good work!", "Great work!", "Good work!", "Nicely done!", "Nice job!", "Nice work!", "Well done!"]


// Create the desktop version of the website
const createDesktop = async () => {
    // Get the lesson, code example, and expected output from the API
    if (variables['lesson'] === null) {variables['lesson'] = 'intro'}
    if (variables['last_lesson'] === null) {variables['last_lesson'] = 'intro'}
    const lesson_info = await (await fetch(`/lesson?name=${variables['lesson']}`)).json()
    variables['lesson_info'] = lesson_info
    variables['expected_output'] = lesson_info['expected_output']
    variables['hints'] = lesson_info['hints']
    document.getElementById("left").innerHTML = lesson_info['lesson']
    // Create the editor
    let code = lesson_info['code']
    if (localStorage.getItem('answers')) {
        if (JSON.parse(localStorage.getItem('answers'))[lesson_info['name']]) {
            code = JSON.parse(localStorage.getItem('answers'))[lesson_info['name']]
        }
    }
    variables['codeAreas']['desktop']['input'] = CodeMirror(document.getElementById("right"), {
        value: code,
        mode: "python",
        lineNumbers: true,
        theme: "theme",
        indentUnit: 4,
        lineWrapping: true
    });
    variables['codeAreas']['desktop']['input'].setSize(window.innerWidth / 2, window.innerHeight / 1.7)
    // Disable the back button if on the first lesson
    if (lesson_info['name'] === "intro") {
        document.getElementById("back_desktop").classList.add("invalid")
    }

    // Create the page components
    const spacer = document.createElement("div")
    spacer.classList.add("spacer")
    spacer.id = "spacer_desktop"
    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("button_container")
    const runButton = document.createElement("button")
    runButton.addEventListener("click", (e) => run(e))
    runButton.id = "run_desktop"
    runButton.classList.add("run")
    runButton.innerText = "Run ❯"
    const resetButton = document.createElement("button")
    resetButton.addEventListener("click", (e) => reset(e))
    resetButton.id = "reset_desktop"
    resetButton.classList.add("run")
    resetButton.innerText = "Reset"

    // Add the components to the page
    buttonContainer.append(resetButton, runButton)
    document.getElementById("right").append(buttonContainer, spacer)

    // Create the shell
    changeShell('desktop', '>>> ', true)
    const lessonNum = lessons_to_nums[variables['last_lesson']]
    if (lessonNum > lessons_to_nums[variables['lesson']]) {
        document.getElementById("next_desktop").classList.add("valid")
    }
    // Create the mobile page
    await createMobile()
}


// Create the mobile version of the website
async function createMobile() {
    // Create the lesson content
    document.getElementById("lesson_page_mobile\"").innerHTML = variables['lesson_info']['lesson']
    // Add the jump to code section text
    document.getElementById("lesson_page_mobile\"").innerHTML += "<p id='jump_to_code' onclick=switchTab('code')>Go to Code</p>"
    // Create the editor
    variables['codeAreas']['mobile']['input'] = CodeMirror(document.getElementById("code_page_mobile"), {
        value: variables['lesson_info']['code'],
        mode: "python",
        lineNumbers: true,
        theme: "theme",
        indentUnit: 4,
        lineWrapping: true
    });
    variables['codeAreas']['mobile']['input'].setSize(window.innerWidth, window.innerHeight / 2.5)

    // Create the page components
    const spacer = document.createElement("div")
    spacer.classList.add("spacer")
    spacer.id = "spacer_mobile"
    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("button_container")
    buttonContainer.id = "button_container_mobile"
    const runButton = document.createElement("button")
    runButton.addEventListener("click", (e) => run(e))
    runButton.id = "run_mobile"
    runButton.classList.add("run")
    runButton.innerText = "Run ❯"
    const resetButton = document.createElement("button")
    resetButton.addEventListener("click", (e) => reset(e))
    resetButton.id = "reset_mobile"
    resetButton.classList.add("run")
    resetButton.innerText = "Reset"

    // Add the components to the page
    buttonContainer.append(resetButton, runButton)
    document.getElementById("code_page_mobile").append(buttonContainer, spacer)
    document.getElementById("code_page_mobile").appendChild(spacer)
    changeShell('mobile', '>>> ', true)

    // Hide the code page
    document.getElementById("code_page_mobile").style.display = "none"
    // Allow them to move forward if they've completed this one
    const lessonNum = lessons_to_nums[variables['last_lesson']]
    if (lessonNum > lessons_to_nums[variables['lesson']]) {
        document.getElementById("next_mobile").classList.add("valid")
    }
    // Don't let them move back on the first lesson
    if (variables['lesson_info']['name'] === "intro") {
        document.getElementById("back_mobile").classList.add("invalid")
    }
    addLessonsContent()
}


// Add content to the lessons menu
function addLessonsContent() {
    // Iterate through the lesson names
    for (const lessonName in lessons_to_nums) {
        // Create a lesson div
        let newLesson = document.createElement("div")
        newLesson.classList.add("nav_lesson")
        // Set its text to the name of the lesson it navigates to
        newLesson.innerText = lessonName.replaceAll("_", " ").capitalize()
        // Check if they have been to this lesson yet
        if (lessons_to_nums[lessonName] <= lessons_to_nums[variables['last_lesson']]) {
            // If they have, add a click listener that takes them to that lesson
            newLesson.addEventListener("click", () => {
                localStorage.setItem('lesson', lessonName)
                location.reload()}
            )
            newLesson.classList.add("available")
        }
        else {
            // If they haven't, disable the lesson
            newLesson.classList.add("unavailable")
        }
        // Add the lesson to the lessons menu
        document.getElementById("lessons").appendChild(newLesson)
    }
}


// Show the lessons menu
function showLessons() {
    const lessons = document.getElementById("lessons")
    lessons.classList.add("visible")
    lessons.classList.remove("invisible")
}


// Hide the lessons menu
function hideLessons() {
    const lessons = document.getElementById("lessons")
    lessons.classList.add("invisible")
    lessons.classList.remove("visible")
}


// Execute code and return the output
async function execute(code) {
    const results = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: 'POST',
        body: JSON.stringify({"language": "python", "version": "3.9.4", "files": [{"name": "main.py", "content": code}]})})
    return await results.json()
}


// Change the content of the shell editor
function changeShell(platform, content, create = false) {
    let output
    if (platform === 'desktop') {
        // Recreate the codeArea on the desktop version
        output = CodeMirror(document.getElementById("right"), {
            value: content,
            mode: "python",
            lineNumbers: true,
            theme: "theme",
            indentUnit: 4,
            lineWrapping: true}
        )
        output.setSize(window.innerWidth/2, window.innerHeight/2.57-60)
    }
    else if (platform === 'mobile') {
        // Recreate the codeArea on the mobile version
        output = CodeMirror(document.getElementById("code_page_mobile"), {
            value: content,
            mode: "python",
            lineNumbers: true,
            theme: "theme",
            indentUnit: 4,
            lineWrapping: true}
        )
        output.setSize(window.innerWidth, window.innerHeight/2.57)
    }
    if (!create) {
        if (platform === 'desktop') {
            document.getElementById("right").children[3].remove()
        }
        else {
            document.getElementById("code_page_mobile").children[3].remove()
        }

    }
    keyBind(output, platform)
    variables['codeAreas'][platform]['output'] = output
}


// Switch the current tab on mobile
function switchTab(tab) {
    let other_tab
    if (tab === 'lesson') {
        tab = document.getElementById('tab_mobile_lesson')
        other_tab = document.getElementById('tab_mobile_code')
        document.getElementById("lesson_page_mobile\"").style.display = "block"
        document.getElementById("code_page_mobile").style.display = "none"
        document.getElementById("clear_mobile").style.display = "none"
    }
    else {
        tab = document.getElementById('tab_mobile_code')
        other_tab = document.getElementById('tab_mobile_lesson')
        document.getElementById("lesson_page_mobile\"").style.display = "none"
        document.getElementById("code_page_mobile").style.display = "flex"
        document.getElementById("clear_mobile").style.display = "block"
    }
    tab.classList.add("selected")
    tab.classList.remove("deselected")
    other_tab.classList.add("deselected")
    other_tab.classList.remove("selected")
}

// Listener for the run button
async function run(event) {
    send_notif("loading", "Running code...")
    let platform
    // Define the platform
    event.target.id === 'run_desktop' ? platform = 'desktop' : platform = 'mobile'
    // Grab the code from the codeArea
    let code = variables['codeAreas'][platform]['input'].getValue()
    // Handle input statements
    if (code.includes("input(")) {
        return input(platform)
    }
    // Run the code
    let results = await execute(code)
    // Show their output
    let previousOutput = variables['codeAreas'][platform]['output'].getValue()
    variables['codeAreas'][platform]['output'].setValue(previousOutput+'\n'+results['run']['stdout']+results['run']['stderr']+'\n>>> ')
    //changeShell(platform, previousOutput+'\n'+results['run']['stdout']+results['run']['stderr']+'\n>>> ')
    // Check their results
    focusMouse(platform)
    await checkResults(results['run'], code)
}


// Check the results of their code
async function checkResults(results, code) {
    const expected_output = variables['expected_output']
    let output = results['stdout']
    if (results['stderr'] !== '') {
        let newResults = results['stderr'].split("line")[0]
        newResults = results['stderr'].replace(newResults, '')
        return await send_notif("error", `Error: \n${newResults}\nTry again!`)
    }
    for (const pattern of expected_output['output']) {
        if (pattern === '#') {
            if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].some(item => output.includes(item))) {
                return await send_notif("incorrect_output", `Incorrect output, must include integers. Try again!`)
            }
            continue
        }
        else if (pattern === "*") {
            if (output === '\n') {
                return await send_notif("incorrect_output", `Output must contain content. Try again!`)
            }
            continue
        }
        else if (pattern.startsWith("range")) {
            const startRange = parseInt(pattern.split("range(")[1].split(", ")[0])
            const endRange = parseInt(pattern.split("range(")[1].split(", ")[1].replace(")", ""))
            for (let x = startRange; x < endRange; x++) {
                const expectedNumber = x === startRange ? `${x}\n`: `\n${x}\n`
                if (!output.includes(expectedNumber)) {
                    return await send_notif("incorrect_output", `Incorrect output: Does not include ${x}. Try again!`)
                }
            }
            continue
        }
        if (!pattern.split("|").some(item => output.includes(item))) {
            if (output === '\n') {
                return await send_notif("incorrect_output", `Incorrect output. Try again!`)
            }
            console.log(pattern.split("|").some(item => output.includes(item)))
            console.log(pattern.split("|"))
            return await send_notif("incorrect_output", `Incorrect output: \n${results['stdout']}\nTry again!`)
        }
        console.log("iterating")
        let remove
        for (let x of pattern.split("|")) {
            if (output.includes(x)) {
                remove = x
                break
            }
        }
        output.replace(remove, '')
    }
    if (expected_output['input']['excludes'].some(item => results['stdout'].match(item))) {
        return await send_notif("incorrect_input", `You got the right result, but your code uses a method that is not allowed. Try again!`)
    }
    for (const i of expected_output['input']['includes']) {
        console.log(code.includes(i))
        if (i === "'") {
            if (!["'", '"'].some(item => code.includes(item))) {
                return await send_notif("incorrect_input", `You got the right result, but your code does not use the method required. Try again!`);
            }
        }
        else {
            let occurred = false
            code.split("\n").forEach((x) => {
                if (x.includes(i) && !(x[0] === '#')) {
                    occurred = true
                }
            })
            if (!occurred) {
                return await send_notif("incorrect_input", `You got the right result, but your code does not use the method required. Try again!`);
            }
        }
        code = code.replace(i, '')
    }
    const response = responses[Math.floor(Math.random()*responses.length)];
    if (variables['lesson'] !== 'final') {
        document.getElementById("next_desktop").classList.add("valid")
        document.getElementById("next_mobile").classList.add("valid")
    }

    return await send_notif("correct", `${response} Click Next to continue!`)
}


function keyBind(editor, platform) {
    editor.setOption("extraKeys", {
        Enter: async () => {
            let content = editor.getValue()
            let splitContent = content.split(">>> ")
            content = splitContent[content.split(">>> ").length-1]
            let previousOutput = variables['codeAreas'][platform]['output'].getValue()
            console.log(variables['hints'])
            if (content === "hint") {
                if (variables['hint'] > variables['hints'].length-1) {
                    variables['codeAreas'][platform]['output'].setValue(previousOutput+'\nNo more hints available\n>>> ')
                }
                variables['codeAreas'][platform]['output'].setValue(previousOutput+'\n'+variables['hints'][variables['hint']]+'\n>>> ')
                return variables['hint']++
            }
            else if (content.startsWith('hint(') && content.endsWith(')')) {
                return variables['codeAreas'][platform]['output'].setValue(previousOutput+'\n'+variables['hints'][content.split('(')[1].split(')')[0]]+'\n>>> ')
            }
            let results = await execute(content)
            variables['codeAreas'][platform]['output'].setValue(previousOutput+'\n'+results['run']['stdout']+results['run']['stderr']+'\n>>> ')
            focusMouse(platform)
        }
    })
}


async function send_notif(status, text) {
    let notif = document.getElementById("notif_desktop")
    notif.style.display = "none"
    notif.style.opacity = "0"
    if (status === "correct") {
        notif.style.border = "3px solid #22e325"
    }
    else if (status.includes("incorrect")) {
        notif.style.border = "3px solid #f5aa20"
    }
    else if (status === "error") {
        notif.style.border = "3px solid #f53520"
    }
    else if (status === "loading") {
        notif.style.border = "3px solid #a9c916"
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


function changeLesson(direction, platform) {
    let nextLesson
    if (direction === 'next') {
        if (!document.getElementById(`next_${platform}`).classList.contains("valid")) {
            return
        }
        nextLesson = lessons_to_nums[variables['lesson']]+1
    }
    else if (direction === 'back') {
        if (document.getElementById(`back_${platform}`).classList.contains("invalid")) {
            return
        }
        nextLesson = lessons_to_nums[variables['lesson']]-1
    }
    if (nextLesson > lessons_to_nums[variables['last_lesson']]) {
        localStorage.setItem("last_lesson", nums_to_lessons[nextLesson])
    }
    let answers
    if (!localStorage.getItem('answers')) {
        answers = {}
    }
    else {
        answers = JSON.parse(localStorage.getItem('answers'))
    }
    answers[variables['lesson']] = variables['codeAreas'][platform]['input'].getValue()
    localStorage.setItem('answers', JSON.stringify(answers))
    localStorage.setItem("lesson", nums_to_lessons[nextLesson])
    location.reload()
}


async function input(platform) {
    let code = variables['codeAreas'][platform]['input'].getValue()
    code = code.split("input")
    for (const part of code) {
        if (part.startsWith('(')) {
            variables['original_statements'].push(part.split('(')[1].split(')')[0])
            let results = await execute(`print(${part.split('(')[1].split(')')[0]})`)
            variables['statements'].push(results['run']['stdout'].replace("\n", ""))
        }
    }
    if (variables['statements'].length !== 0) {
        let previousOutput = variables['codeAreas'][platform]['output'].getValue()
        variables['codeAreas'][platform]['output'].setValue(previousOutput + '\n' + variables['statements'][0])
        keyBindInput(variables['codeAreas'][platform]['output'], variables['statements'][0], platform)
    }
    focusMouse(platform)
}

async function nextQuestion(question, platform) {
    let previousOutput = variables['codeAreas'][platform]['output'].getValue()
    if (variables['statements'].indexOf(question)+1 === variables['statements'].length) {
        let code = variables['codeAreas'][platform]['input'].getValue()
        code = code.split("input")
        for (let part of code) {
            if (part.startsWith('(')) {
                let originalPart = `${part}`
                code[code.indexOf(originalPart)] = part.replace(`(${variables['original_statements'][variables['statements'].indexOf(question)]})`, `"${variables['input_responses'][variables['statements'].indexOf(question)]}"`)
            }
        }
        code = code.join('')
        let results = await execute(code)
        variables['codeAreas'][platform]['output'].setValue(previousOutput + '\n' + results['run']['stdout'] + '\n>>> ')
        variables['input_responses'] = []
        variables['statements'] = []
        variables['original_statements'] = []
        keyBind(variables['codeAreas'][platform]['output'])
        return await checkResults(results['run'], variables['codeAreas'][platform]['input'].getValue())
    }
    variables['codeAreas'][platform]['output'].setValue(previousOutput + '\n' + variables['statements'][variables['statements'].indexOf(question)+1])
    keyBindInput(variables['codeAreas'][platform]['output'], variables['statements'][variables['statements'].indexOf(question)+1], platform)
    focusMouse(platform)

}

function keyBindInput(editor, question, platform) {
    editor.setOption("extraKeys", {
        Enter: async () => {
            let content = editor.getValue()
            content = content.split("\n")
            content = content[content.length-1]
            if (content.occurrences(question) === 1) {content = content.replaceAll(`${question}`, "")}
            else {
                while (content.occurrences(question) > 1) {
                    content = content.replace(`${question}`, "")
                }
            }
            variables['input_responses'].push(content)
            focusMouse(platform)
            await nextQuestion(question, platform)
        }
    })
}

// Reset the code box
function reset(event) {
    // Check the platform
    const platform = event.target.id === 'reset_desktop' ? 'desktop' : 'mobile'
    // Set the code box to the original code
    variables['codeAreas'][platform]['input'].setValue(variables['lesson_info']['code'])
}

// Focus the cursor in the console
function focusMouse(platform) {
    // Get the number of lines
    const lines = variables['codeAreas'][platform]['output'].getValue().split("\n").length
    // Find the length of the last line
    const lastChar = variables['codeAreas'][platform]['output'].getValue().split("\n")[lines-1].length
    // Focus the editor
    variables['codeAreas'][platform]['output'].focus()
    // Set the cursor position
    variables['codeAreas'][platform]['output'].setCursor({
             line: lines,
             ch: lastChar,
           });
}
