import os
import random

MIN = 1
MAX = 6

def main():
    again = 'y'
    while again == 'y' or again == 'Y':
        print('Rolling the dice ...')
        print('Their values are:')
        print(random.randint(MIN, MAX))
        print(random.randint(MIN, MAX))
        again = str(input('Roll them again? (y - yes): '))


main()
os._exit(1)
