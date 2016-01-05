package io.bradyhouse.fiddles.java8;


public class FiddleNoArguments {
    public static void main(String[] args) {
        Runnable noArguments = () -> System.out.println("Hello World");
        noArguments.run();
    }
}
