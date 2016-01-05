package program.weapon;

import program.math.Vector2f;


public class LightLaserCanon implements Weapon {

    private float damage = 0.5f; // the damage inflicted

    @Override
    public void useWeapon(Vector2f target) {
        System.out.println("Shooting my laser canon to " + (int)target.getX() + ","
                + (int)target.getY() + ". Bang on! Done " + damage + " damage.");
    }

    @Override
    public String getDescription() {
        return "First generation laser canon. Street use only!";
    }
}
