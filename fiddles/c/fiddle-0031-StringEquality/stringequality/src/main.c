#include <stdio.h>
#include <stdbool.h>

bool equalStr(const char s1[], const char s2[]) {
    int i = 0;
    bool areEqual;
    
    while ( s1[i] == s2[i] &&
            s1[i] != '\0' && s2[i] != '\0' )
        ++i;
        
    if ( s1[i] == '\0' && s2[i] == '\0' )
        areEqual = true;
    else
        areEqual = false; 
    
    return areEqual;   

}


int main(void) {
    printf ("\nstringequality started\n\n");

    bool equalStr(const char s1[], const char s2[]);

    const char strA[] = "abcdefghi";
    const char strB[] = "1234567890";

    printf ("%i\n", equalStr(strA, strB));
    printf ("%i\n", equalStr(strA, strA));
    printf ("%i\n", equalStr(strB, "1234567890"));
    

    printf ("\nstringequality ended\n\n");

    return 0;
}
