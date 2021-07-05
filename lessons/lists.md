# Lists
## What are lists?
Lists are yet another data type in Python. Simply put, a list is a collection of other data.
For example, I could have a list containing an integer, a string, and a float all together in one.
To create a list, we use the square brackets (`[]`). All the content inside the list goes inside the brackets 
separated by commas. Here's how a list containing `5`, `"string"`, and `12.7` would look: `[5, "string", 12.7]`.
To store this list in a variable, we could do `my_list = [5, "string", 12.7]`. 

## How do I get items from a list?
Lists use something called indexing to get their items. Indexing means that each item in the list has a given index, 
with the first item having an index of 0, the second having an index of 1, the third having an index of 2, and so on.
This can be a bit confusing at first, because each object has an index that is one fewer than its position in the list 
(the second item's index is 1, and the third's is 2), but it will gradually become more natural when referencing them.
To get an item from a list, you need to use its index. Here's how I would get the second item of `my_list`: 
`second_item = my_list[1]`. Notice how I first have the name of the list (`my_list`), and then an opening bracket (`[`),
followed by the index (`1`), and finally the closing bracket (`]`). This is how all items can be referenced in a list.

## How do I get the index of an item?
If you don't know where an item is in a list, you can get its index using `list.index()`. Here's an example of how this works:
let's say we have `my_list = ["item0", "item1", "item2"]`, and we want to find the index of `"item1"`. We can use 
`my_list.index("item1")`. This will give us an output of `1`, which is the index of `"item1"` in `my_list`. The syntax 
for this will always be `list_name.index(item)`. 

## Can I turn other data types into a list?
Yes! Using the `list()` builtin, you can turn strings and some other data types into a list. 
Using `list()` on a string will create a list with each character in the string as a list item. For example, 
`x = list("string")` would make `x` equal to `["s", "t", "r", "i", "n", "g"]`. Keep in mind that integers, floats, and 
booleans cannot be turned into lists using `list()`. You can also turn a list into a string with the `str()` builtin. 
Keep in mind that this will not join together the list items, and instead will directly stringify the list. For example,
`x = str(["item0", "item1", "item2"])` would make `x` equal to `'["item0", "item1", "item2"]'` - the representation of 
the list in a string. 

## What if I want to join together the items of a list?
To join together the items of a list, you'll need `str.join()`. 
(Side note: whenever you see a variable type (like `str` or `int` or `list`) followed by `.something()` 
(something meaning anything can go there), that means that any variable of that type can be used. So `str.join()` means
that `.join()` can be used on any string.)
With `str.join()`, you can join together the items of a list with whatever string it starts with. For example, if 
`x = ["I", "am", "a", "list"]`, and I wanted to join these items together with spaces, I could write 
`" ".join(x)`. This would join all the items together into one string, with each one separated by spaces.
Keep in mind that you can only use `str.join()` if **all** the items in the list are strings. If there are any other 
data types in it, you will get an error.

## Your turn!
It's your turn to try your hand at making and using some lists. For this assignment, you'll create a list with at least 
3 items in it. Then, use `input()` to ask the user which index of item they want. Convert their answer to an integer with
`int()`, and print out the item with that index using `list.index()`. Because there are thorough instructions for this
assignment, there are no hints to be given. Good luck!