nohup /Users/e13542/bin/android-sdk-macosx/tools/emulator -netdelay none -netspeed full -avd 320480QVGA &
sleep 60;
cd Puzz;
tns livesync android --emulator --watch;

