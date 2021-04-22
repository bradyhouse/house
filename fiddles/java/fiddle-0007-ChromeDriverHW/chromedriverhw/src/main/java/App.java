
import browser.impl.ChromeBrowser;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.openqa.selenium.remote.server.SeleniumServer;
import org.openqa.grid.internal.utils.configuration.StandaloneConfiguration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("conf/application.properties")
public class App implements CommandLineRunner {

  private static final Logger logger = LoggerFactory.getLogger(App.class);
  private SeleniumServer seleniumServer;

  @Autowired
  private ChromeBrowser chromeBrowser;

  //region Application Properties

  @Value("${chr.sessionDuration}")
  private Integer sessionDuration;

  //endregion

  //region Main Thread

  public static void main(String[] args) {
    SpringApplication app = new SpringApplication(App.class);
    app.run(args);
  }

  //endregion

  //region Overrides

  @Override
  protected void finalize() throws Throwable {
    chromeBrowser.quit();
    seleniumServer.stop();
    super.finalize();
  }

  @Override
  public void run(String... args) throws Exception {
    StandaloneConfiguration standaloneConfiguration = new StandaloneConfiguration();
    seleniumServer = new SeleniumServer(standaloneConfiguration);
    seleniumServer.boot();
    Thread.sleep(2000);
    String sessionId = chromeBrowser.start();
    logger.info("authenticated Session Id ~ " + sessionId);
    logger.info("The session will end in " + (sessionDuration / 1000) + " seconds");
    Thread.sleep(sessionDuration);
    chromeBrowser.quit();
    seleniumServer.stop();
  }

  //endregion

}
