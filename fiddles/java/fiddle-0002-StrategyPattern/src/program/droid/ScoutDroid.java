package program.droid;

import program.chassis.Wheels;
import program.weapon.LightLaserCanon;

/**
 * @author tamas
 *
 */
public class ScoutDroid extends Droid {

    public ScoutDroid() {
        id = "SCT-" + (++Droid.nextId);
        weapon = new LightLaserCanon();
        chassis = new Wheels();
    }

    @Override
    public void display() {
        System.out.println("+--------------------------------------------------------------------------------------------+");
        System.out.println("| I am a SCOUT droid.");
        System.out.println("|\tID: " + id);
        System.out.println("|\tWeapon: " + weapon.getDescription());
        System.out.println("|\tChassis: " + chassis.getDescription());
        System.out.println("+--------------------------------------------------------------------------------------------+");
    }

}