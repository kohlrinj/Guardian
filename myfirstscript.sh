#! /bin/bash
# This is a script that says hello

greeting="This is a script. Hello!"

echo $greeting
echo $greeting Thanks for joining us!
echo $greeting, thanks for joining us! You owe me $3
echo $greeting, thanks for joining us! You owe me \$100.
echo "$greeting, thanks for joining us! You owe me \$100."
echo '$greeting, thanks for joining us! You owe me \$100.'

echo Machine Type: $MACHTYPE
echo Hostname: $HOSTNAME
echo Working Dir: $PWD
echo Session Length: $SECONDS
echo Home Dir: $HOME

a=$(ifconfig | grep 'inet 10' | awk '{print $2}')
echo My IP is $a

