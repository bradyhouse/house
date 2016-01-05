package fiddle.android.bitmapfonts;

import android.app.Activity;
import android.os.Bundle;
import android.view.Window;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // turn off title
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(new DrawingPanel(this));
    }

}
