import random

print("How many numbers do you want to try?")
high = int(input())

randInt = random.randint(1,high)

print("Awesome! Guess a number between 1 and " + str(high) + ".")
guess = int(input())

while guess != randInt:
    if guess < randInt:
        print("Your number is too low! Guess again!")
        guess = int(input())
    elif guess > randInt:
        print("Your number is too high! Guess again!")
        guess = int(input())

print("Awesome! You got it right! The correct number was " + str(randInt))