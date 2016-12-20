#include <stdio.h>

void  calcNthTriangle (int n) {
  int i, triangularNumber = 0;
  for (i = 1; i <= n; i++)
    triangularNumber += i;
  printf ("Triangular Number %i is %i\n", n, triangularNumber);
}

int main(void) {
    calcNthTriangle(10);
    calcNthTriangle(20);
    calcNthTriangle(50);
    return 0;
}
