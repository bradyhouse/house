package program.math;

public class Vector2f {

    private float x;
    private float y;

    public Vector2f() {
        this.x = .0f;
        this.y = .0f;
    }

    public Vector2f(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public float getX() {
        return x;
    }
    public void setX(float x) {
        this.x = x;
    }
    public float getY() {
        return y;
    }
    public void setY(float y) {
        this.y = y;
    }

}

