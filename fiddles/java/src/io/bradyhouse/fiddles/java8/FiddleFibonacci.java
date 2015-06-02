package io.bradyhouse.fiddles.java8;

import java.util.HashMap;
import java.util.Map;
import java.util.function.BinaryOperator;

/**
 * Efficiently calculate a Fibonacci sequence using just the computeIfAbsent
 * method on a Map. By “efficiently,” I mean that you don’t
 * repeatedly recalculate the Fibonacci sequence of smaller numbers.
 */

public class FiddleFibonacci {
    public static Map<Integer, Long> map;
    public static long fibonacci(int x) {
        return map.computeIfAbsent(x, n -> fibonacci(n - 1) + fibonacci(n - 2));
    }
    public static void main(String[] args) {
        map = new HashMap<>();
        map.put(0, 0L);
        map.put(1, 1L);
        fibonacci(10);
        System.out.println(map.toString());
    }
}
