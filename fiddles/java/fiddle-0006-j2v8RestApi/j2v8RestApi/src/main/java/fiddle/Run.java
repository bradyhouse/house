package fiddle;

import com.eclipsesource.v8.JavaVoidCallback;
import com.eclipsesource.v8.NodeJS;
import com.eclipsesource.v8.V8Array;
import com.eclipsesource.v8.V8Object;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class Run {

  @Autowired
  Res res;


  private static final Logger logger = LoggerFactory.getLogger(Run.class);

  public Runnable script(String jsFile) {
    return new Runnable() {
      public void run() {
        final NodeJS nodeJS = NodeJS.createNodeJS();
        File nodeScript = new File(jsFile);
        JavaVoidCallback onCallback = new JavaVoidCallback() {
          public void invoke(V8Object receiver, V8Array parameters) {
            try {
              teardown();
            } catch (Res.ResErr e) {
              stackTrace(e.getStackTrace());
            }
          }
        };
        JavaVoidCallback onLogMsg = new JavaVoidCallback() {
          @Override
          public void invoke(V8Object receiver, V8Array parameters) {
            if (parameters.length() > 0) {
              String message = (String) parameters.get(0);
              logger.info(message);
            }

          }
        };
        nodeJS.getRuntime().registerJavaMethod(onLogMsg, "javaLogMsgFn");
        nodeJS.getRuntime().registerJavaMethod(onCallback, "javaCallBackFn");
        nodeJS.exec(nodeScript);
        while (nodeJS.isRunning()) {
          nodeJS.handleMessage();
        }
        if (nodeJS.isRunning()) {
          nodeJS.release();
        }
      }
    };
  }

  public Runnable cleanup() {
    return new Runnable() {
      public void run() {
        try {
          teardown();
        } catch (Res.ResErr e) {
          logger.error("StackTrace:\n{}", e.getStackTrace());
        }
      }
    };
  }

  private void teardown() throws Res.ResErr {
    res.teardown();
  }

  private void stackTrace(StackTraceElement[] stackTraceElements) {
    logger.error("StackTrace:\n{}", stackTraceElements);
  }


}
