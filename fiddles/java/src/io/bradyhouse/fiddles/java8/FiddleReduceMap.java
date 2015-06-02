package io.bradyhouse.fiddles.java8;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Stream;


/**
 * Write an implementation of the Stream function map using only reduce
 * and lambda expressions. You can return a List instead of a Stream if you want.
 */
public class FiddleReduceMap {
    public static <I, O> List<O> mapReduce(Stream<I> stream, Function<I, O> fn) {
        return stream.reduce(new ArrayList<O>(), (targetList, item) -> {
            List<O> tmpList = new ArrayList<>(targetList);
            tmpList.add(fn.apply(item));
            return tmpList;
        }, (List<O> targetList, List<O> tmpList) -> {
            List<O> newList = new ArrayList<>(targetList);
            newList.addAll(tmpList);
            return newList;
        });
    }

    public static void main(String[] args) {
        Stream<String> lowerCaseStream = Stream.of("a", "b", "c");
        List<String> upperCaseList = mapReduce(lowerCaseStream, (String str) -> {
            return str.toUpperCase();
        });
        System.out.println(upperCaseList);
    }
}
