#include <stdio.h>

int main(void) {
    int Fibonacci[40], i;

    Fibonacci[0] = 0;
    Fibonacci[1] = 1;

    for ( i = 2; i < 40; ++i )
      Fibonacci[i] = Fibonacci[i-2] + Fibonacci[i-1];

    for ( i = 0; i < 40; ++i )
      printf ( "%i ", Fibonacci[i]);

    return 0;
}
