package program.chassis;

public interface Chassis {

    /**
     * Delegates the movement to the supporting chassis and
     * tries to move the unit to <code>x</code>,<code>y</code>
     * @param x
     * @param y
     */
    public void moveTo(int x, int y);

    /**
     * Returns the description of the chassis
     */
    public String getDescription();
}