package fiddle;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Collections;
import org.apache.commons.io.FileUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class Res {

  private static final org.slf4j.Logger logger = LoggerFactory.getLogger(Res.class);


  public class ResErr extends Exception {
    public ResErr(String errorMessage) {
      super(errorMessage);
    }
  }

  private void buildFromJar(String source, final Path target) throws URISyntaxException, IOException {

    URI resource = getClass().getResource("").toURI();
    FileSystem fileSystem = FileSystems.newFileSystem(
      resource,
      Collections.<String, String>emptyMap()
    );


    final Path jarPath = fileSystem.getPath(source);

    Files.walkFileTree(jarPath, new SimpleFileVisitor<Path>() {

      private Path currentTarget;

      @Override
      public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
        currentTarget = target.resolve(jarPath.relativize(dir).toString());
        Files.createDirectories(currentTarget);
        return FileVisitResult.CONTINUE;
      }

      @Override
      public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
        Files.copy(file, target.resolve(jarPath.relativize(file).toString()), StandardCopyOption.REPLACE_EXISTING);
        return FileVisitResult.CONTINUE;
      }

    });

  }


  public String build() throws ResErr {
    final String basePath = pwd();
    final String resourcesPath = basePath + java.io.File.separator + "nodejs";
    final File targetDirectory = new File(resourcesPath);
    try {
      if (!targetDirectory.exists()) {
        logger.info("Building Resources @ {}", resourcesPath);
        targetDirectory.mkdir();
        buildFromJar("/BOOT-INF/classes/nodejs", Paths.get(resourcesPath));
      } else {
        logger.info("Resources already exist @ {}", resourcesPath);
      }
    } catch (URISyntaxException e) {
      stackTrace(e.getStackTrace());
      throw new ResErr("build failed ~ URISyntax Exception");
    } catch (IOException e) {
      stackTrace(e.getStackTrace());
      throw new ResErr("build failed ~ IOException");
    }
    return resourcesPath;
  }




  public void teardown() throws ResErr {

    final String basePath = pwd();
    final String resourcesPath = basePath + java.io.File.separator + "nodejs";
    final File targetDirectory = new File(resourcesPath);
    try {
      if (targetDirectory.exists()) {
        logger.info("Starting teardown ~ {}", resourcesPath);
        FileUtils.deleteDirectory(targetDirectory);
      }
    } catch (IOException e) {
      stackTrace(e.getStackTrace());
      throw new ResErr("Tear Down failed");
    }
  }

  private void stackTrace(StackTraceElement[] stackTraceElements) {
    logger.error("StackTrace:\n{}", stackTraceElements);
  }

  private String pwd() {
    final File currentDirectory = new File(new File("").getAbsolutePath());
    return currentDirectory.getAbsolutePath();

  }

}
