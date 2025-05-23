#include <stdio.h>

void sort (int a[], int n) {
    int i, j, temp;
    for ( i = 0; i < n - 1; ++i )
        for ( j = i + 1; j < n; ++j )
            if ( a[i] > a[j] ) {
                temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
}

void printArray(int a[], int n) {
    int i;

    for ( i = 0; i < n; ++i )
        printf ( "%i ", a[i]);
}

int main(void) {
    int i;
    int array[16] = { 34, -5, 6, 0, 12, 100, 56, 22, 
                      44, -3, -9, 12, 17, 22, 6, 11 };
    void sort ( int a[], int n );
    void printArray( int a[], int n );
    
    printf ( "The array before the sort:\n" );
    printArray( array, 16 );
        
    sort ( array, 16 );

    printf ( "\n\nThe array after the sort:\n" );    
    printArray( array, 16);    

    printf ( "\n" );
         
    return 0;
}
