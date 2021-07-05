# For Loops
## What are for loops?
In a previous lesson, we learned about while loops and determined that their main use case is to do things an 
unknown number of times. For loops are for the opposite purpose: when you want to do something for a specific number 
of times. If I want to print out `"Hello!"` 5 times, then the easiest way to do that would be with a for loop. 
But for loops also have a different use case - looping through iterables. Iterables are anything that can be iterated, 
or looped through. For example, lists are iterables because we can iterate through their items. Strings are also iterables,
which is why they can be turned into lists. With for loops, we can go through any iterable and run code on each item 
individually. For example, if `x = ["item0", "item1", "item2"]`, then I could loop through `x` and run the same code on
all the different items, `"item0"`, `"item1"`, and `"item2"`. This will make more sense once you see how for loops are 
written.

## How do I write a for loop?
The syntax of a for loop is a bit different from any we've seen so far. It introduces a new keyword that we will also
use later: `in`. `in` is used to check if something is in something else. For example, we could check if `"string"` was 
in the bigger string `"I am a string"` by saying `if "string" in "I am a string":`. `in` is also used in for loops to 
loop through all the items in an iterable. Here is an example of a for loop looping through a list:
```python
fruit_list = ["bananas", "apples", "pears", "watermelons", "oranges"]
for fruit in fruit_list:
    print("I love eating " + fruit)
```
Let's break down this code:
- On line 1, we are creating a list called `fruit_list` with various fruits in it.
- On line 2, we are making our for loop to loop through all the fruits in `fruit_list`. You'll notice that we are also 
  creating a variable in the for loop called `fruit`. This will be the item that we are currently using in the list.
  The first time the loop runs, `fruit` will be `"bananas"`, because that's first in `fruit_list`. Next, `fruit` will be 
  `"apples"`, etc. Starting with `for` indicates that this is a for loop, and we always end with a colon just like an 
  if statement or while loop.
- On line 3, we are printing out `"I love eating "`, and then whatever `fruit` is in that loop iteration. You may 
  remember that in a previous lesson, we saw that we can add strings together to make a larger string, and that's 
  exactly what we're doing here - just adding the fruit to the end of the string `"I love eating "`.
  
This is a lot to take in, but in a nutshell, the syntax to make a for loop is `for variable in list_name:`, and the loop content is
indented inside the loop.

## The range builtin
`range` is a builtin that creates a list-like object full of numbers that we can loop through. `range` is often used to 
do something a certain number of times, even when you don't want to loop through a list of items. Going back to the 
example in the first section, if I wanted to print out `"Hello!"` 5 times, I could do it with `range` like this:
```python
for x in range(5):
    print("Hello!")
```
Notice that I put the number of times I want the loop to run in the parentheses after `range`. `x` in this case is just
a random variable name, and `print("Hello!")` will print `"Hello!"` every time the loop runs.

## You try!
Now, you get to try creating a list and looping through it. Make a list with at least 3 items and make a for loop to
print out the name and index of each item. Feel free to refer back to the previous lesson to remember how to get the 
index of the item. Good luck!