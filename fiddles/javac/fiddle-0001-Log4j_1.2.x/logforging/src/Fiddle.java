import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import java.io.*;
import java.sql.SQLException;
import java.util.*;

public class Fiddle {

    static Logger log = Logger.getLogger(Fiddle.class.getName());

    public static void main(String[] args)throws IOException,SQLException{
        String log4jConfPath = "../log4j.properties";
        PropertyConfigurator.configure(log4jConfPath);

        log.debug("Hello this is a debug message");
        log.info("Hello this is an info message");
    }
}