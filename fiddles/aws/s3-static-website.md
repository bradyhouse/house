![Imgur](https://i.imgur.com/M32RGmj.png)


S3 Static Website Hosting
======

How to configure an S3 bucket as a static website host.

## Steps

1.  Log into the Amazon Console
2.  Navigate to S3
3.  Create a new bucket called `{username}-website`
4.  In the S3 dashboard, click the link for the newly created bucket
5.  Click the `Properties` tab
6.  Click the `Static website hosting` button

    ![Imgur](https://i.imgur.com/Y7IbtQY.png)

7.  In the Static website hosting dialog, select `Use this bucket to host a website`
8.  Set the `Index document` to `index.html`
9.  Set the `Error document` to `error.html`
10. Click the `Save` button
11. Open a text editor and paste in the following text:
      
      ```<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="description" content="http://github/bradyhouse/house/fiddles/rxjs/fiddle-0002-TimeObservable">
          <meta name="author" content="bradyhouse@gmail.com">
          <link rel="shortcut icon" href="../../resources/images/favicon.ico" id="favicon"/>
          <link rel="stylesheet" href="styles.css" />
          <!-- RXJS -->
          <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/4.1.0/rx.all.js"></script>
          <!-- D3 -->
          <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.js"></script>
      
      </head>
      <body>
          <div id="target">
              <p id="step"></p>
              <p id="time">
                  subscribing ...
              </p>
          </div>
      
          <script language="JavaScript">
            (function (undefined) {
              "use strict";
      
              this.metadata = {
                fiddleHeader: 'Time Observable',
                urls: {
                  github: 'https://github.com/bradyhouse/house/tree/master/fiddles/rxjs/fiddle-0002-TimeObservable',
                },
                consoleTag: 'H O U S E ~ f i d d l e s'
              };
      
              class Timer {
                constructor(fn, scope, args, ms) {
                  this._fn = fn;
                  this._scope = scope;
                  this._args = args;
                  this._ms = ms;
                }
                tick() {
                  let me = this;
                  return Rx.Observable.create(function (observer) {
                    let onTimeout = function () {
                      try{
                        let res = me._fn(me._scope, me._args || []);
                        observer.onNext(res);
                        observer.onCompleted();
                      } catch (err) {
                        observer.onError(err);
                      }
      
                    };
                    window.setTimeout(onTimeout, me._ms);
                  });
                }
              }
      
              this.seconds = 0;
      
              this.clock = new Timer(
                function (self) {
                  return self.seconds += 1;
                },
                this, // scope
                null, // arguments
                1  // delay
              );
      
              this.tock = function () {
                var me = this;
                me.clock.tick().subscribe(
                  function onNext(res) {
                    let today = Date.now();
                    me.step = res;
      
                    d3.select("body")
                      .style("font-family", 'Courier, "Courier New"')
                      .style("text-align", 'center')
                      .style("background-color", '#0a001f')
                      .style("font-weight", '500')
                      .style("margin","0px")
                      .style("color", 'lime')
                      .style("vertical-align", "middle")
                      .style('font-size', function(d) {
                        let size = Math.ceil(50 * (window.innerWidth / window.innerHeight )) + 'px';
                        return size;
                      });
                    d3.select("p#time")
                      .text(today);
      
                  },
                  function onError(err) {
                    d3.select("p#target")
                      .append('div')
                      .text(err);
      
                  },
                  function onCompleted() {
                    me.tock();
                  }
                );
              };
      
              this.tock();
      
              console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
              console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
              console.group();
      
            }.call(this));
      
      
          </script>
      </body>
      </html>```
      

12. Save the file as `index.html`
13. Using the text editor, create a second a file and paste in the following content:

      
      ```<html>
        <head>
          <title>Error!</title>
        </head>
        <body>
          <h2>F U B A R</h2>
          <h3>Things are not good. The requested page cannot be found. So (I guess) try again or come back later...</h3>
        </body>
      </html>```

14. Save the file as `error.html`
15. Return to AWS and upload the new files to your new bucket

    ![Imgur](https://i.imgur.com/ZLDXn3n.png)
    
16. Set the permissions on the files to `Grant public read access to this object(s)`

    ![Imgur](https://i.imgur.com/3e4Ab7i.png)

17. Click the `properties` tab of the new bucket
18. Click the `Static website hosting` button
19. Click the `Endpoint` link

    ![Imgur](https://i.imgur.com/rhsSVRc.png)  

`

## Review Questions

1.  If your Route 53 domain name is `acloud.guru` then the name of your S3 static website bucket, should be what?
2.  What is the format of an S3 static website hosting bucket?
3.  What permissions are required to make a static website bucket public accessible?
4.  Does S3 automatically scale?

## Answers

1.  `acloud`
2.  `{bucket name}s3website.s3-website-{region}.amazonaws.com`
3.  Public read access on all files
4.  Yes, they scale infinitely

