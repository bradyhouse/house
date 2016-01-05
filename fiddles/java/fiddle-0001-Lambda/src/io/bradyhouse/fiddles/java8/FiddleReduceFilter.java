package io.bradyhouse.fiddles.java8;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Stream;

/**
 * Write an implementation of the Stream function filter using only reduce and
 * lambda expressions. Again, you can return a List instead of aStream if you want.
 */
public class FiddleReduceFilter {

    public static <I> List<I> reduceFilter(Stream<I> stream, Predicate<I> predicate) {
        List<I> tmpList = new ArrayList<>();
        return stream.reduce(tmpList,
                (List<I> list, I item) -> {
                    if (predicate.test(item)) {
                        List<I> newList = new ArrayList<>(list);
                        newList.add(item);
                        return newList;
                    } else {
                        return list;
                    }
                }, (List<I> targetList, List<I> sourceList) -> {
                    List<I> newList = new ArrayList<I>(targetList);
                    newList.addAll(sourceList);
                    return newList;
                }
        );
    }

    public static void main(String[] args) {
        Stream<String> stream = Stream.of("a", "b", "c");
        List<String> filteredList = reduceFilter(stream, (String str) -> str.equalsIgnoreCase("a"));
        System.out.println(filteredList);
    }
}
