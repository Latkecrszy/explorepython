# Functions
## What are functions?
As mentioned previously, a function is a piece of code that takes input and returns output based on that input.
If you think that sounds daunting to use and write, remember that we've already been using some - all the builtins
we've been using are pre-made functions! In this lesson, we'll be learning how to make our own custom functions.
The syntax for making a function is pretty simple `def function_name(parameters):`. Take a look at this example of a 
function to add two numbers and how we use it.
```python
def add_numbers(number1, number2):
    return number1 + number2

total = add_numbers(5, 10)
print(total)
```
Let's break down this code.
- On line 1, we are creating our function. Notice how we start with `def`. `def` stands for define, and lets Python know
  that we're making a function. Next, we have `add_numbers`. This is the name of the function, and it's what we'll use 
  to call it later. (Calling a function means using it.) Inside the parentheses are the function parameters. 
  Parameters are information that is passed into the function to be used inside it. In this case, our parameters are 
  two numbers that we add together inside the function. Finally, we end it all with a colon to let Python know we're done.
  
- On line 2, we return information from the function. We do this with a new keyword: `return`. `return` designates 
  which information is passed out of the function and back into the code. For example, when we use `str()`, that 
  is a function that returns a stringified version of whatever parameters we pass into the parentheses. In our function,
  we're returning the sum of the two numbers that were passed in as parameters.
  
- On line 3, we're creating a variable called `total` and giving it the value of whatever our function returns. In this 
  case, its value will be `15` because we passed in `5` and `10` as the parameters, and their sum is being returned.
  Notice how we separate our parameters with a comma. This is important, as otherwise Python won't know where to separate them.
  
- On line 4, we're printing out `total` to the console.

And that's it! That's all that you need to make a function. As you get more experience writing and using functions,
the process of doing so will become easier and faster each time.

## What is scope?
Scope in programming represents the places in which certain variables can be used. Here's an example: the main part of your code
is the global scope, meaning that the variables created there can be accessed and used anywhere. However, inside of functions is a 
different scope. We can still access all the variables from the global scope, but the global scope cannot access variables
in a function's scope. This has an important impact when editing variables. If we have `x = 5` in the global scope 
(not inside a function), and we want to change `x` to `7` inside of our function, then we have to return the new value
for x from our function (using the `return` keyword) and change `x` to `7` on the global scope. Otherwise, the variable
will be changed inside the function but not in the outside code, resulting in confusion and problems. To sum this all up,
editing or creating variables inside a function will not edit or create them in the rest of the code. To edit or create
them on the outside, you must return them from the function and change them in the global scope.

## You try!
It's your turn to try making a function of your own. Your function will be called `add_strings`, and it will take in 
two strings as parameters. Inside the function, add the two strings together and return the result. In the outside code,
call your function (don't forget to pass in the two strings for parameters) and print the output. Keep in mind that 
you must create your function before you use it. Trying to use the function and create it after will result in an error.
Good luck!