package program.droid;


import program.chassis.SteelStand;
import program.weapon.NoWeapon;

public class DecoyDroid extends Droid {

    public DecoyDroid() {
        id = "DCY-" + (++Droid.nextId);
        weapon = new NoWeapon();
        chassis = new SteelStand();
    }

    @Override
    public void display() {
        System.out.println("+--------------------------------------------------------------------------------------------+");
        System.out.println("| I am a DECOY droid.");
        System.out.println("|\tID: " + id);
        System.out.println("|\tWeapon: " + weapon.getDescription());
        System.out.println("|\tChassis: " + chassis.getDescription());
        System.out.println("+--------------------------------------------------------------------------------------------+");
    }

}
