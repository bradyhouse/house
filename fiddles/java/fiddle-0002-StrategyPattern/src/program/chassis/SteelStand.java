package program.chassis;

public class SteelStand implements Chassis {

    @Override
    public void moveTo(int x, int y) {
        System.out.println("Can't move.");
    }

    @Override
    public String getDescription() {
        return "Unmovable reinforced steel stand ideal for turrets and defensive units.";
    }

}