package browser.impl;

import browser.Browser;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.By;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Value;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.File;

import java.net.MalformedURLException;
import java.net.URL;

import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;


public class ChromeBrowser implements Browser {

  //region INTERNAL MEMORY

  private WebDriver webDriver;
  private static final Logger logger = LoggerFactory.getLogger(ChromeBrowser.class);
  private String sessionId;

  //endregion

  //region APPLICATION PROPERTIES

  @Value("${chr.isHeadless}")
  private Boolean isHeadless;

  @Value("${chr.ur}")
  private String ur;

  @Value("${chr.ps}")
  private String ps;

  @Value("${chr.targetUrl}")
  private String targetUrl;

  @Value("${chr.driverPath}")
  private String driverPath;

  @Value("${chr.jsFile}")
  private String jsFile;

  @Value("${chr.cookie.name}")
  private String cookieName;

  @Value("${chr.cookie.value}")
  private String cookieValue;

  @Value("${chr.cookie.domain}")
  private String cookieDomain;

  @Value("${chr.cookie.path}")
  private String cookiePath;

  @Value("${chr.cookie.}")
  private Boolean cookieIsSecure;

  @Value("${chr.login.urFieldId}")
  private String loginUrFieldId;

  @Value("${chr.login.psFieldId}")
  private String loginPsFieldId;

  @Value("${chr.login.btnId}")
  private String loginBtnId;

  //endregion

  //region BROWSER IMPLEMENTATION

  @Override
  public String start() throws InterruptedException, MalformedURLException {
      setup();
      webDriver.get(targetUrl);
      Date expiration = calculateExpiration();
      Cookie cookie = new Cookie(cookieName, cookieValue, cookieDomain, cookiePath,
        expiration, cookieIsSecure);
      webDriver.manage().addCookie(cookie);
      webDriver.findElement(By.id(loginUrFieldId)).sendKeys(ur);
      webDriver.findElement(By.id(loginPsFieldId)).sendKeys(ps);
      webDriver.findElement(By.id(loginBtnId)).click();
      Thread.sleep(15000);
      writeSessionJs();
      return sessionId;
  }

  @Override
  public void quit() {
      if (webDriver != null) {
        webDriver.quit();
        logger.info("Session ~ " + sessionId + " ended");
      }
      deleteJsFile();
  }

  //endregion

  //region INTERNAL METHODS

  private Date calculateExpiration() {
    Calendar calendar = Calendar.getInstance();
    calendar.add(Calendar.DAY_OF_YEAR, 1);
    return calendar.getTime();
  }

  private void setup() throws MalformedURLException {

    System.setProperty("webdriver.chrome.driver", driverPath);

    ChromeOptions chromeOptions = new ChromeOptions();
    chromeOptions.addArguments("--disable-gpu", "--window-size=1920,1200", "--ignore-certificate-error");
    if (isHeadless) {
      chromeOptions.addArguments("--headless");
    }

    DesiredCapabilities desiredCapabilities = DesiredCapabilities.chrome();
    desiredCapabilities.setCapability(ChromeOptions.CAPABILITY, chromeOptions);

    webDriver = new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), desiredCapabilities);
    webDriver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

    sessionId = ((RemoteWebDriver) webDriver).getSessionId().toString();

  }

  private void writeSessionJs() {
    try {
      deleteJsFile();
      FileWriter fileWriter = new FileWriter(jsFile);
      BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);

      bufferedWriter.write("'use strict';");
      bufferedWriter.newLine();
      bufferedWriter.newLine();
      bufferedWriter.write("module.exports = { ");
      bufferedWriter.newLine();
      bufferedWriter.write("sessionId: '" + sessionId + "'");
      bufferedWriter.newLine();
      bufferedWriter.write("};");
      bufferedWriter.close();
      logger.info("Generated ~ " + jsFile);

    }
    catch (IOException e) {
      e.printStackTrace();
    }
  }

  private void deleteJsFile() {
    File file = new File(jsFile);
    if (file.exists()) {
      file.delete();
      logger.info("Deleted ~ " + jsFile);
    }

  }


  //endregion

}
