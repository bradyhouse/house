package io.bradyhouse.fiddles.java8;

import java.util.List;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

public class FiddleStreamMap {
    public static void main(String[] args) {
        List<String> col = Stream.of("a", "b", "c").map(
                string -> string.toUpperCase()
        ).collect(toList());
        System.out.println(col.toString());
    }
}
