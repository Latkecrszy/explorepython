# While loops
## What is a while loop?
In Python, there are two kinds of loops: for loops and while loops.
The key difference between the two is what they're meant to accomplish:
while loops run until a condition is no longer met (for example, `while x > 10`), and for loops run an exact number of times.
In this lesson, we'll be learning about while loops, and for loops will come a bit later.

## When would I use a while loop?
While loops are extremely useful for things like keeping games running. For example, 
you never know how long a user is going to play a game, so using a while loop to run the game as long as they haven't
stopped it is important. As a rule of thumb, if you don't know exactly how many times you are going to run the loop,
you need to use a while loop.

## How do I write a while loop?
The syntax for a while loop is very similar to the syntax for an if statement; in fact, it's almost identical!
The only difference is replacing the word `if` with the word `while`. Here's an example of a while loop:
```Python
running = "running"
while running == "running":
    print("Loop is running.")
    run_again = input("Should we run the loop again? ")
    if run_again == "no":
        running = "not running"
```
Let's break down this code:
- On line 1, we create a variable called `running` with a value of `"running"`.
- On line 2, we make our while loop. It looks almost identical to an if statement, just with the word `if` swapped 
  out for `while`. This is because they operate in a similar way: the content inside an if statement runs only if 
  the conditional is true, and the content inside a while loop runs until the conditional is no longer true. So,
  our while loop will run until `running` is no longer equal to `"running"`, or until its value changes.
- On line 3, we print out `"Loop is running."`.
- On line 4, we make a variable called `run_again` and ask the user if we should run the loop again.
- On line 5, we check if they said no to running the loop again.
- On line 6, we stop the loop by changing the value of `running` to `"not running"`. This stops the loop because 
  `running`'s value changes. Note that this code runs only if the user puts in `no`.

## While loops and booleans
Just like in if statements, we can use booleans in while loops. Also like in if statements, we don't need to make 
a conditional with them. If `x = True`, we don't need to write `while x == True:` to keep our loop going. Instead,
we can just write `while x:`. And if `x = False`, we can write `while not x:`.

## You try!
It's your turn to write code using a while loop. This time though, it'll be a bit different.
Instead of being explicitly told what code to write, you're given a program to make.

Create a while loop that prints every number from 1 to 100. To make this, you'll need:
- An integer variable with the number to be printed.
- A while loop with a conditional that checks if the number is less than or equal to 100.
- A print statement to display the current number.
- A line of code to increment the number using `+=`.
  
If you need a hint on how to get started, type in `hint` in the bottom right box. To specify which hint you 
receive, type in `hint(number)`. Good luck!
