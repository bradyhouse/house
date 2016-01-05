package fiddle.android.bitmapfonts;

import android.content.Context;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.util.Log;
import android.view.MotionEvent;
import android.view.SurfaceHolder;
import android.view.SurfaceView;

public class DrawingPanel extends SurfaceView implements SurfaceHolder.Callback {

    private static final String TAG = DrawingPanel.class.getSimpleName();

    private Canvas canvas;		// the canvas to draw on
    private Glyphs glyphs;		// the glyphs

    public DrawingPanel(Context context) {
        super(context);
        // adding the panel to handle events
        getHolder().addCallback(this);

        // initialise resources
        loadResources();

        // making the Panel focusable so it can handle events
        setFocusable(true);
    }


    /**
     * Loads the images
     */
    private void loadResources() {
        this.glyphs = new Glyphs(BitmapFactory.decodeResource(getResources(), R.drawable.glyphs_green));
        Log.d(TAG, "Green glyphs loaded");
    }

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width,
                               int height) {
    }

    @Override
    public void surfaceCreated(SurfaceHolder holder) {
    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        // draw text at touch
        try {
            canvas = getHolder().lockCanvas();
            synchronized (getHolder()) {
                if (event.getAction() == MotionEvent.ACTION_DOWN
                        || event.getAction() == MotionEvent.ACTION_MOVE) {
                    // clear the screen
                    canvas.drawColor(Color.BLACK);
                    // draw glyphs
                    glyphs.drawString(canvas, "Drawing string at "
                                    + (int) event.getX() + " " + (int) event.getY(),
                            (int) event.getX(), (int) event.getY());
                }
                if (event.getAction() == MotionEvent.ACTION_UP) {
                    canvas.drawColor(Color.BLACK);
                    glyphs.drawString(canvas, "Drawn string at "
                                    + (int) event.getX() + " " + (int) event.getY(),
                            (int) event.getX(), (int) event.getY());
                }
            }
        } finally {
            if (canvas != null) {
                getHolder().unlockCanvasAndPost(canvas);
            }
        }
        // event was handled
        return true;
    }

    @Override
    protected void onDraw(Canvas canvas) {
    }

}
