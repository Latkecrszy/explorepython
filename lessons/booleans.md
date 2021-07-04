# Booleans
## What is a boolean?
A boolean is the simplest data type: it is a True or False value. 
The only two values that it can have is True or False. Anything else, and it is no longer a boolean.

## How do I make a boolean?
Booleans are unique in that they are created using a word, but not a string. 
The representation of true in python is `True`, and false is `False`. 
Python is case sensitive, meaning that capitalization matters, so make sure to capitalize the `T` in `True` and the `F` in `False`.
So, to make a boolean all you need to do is make a variable with a value of either `True` or `False`.
Here's an example: `x = True` creates a boolean called `x` with a value of `True`. `x = False` would make it `False`.

## Why would I use booleans?
The use case of a boolean is usually in a loop or an if statement, both of which will be covered in later lessons.
In a nutshell, an if statement determines if a condition is met, and a loop runs until a condition is not met.
Booleans are useful in this case, because you can directly check if a value is true or false. 
We'll go into more detail about this in the next lesson.

## Can other types be booleans?
Absolutely. 
Just like we have `str()` for strings, `int()` for integers, and `float()` for floats, we have `bool()` for booleans.
`bool()` behaves interestingly compared to the other builtins that convert type. It makes use of something called 
`truthy` and `falsey` values. These are what determine if something is converted to `True` or `False`. 
As a rule of thumb, if something has content (like a non-empty string or a number other than 0) then it is `truthy`,
and if it does not have content (like an empty string), then it is `falsey`. There are two exceptions to this, however:
`1` an `0`. Instead of being `truthy` or `falsey`, they are `True` or `False`! 
If you type in `print(1 == True)` in the console (bottom right box), it will display `True`. 
This is because `1` is exactly equal to `True`, and `0` is exactly equal to `False`. 
We will make use of these `truthy` and `falsey` values when we get to making loops and if statements.

## You try!
It's your turn to use booleans in your code. 
For this assignment, you'll write code to convert 3 different variables to booleans with `bool()`. 
Just like before, to change the value of a variable, you can't just do `bool(variable_name)`, 
you have to redefine it like `variable_name = bool(variable_name)`.
After converting the variables to booleans, print them out to see which are `truthy` and which are `falsey`. Good luck!
