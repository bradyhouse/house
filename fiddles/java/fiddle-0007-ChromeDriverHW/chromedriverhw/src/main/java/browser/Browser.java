package browser;

import java.net.MalformedURLException;

public interface Browser {

  String start() throws InterruptedException, MalformedURLException;

  void quit();

}
