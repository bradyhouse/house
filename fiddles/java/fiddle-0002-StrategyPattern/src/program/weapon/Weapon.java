package program.weapon;

import program.math.Vector2f;

public interface Weapon {

    /**
     * The trigger to use the weapon.
     * @param target - where on the map is the target
     */
    public void useWeapon(Vector2f target);

    /**
     * Returns the description of the weapon
     */
    public String getDescription();

}
