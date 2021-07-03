# Math in Python
## How do I do math in Python?
In Python, math is very similar to anywhere else. It follows order of operations (PEMDAS), 
you can prioritize operations with parentheses, and most of the symbols are the same. 
That being said, there are some definitively different symbols. Let this serve as a guide:
- `+` is addition.  Example: `x = 7 + 7`
- `-` is subtraction.  Example: `x = 7 - 7`
- `*` is multiplication.  Example: `x = 7 * 7`
- `/` is division.  Example: `x = 7 / 7`
- `//` is floor division (division without remainder).  Example: `x = 7 // 7`
- `**` is exponents (powers).  Example: `x = 7 ** 7`
- `%` is modulus (remainder).  Example: `x = 7 % 7`

You'll notice that we're defining a variable (`x`, in this example) each time we do math. 
This is because nothing would happen if we just put `7+7` in our code; we wouldn't be storing it anywhere.

## What data types can I do math with?
The obvious choices for doing math are floats and integers, as they're both represented as numbers we normally use in math.
However, you can add (and sometimes multiply) other data types as well. 
For instance, one way to join two strings together is by adding them. See this example:
```Python
x = "first part "
y = "second part"
print(x + y)

>>> first part second part
```
In this code, we create a string with the contents `first part ` and a string with the contents `second part`. 
Then, we join them together with `+` to form `first part second part`. 
You can also multiply strings and integers to create a new string with multiple of the original.
For example, `x = "string" * 5` would result in `x` being `"stringstringstringstringstring"`, or `"string"` 5 times.

## Can I turn a string into a number?
Yes! The builtin `int()` will turn your string into a number if possible. 
`x = int("10")` would result in `10`, but `x = int("string")` would result in an error because `string` is not a number. 
You also cannot use the words of numbers. `x = int("ten")` will result in an error.
You can also convert strings to floats with the `float()` builtin. 
`x = float("7.5")` would result in x being `7.5`. The last builtin we'll cover in this lesson is `str()`. 
You may be able to guess that it turns floats or integers into strings. `x = str(7)` would make `x` equal to `"7"`, and 
`x = str(4.5)` would make `x` equal to `"4.5"`.

## Your turn!
Now, it's your turn to try. For this lesson, you'll create two variables, both strings. One will be a stringified integer,
and the other will be a stringified float. 
(Stringified just means converted to a string. `"7"` would be a stringified integer, because it's an integer as a string.)
First print out the two variables added together, 
and then convert the first to an integer and the second to a float and print their sum again.
This will show the difference between adding two strings and two numbers - 
when you add strings, their values are combined (`"5"` + `"5"` would be `"55"`, not `"10"`), but when you add 
integers or floats, their values are added (`5` + `5` would be `10`).
Keep in mind that `int(x)` will not turn `x` into an integer; you will have to redefine `x` like `x = int(x)`. 
Good luck, and click `Next` when you've gotten the proper results.