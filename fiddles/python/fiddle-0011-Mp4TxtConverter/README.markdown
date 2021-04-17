fiddle-0011-Mp4TxtConverter
======

### Title

MP4 Text Converter


### Creation Date

04-15-21


### Location

Chicago, IL


### Issues

[Issue 360](https://github.com/bradyhouse/house/issues/360)


### Description

Python fiddle exploring how to convert (or transcribe) an audio MP4a file to readable text. In particular, given
a recording created using QuickTime audio to record the following script:

    Line 1
    Line 2
    Line 3
    Line 4
    The rain in Spain falls mainly on the plain

Create a python script that will convert any M4A audio file(s) found in its startup directory back to text and ouput back
to a physical file called `transcript.txt`. After creating the file, it should display the files contents on screen. In this
example, the script should display

    line 1
    line 2
    line 3
    line 4
    the Rain in Spain falls mainly on the plain

The script should:

  * accept a `debug` command line parameter, which places the logging level in DEBUG mode
  * use a logging format that includes a time stamp on each line
  * cleanup all temporary files
  * overwrite the `transcript.txt` file each time it is executed
  * should assume a pause break between lines of 2 seconds


### Pre-Requisite

Prior to running this fiddle, your machine should be setup with:

* [python3](https://installpython3.com/mac/)
* [pydub](https://pypi.org/project/pydub/)
* [speech_recognition](https://pypi.org/project/SpeechRecognition/)


### Use Case

To test out this script, from a commandline prompt navigate to the root of the fiddle's directory and execute the following command:

    > python3 script.py

      Line 1
      Line2
      line 3
      line for
      the rain in Spain falls mainly on the plain

Alternately, to see the debug logging message, execute the following command:

    > python3 script.py debug

      2021-04-17 06:42:07 DEBUG    setup ::::
      2021-04-17 06:42:07 DEBUG    Created chunks directory
      2021-04-17 06:42:07 DEBUG    toWav ::::
      2021-04-17 06:42:07 DEBUG    subprocess.call(['ffmpeg', '-y', '-f', 'mp4', '-i', './test.m4a', '-acodec', 'pcm_s16le', '-vn', '-f', 'wav', '-'])
      2021-04-17 06:42:07 DEBUG    Created test.wav
      2021-04-17 06:42:07 DEBUG    explodeWav ::::
      2021-04-17 06:42:19 DEBUG    audio chunk count 5
      2021-04-17 06:42:24 DEBUG    audio chunk count 1
      2021-04-17 06:42:25 DEBUG    audio chunk count 1
      2021-04-17 06:42:25 DEBUG    audio chunk count 1
      2021-04-17 06:42:25 DEBUG    audio chunk count 1
      2021-04-17 06:42:26 DEBUG    audio chunk count 1
      2021-04-17 06:42:26 DEBUG    toTxt ::::
      2021-04-17 06:42:27 DEBUG    Created ./chunks/0001_1618659739.txt
      2021-04-17 06:42:27 DEBUG    Created ./chunks/0002_1618659740.txt
      2021-04-17 06:42:29 DEBUG    Created ./chunks/0003_1618659741.txt
      2021-04-17 06:42:30 DEBUG    Created ./chunks/0004_1618659742.txt
      2021-04-17 06:42:32 DEBUG    Created ./chunks/0005_1618659743.txt
      2021-04-17 06:42:32 DEBUG    cleanup ::::
      Line 1
      Line2
      line 3
      line for
      the rain in Spain falls mainly on the plain


### Tags

python, python3, logging, os, pydub, time, speech_recognition
