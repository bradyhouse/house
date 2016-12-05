#include <stdio.h>

int main(void) {
    printf ("datatypes compiled!");

    int integerVar = 100;
    float floatVar = 331.79;
    double doubleVar = 8.44e+11;
    char charVar = 'W';

    _Bool boolVar = 0;

    printf("integerVar = %i\n", integerVar);
    printf("floatVar = %f\n", floatVar);
    printf("doubleVar = %e\n", doubleVar);
    printf("doubleVar = %g\n", doubleVar);
    printf("boolVar = %i\n", boolVar);
    printf("charVar = %c\n", charVar);

    return 0;
}
