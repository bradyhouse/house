package io.bradyhouse.fiddles.java8;

import java.util.function.BinaryOperator;

public class FiddleBinaryOperator {
    public static void main(String[] args) {
        BinaryOperator<Long> addLongs = (x, y) -> x + y;
        long a = 100;
        long b = 150;
        long c = addLongs.apply(a, b);
        System.out.println(c);
    }
}
