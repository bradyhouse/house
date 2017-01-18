#include <stdio.h>

int strToInt(const char string[]) {
  int i, intValue, result = 0;
  for ( i = 0; string[i] >= '0' && string[i] <= '9'; ++i ) {
    intValue = string[i] - '0';
    result = result * 10 + intValue;
  }
  return result;
}

int main(void) {

  printf ("\nstringtointeger started\n\n");

  int strToInt(const char string[]);

  printf ( "%i\n", strToInt("245"));
  printf ( "%i\n", strToInt("100") + 25);
  printf ( "%i\n", strToInt("13x5"));

  printf ("\nstringtointeger ended\n\n");

  return 0;
}
