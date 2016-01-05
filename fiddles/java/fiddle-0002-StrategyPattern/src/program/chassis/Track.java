package program.chassis;

public class Track implements Chassis {

    @Override
    public void moveTo(int x, int y) {
        System.out.println("Don't get in my way! Moving slowly to: " + x + "," + y + ".");
    }

    @Override
    public String getDescription() {
        return "Slow moving tracks but able to go through many obstacles.";
    }

}
