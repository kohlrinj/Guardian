import time

starttime = time.time()

print('What is your name?')
myName = input()
print('Hello, ' + myName + '. That is a good name. How old are you?')
myAge = int(input())

if myAge < 13:
    print('Are you legally allowed to use this app?')
elif myAge == 13:
    print("You're a teenager now... Thats pretty dope.")
elif myAge > 13 and myAge <= 30:
    print("These are your golden days. You should be doing something fun right now.")
elif myAge > 30 and myAge < 65:
    print("It's all downhill from here.")
else:
    print("... You're not dead yet?")

programAge = int(time.time() - starttime)
print("%s? That's funny, I'm only %s seconds old." % (myAge, programAge))
print("I wish I was " + str(myAge * 2) + " years old.")
time.sleep(3)
print("I'm tired. I'm going to sleep now.")