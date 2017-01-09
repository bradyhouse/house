#include <stdio.h>

int main(void) {
    printf ("\nreadline started\n\n");
    
    int  i;
    char line[81];
    void readLine (char buffer[]);
    
    readLine (line);
    printf ("%s\n\n", line);
    
    printf ("\nreadline ended\n\n");

    return 0;
}

void readLine (char buffer[]) {
    char character;
    int  i = 0;
    do {
        character = getchar ();
        buffer[i] = character;
        ++i;    
    } while ( character != '\n' );
    
    buffer [i - 1] = '\0';
}