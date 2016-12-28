#include <stdio.h>

int main(void) {
    printf ("\ndatastructure started\n\n");

    struct date {
        int month;
        int day;
        int year;
    };

    struct date today;

    today.month = 12;
    today.day = 28;
    today.year = 2016;

    printf ("Today's date is %i/%i/%.2i.\n\n", today.month, today.day, today.year % 100);

    printf ("datastructure ended\n\n");

    return 0;
}
