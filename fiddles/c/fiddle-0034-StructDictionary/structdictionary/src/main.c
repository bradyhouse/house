#include <stdio.h>
#include <stdbool.h>

struct entry {
    char    word[15];
    char    definition[50];
};

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

int lookup (const struct entry dictionary[], const char search[], const int entries) {

    int i;
    bool equalStr(const char s1[], const char s2[]);

    for ( i = 0; i < entries; ++i)
        if ( equalStr (search, dictionary[i].word) )
            return i;

    return -1;
}

int main(void) {
    printf ("\nstructdictionary started\n\n");

    const struct entry dictionary[100] = {
        { "aardvark", "a burrowing African mammal"},
        { "abyss", "a bottomless pit"},
        { "acumen", "mentally sharp; keen"},
        { "addle", "to become confused"},
        { "aerie", "a high nest"},
        { "affix", "to append; attach"},
        { "agar", "a jelly made from seaweed"},
        { "ahoy", "a nautical call of greeting"},
        { "aigrette", "an ornamental cluster of feathers"},
        { "ajar", "partially opened"}
    };

    char word[10];
    int  entries = 10;
    int  entry;
    int lookup (const struct entry dictionary[], const char search[], const int entries);

    printf ("Enter word: ");
    scanf ("%14s", word);
    entry = lookup (dictionary, word, entries);

    if ( entry != -1 )
        printf ("%s\n", dictionary[entry].definition);
    else
        printf ("Sorry, the word %s is not in my dictionary.\n", word);

    printf ("\nstructdictionary ended\n\n");

    return 0;
}
