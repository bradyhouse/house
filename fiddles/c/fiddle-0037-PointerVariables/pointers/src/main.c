#include <stdio.h>

int main(void) {
  printf ("\npointers started\n\n");

  char c = 'Q';
  char *char_pointer = &c;
  
  printf ("%c %c\n", c, *char_pointer);
  
  c = '/';
  
  printf ("%c %c\n", c, *char_pointer);
  
  *char_pointer = '(';
  
  printf("%c %c\n", c, *char_pointer);
    

  printf ("\npointers ended\n\n");

  return 0;
}
