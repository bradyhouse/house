package hello;

import com.eclipsesource.v8.NodeJS;
import com.eclipsesource.v8.V8Object;
import com.eclipsesource.v8.V8Array;
import com.eclipsesource.v8.JavaCallback;
import java.io.File;


public class World {

	public static void main(String[] args) {

		final NodeJS nodeJS = NodeJS.createNodeJS();
		JavaCallback callback = new JavaCallback() {

			public Object invoke(V8Object receiver, V8Array parameters) {
				return "Hello, JavaWorld!";
			}
		};

		nodeJS.getRuntime().registerJavaMethod(callback, "someJavaMethod");

		File nodeScript = new File("../server.js");

		nodeJS.exec(nodeScript);

		while(nodeJS.isRunning()) {
			nodeJS.handleMessage();
		}
		nodeJS.release();

	}
}
