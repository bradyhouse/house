package fiddle.android.droidz.model.components;

public class Speed {

    public static final int DIRECTION_RIGHT	= 1;
    public static final int DIRECTION_LEFT	= -1;
    public static final int DIRECTION_UP	= -1;
    public static final int DIRECTION_DOWN	= 1;

    private float xv = 1;	// velocity value on the X axis
    private float yv = 1;	// velocity value on the Y axis

    private int xDirection = DIRECTION_RIGHT;
    private int yDirection = DIRECTION_DOWN;

    public Speed() {
        this.xv = 5;
        this.yv = 5;
    }

    public Speed(float xv, float yv) {
        this.xv = xv;
        this.yv = yv;
    }

    public float getXv() {
        return xv;
    }
    public void setXv(float xv) {
        this.xv = xv;
    }
    public float getYv() {
        return yv;
    }
    public void setYv(float yv) {
        this.yv = yv;
    }

    public int getxDirection() {
        return xDirection;
    }
    public void setxDirection(int xDirection) {
        this.xDirection = xDirection;
    }
    public int getyDirection() {
        return yDirection;
    }
    public void setyDirection(int yDirection) {
        this.yDirection = yDirection;
    }

    // changes the direction on the X axis
    public void toggleXDirection() {
        xDirection = xDirection * -1;
    }

    // changes the direction on the Y axis
    public void toggleYDirection() {
        yDirection = yDirection * -1;
    }

}

