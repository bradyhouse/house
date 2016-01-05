package program.chassis;

public class Wheels implements Chassis {

    @Override
    public void moveTo(int x, int y) {
        System.out.println("Speeding to " + x + "," + y + " on my wheels!");
    }

    @Override
    public String getDescription() {
        return "4 wheel drive, very fast on flat terrain but struggling through obstacles.";
    }

}
