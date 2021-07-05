# If Statements
## What is an if statement?
If statements are your first look at conditionals - statements that evaluate to booleans, `True` or `False`. 
We took a look at booleans last time, and now you'll learn about a major application for them.
If we want to determine the value of something in our code, we do that with if statements.
For example, say we used `input()` to ask a user for their age. We then wanted to check how old they were, 
to send a different message to each age group. To do that, we would use an if statement. 
Here's how one such program could look:

```Python
age = input("How old are you? ")
age = int(age)
if age > 20:
    print("Welcome, person over the age of 20!")
elif age < 20:
    print("Welcome, person under the age of 20!")
else:
    print("Welcome, 20 year old!")
```

Let's break this program down into small parts:
- On the first line, we define `age` as whatever the user responds with to the question `How old are you?`
- On the second line, we convert `age` to an integer, because `input()` always gives back a string, and we want their age to be a number.
- On the third line, we begin our if statement. `if age > 20` is our statement. 
  In this line, we have two parts: the required syntax (`if`), and the conditional (`age > 20`). 
  You may recognize `>` from math as being the greater-than sign. That's exactly what it means here.
  This statement checks if `age` is greater than `20`. 
  Finally, we end the statement with a colon to let Python know we're done writing it.
- On the fourth line, we put content inside the if statement. Notice how it's indented 
  (has whitespace before it, usually made with the tab key) more than the other lines. 
  This is to tell Python that the line of code will **only** be run if the above if statement is true. 
  If `age` is not more than 20, then the line indented below it will not run.
- On line 5, we use the `elif` keyword instead of `if`. `elif` stands for `else if`, and must **always** follow an if statement.
  Notice how it's not indented, meaning that it's not inside our first if statement - instead, it is the code following it.
  The purpose of `elif` is to run if the first if statement is not true. If `age` is not greater than 20, 
  the code will check if it is less than 20, because `elif age < 20` has a conditional of `age < 20`. 
  However, if `age` is more than 20, and the first if statement (`if age > 20`) is true, then `elif age < 20` will never run.
- On line 6, we put content inside the elif statement. This works in the same way that the `if` does. 
  If the conditional (`age < 20`) is not true, the content indented inside it will not run.
- On line 7, we get to the final part of the if statement: `else`. 
  This part has no conditional on it because it means 'if nothing above was true, run this code'. 
  Basically, if all the previous conditionals were false, we'd do the code inside the `else`. 
  But if any statements above were true, the code in the `else` will never run.
  
Whew! That was a lot to take in. If statements may seem complicated at first, but you'll quickly get the hang of them.

## How do I check things other than greater than and less than?
The greater than (`>`) and less than (`<`) signs are just two examples of relational operators (operators used in if statements).
Here is a guide to all the operators you can use:
- `>` - Greater than. Example: `if x > 5:`
- `<` - Less than. Example: `if x < 5:`
- `>=` - Greater than or equal to. Example: `if x >= 5:`
- `<=` - Less than or equal to. Example: `if x <= 5:`
- `==` - Equal to. Example: `if name == "foo":`
- `!=` - Not equal to. Example: `if name != "bar"`

## Booleans and if statements
In the first section, it was mentioned that conditionals evaluate to true or false. For example, the expression 
`5 == 5` would evaluate to true, while `5 == 4` would evaluate to false. But what if we just have a boolean?
Well, then we don't need any evaluation! Let's say `x = True`. If we want to check if x is True, we can just write
`if x:`, because it's already True. You can do something similar with variables that are false. If `x = False`, then
we can write `if not x` to check if it's false. You may remember that in the previous lesson, we learned about truthy and
falsey values. These can also be used with if statements - to check if a variable is truthy, you can do `if variable_name`,
and to check if it's false you can do `if not variable_name`.

## Your turn!
It's now your turn to make an if statement of your own. For this, you'll take user input and ask the user for their name.
Then, use an if statement to check if they put in your name. If they did, print out a message about it. 
If they didn't, also print out a different message about it. Remember that all if statements have to end in a colon (`:`).
You'll want to use `else` to check if they put in any other name. Good luck, and read the examples above if you need help.
  
