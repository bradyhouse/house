package io.bradyhouse.fiddles.java8;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

import static java.lang.Character.isDigit;
import static java.util.stream.Collectors.toList;

/**
* Find the String with the largest number of lowercase letters from a List<String>.
* You can return an Optional<String> to account for the empty list case.
*/
public class FiddleStreamFilter {
    public static Boolean isLowerCase(String character) {
        char charZero = character.charAt(0);
        if (isDigit(charZero)) return false;
        int asciiCode = (int) charZero;
        return asciiCode > 96 ? true : false;
    }

    public static int UCaseCount(String word) {
        if (word.trim().length() > 0) {
            List<String> UpperCaseLetters = Stream.of(word.split("(?!^)")).filter(
                    letter -> isLowerCase(letter.toString())
            ).collect(toList());
            return UpperCaseLetters.toArray().length;
        }
        return 0;
    }

    public static void main(String[] args) {
        String maxLowerCase = Stream.of("", "abc", "abcdefghijklmnop", "BBBBBBBBB").max(
                Comparator.comparing(word -> UCaseCount(word.toString()))
        ).get();
        System.out.println(maxLowerCase);
    }
}
