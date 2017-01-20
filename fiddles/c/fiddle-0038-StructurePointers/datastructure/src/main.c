#include <stdio.h>

int main(void) {
    printf ("\ndatastructure started\n\n");

    struct date {
        int month;
        int day;
        int year;
    };

    struct date today, *datePtr;

    datePtr = &today;

    datePtr->month = 12;
    datePtr->day = 28;
    datePtr->year = 2016;

    printf ("Today's date is %i/%i/%.2i.\n\n", datePtr->month, datePtr->day, datePtr->year % 100);

    printf ("datastructure ended\n\n");

    return 0;
}
