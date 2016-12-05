#include <stdio.h>

int main(void) {
    float f1 = 123.125, f2;
    int i1, i2 = -150;
    char c = 'a';

    i1 = f1;
    printf ("%f assigned to an int produce %i\n", f1, i1);

    f1 = i2;
    printf ("%i assigned to a float produces %f\n", i2, f1);

    f1 = i2 / 100;
    printf("%i divided by 100 produces %f\n", i2, f1);

    f2 = i2 / 100.0;
    printf("%i divided by 100.0 produces %f\n", i2, f2);

    f2 = (float) i2 / 100;
    printf("(float) %i divided by 100 produces %f\n", i2, f2);

    return 0;
}
