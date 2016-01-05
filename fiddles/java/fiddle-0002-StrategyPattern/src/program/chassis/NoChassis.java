package program.chassis;


public class NoChassis implements Chassis {

    @Override
    public void moveTo(int x, int y) {
        System.out.println("It's just a frame. Can't move.");
    }

    @Override
    public String getDescription() {
        return "It's just a frame.";
    }
}
