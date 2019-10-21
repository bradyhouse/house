package fiddle;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;
import java.util.stream.Collectors;

@SpringBootApplication
public class App implements CommandLineRunner {

  private static final Logger logger = LoggerFactory.getLogger(App.class);

  @Autowired
  private Res res;

  @Autowired
  private Run run;

  public static void main(String[] args) {
    SpringApplication app = new SpringApplication(App.class);
    app.run(args);

  }

  private void start(String script) {
    Thread thread = new Thread(run.script(script));
    thread.start();
  }

  private String setup() throws Res.ResErr {
    return res.build();
  }

  private void cleanup() {
    Thread thread = new Thread(run.cleanup());
    Runtime.getRuntime().addShutdownHook(thread);
  }

  @Override
  public void run(String... strings) throws Exception {
    String strArgs = Arrays.stream(strings).collect(Collectors.joining("|"));
    logger.info("Application started with arguments: {}",  strArgs);
    final String resourcesPath = setup();
    final String api = resourcesPath + java.io.File.separator + "index.js";
    start(api);
    cleanup();
  }

}
