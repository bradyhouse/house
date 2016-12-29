#include <stdio.h>

struct time {
    int hour;
    int minutes;
    int seconds;
};

int main(void) {
    printf ("\ntimestruct started\n\n");

    struct time timeUpdate (struct time now);
    struct time currentTime, nextTime;

    printf ("Enter the time (hh:mm:ss): ");
    scanf ("%i:%i:%i", &currentTime.hour, &currentTime.minutes, &currentTime.seconds);

    nextTime = timeUpdate (currentTime);

    printf ("Updated time is %.2i:%.2i:%.2i\n", nextTime.hour, nextTime.minutes, nextTime.seconds );

    // Do stuff

    printf ("\ntimestruct ended\n\n");

    return 0;
}

struct time timeUpdate (struct time now) {
    ++now.seconds;

    if ( now.seconds == 60 ) {
        now.seconds = 0;
        ++now.minutes;
        if ( now.minutes == 60 ) {
            now.minutes = 0;
            if (now.hour == 24 ) {
                now.hour = 0;
            }
        }
    }

    return now;

}