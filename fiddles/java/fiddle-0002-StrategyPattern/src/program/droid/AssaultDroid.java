package program.droid;

import program.chassis.Track;
import program.weapon.HeavyLaserCanon;


public class AssaultDroid extends Droid {

    public AssaultDroid() {
        id = "ASS-" + (++Droid.nextId);
        weapon = new HeavyLaserCanon();
        chassis = new Track();
    }

    @Override
    public void display() {
        System.out.println("+--------------------------------------------------------------------------------------------+");
        System.out.println("| I am an ASSAULT droid.");
        System.out.println("|\tID: " + id);
        System.out.println("|\tWeapon: " + weapon.getDescription());
        System.out.println("|\tChassis: " + chassis.getDescription());
        System.out.println("+--------------------------------------------------------------------------------------------+");
    }
}

