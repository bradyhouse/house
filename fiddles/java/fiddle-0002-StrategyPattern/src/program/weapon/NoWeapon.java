package program.weapon;

import program.math.Vector2f;

/**
 * This is a null object. A null object is a dummy that does nothing and it
 * is a mere place-holder and eliminates the need to check for null.
 * @author impaler
 *
 */
public class NoWeapon implements Weapon {

    @Override
    public void useWeapon(Vector2f target) {
        // We are doing nothing
        System.out.println("No weapon equipped!");
    }

    @Override
    public String getDescription() {
        return "Nothing";
    }
}

