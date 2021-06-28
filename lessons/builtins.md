# Builtins
## What are builtins?
You may have noticed that we've been using `print()` in our previous code. 
You didn't know it at the time, but that was your first time using a builtin! 
A builtin is a function that is built into Python and can be used automatically. So what is a function?
A function is a block of code takes input and then gives output, and can be used multiple times. 
`print()` is an example of a function. The input it takes, called parameters, goes inside the parentheses.
This is why to print out a variable, we put its name inside the parentheses after `print`. 
We'll learn how to make our own functions with input and output later, but right now we're dealing only with the builtins.

## Are there builtins besides print?
Of course! There are many builtins in Python, about 69, and they all serve a unique purpose. 
Besides `print()`, you'll also learn about `input()`, `min()`, `max()`, `str()`, `int()`, and more. 
Right now, we're going to learn `input()`.
`input()` is a bit of an outlier compared to other builtin functions, because it has two forms of output instead of just one. 
It both prints to the console and returns a value in the code. So, how does it do this?
The purpose of `input()` is to take input from a user. 
So whatever we pass into its parentheses will be printed into the console (just like `print()`), and it will wait for a user response.
Once the user types something in and presses enter, that value will be given back in the code.
Here's an example: Let's say I have the program `name = input("What is your name?")`.
With this, I am creating a variable called `name` and setting it equal to whatever the user types in.
First, `"What is your name?"` would be printed in the console (displayed in the bottom right box). 
Then, the program waits for the user to type something in and press enter. 
Finally, the text that the user typed in is stored in the variable `name`, because that's what I defined it as.
This concept can be confusing at first, but once you see it in action it becomes more clear what it does.

## You try!
It's your turn to try taking user input with `input()`! You'll notice that there is no code in the box to start with.
As you progress through the lessons, code will become more sparse as you become more skilled at writing your own.
You're always free to refer back to previous lessons for their code examples as well. 
The program that you write should create a variable by asking for user input and storing it.
Then, it should print out the value that the user puts in. 
Keep in mind that you are the user here - your code output will display in the console below, 
and you will be responsible for putting in your own input. 
