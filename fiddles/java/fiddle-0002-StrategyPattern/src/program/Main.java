package program;

import java.util.Random;

import program.droid.AssaultDroid;
import program.droid.DecoyDroid;
import program.droid.Droid;
import program.droid.ScoutDroid;
import program.weapon.HeavyLaserCanon;

public class Main {

    public static void main(String[] args) {
        // for generating random numbers
        Random rand = new Random();

        Droid scout = new ScoutDroid();
        Droid assailant = new AssaultDroid();
        Droid decoy = new DecoyDroid();

        scout.display();
        assailant.display();
        decoy.display();

        // shoot-out - each droid fires once per turn
        for (int i = 1; i <= 5; i++) {
            System.out.println("\n<=== BEGIN TURN " + i + " ===>");
            // in turn 3 decoy droid is given an assault canon
            if (i == 4) {
                decoy.setWeapon(new HeavyLaserCanon());
                System.out.println("* " + decoy.getId() + " acquired " + decoy.getWeapon().getDescription() + "\n");
            }
            scout.attackPosition(rand.nextInt(10), rand.nextInt(10));	// we assume this is an enemy position
            scout.moveToPosition(rand.nextInt(10), rand.nextInt(10));
            System.out.println();
            assailant.attackPosition(rand.nextInt(10), rand.nextInt(10));
            assailant.moveToPosition(rand.nextInt(10), rand.nextInt(10));
            System.out.println();
            decoy.attackPosition(rand.nextInt(10), rand.nextInt(10));
            decoy.moveToPosition(rand.nextInt(10), rand.nextInt(10));
            System.out.println("<=== END TURN " + i + " ===>");
        }
    }
}
