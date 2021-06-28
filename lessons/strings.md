# Strings
## What is a string?
The first data type we'll learn about is strings. 
Strings are simple to define: A string is any character or characters enclosed in quotes. 
`"Hello, World!"` is an example of a string.
Notice how the string has quotes denoting the beginning and end, with all the content in between. 
Either single (`'`) or double (`"`) quotes can be used.
## Can a number be a string too?
Yes! `"10"` would be a perfectly valid string. 
However, you may have noticed in the last lesson that the variable we defined had no quotes around it. 
This is because it wasn't a string, but an integer. An integer is a whole number (positive or negative). We'll learn more about these later on.
It's important to note, however, that `"10"` is not the same as `10`. They have different types: string and integer. 
Try typing in `print(type("10"))` in the box on the bottom right, and then pressing enter. 
You'll see that it says `<class 'str'>`, meaning that it is a string. (str is short for string.)
Trying the same with `print(type(10))` will result in `<class 'int'>`, showing that it is an integer. (int is short for integer.)
## What do you do with strings?
Strings are one of the most commonly used data types in programming. 
They are often for holding text, just like the article you're reading now.
In fact, this article was stored in a string too!
Whether you want to display information, take in user input, or do anything with text, strings are an absolute necessity.
## Your turn!
It's your turn to try your hand at making a string. 
Think back to the previous lesson where we created a variable. The syntax was `variable_name = value`.
This is how all Python variables are created. Here's an example: `job = "Programmer"`. 
In that example, I defined the variable `job` as having the value of `"Programmer"`.
You can do this with any word and value. 
Now, to display this variable to the screen, I could do `print(job)`, because the variable's name is `job`. 
Notice that when I use the variable, there are no quotes around it.
You'll never put a variable name in quotes when using it. 
Also keep in mind that variable names ***cannot*** include spaces. You can use underscores to separate words instead.
Try it out in the box on the upper right, and display your variable's value with `print(variable_name)` to see if it worked! 
(Replace `variable_name` with whatever you name your variable.)
Once you've succeeded, click Next to continue.