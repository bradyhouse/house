(function (app, $, undefined) {

    var playerStreamDescriptionVisible = false;

    $(document).ready(function () {
        // Inject HTML structure
        $('#fiddleHook').html(app.store.html);

        // Wait a second, and then add event plumbing
        setTimeout(app.onAfterRender, 1000);
    });

    // Data Store

    app.store = {
        // Static "on-board" json.
        data: [
            {
                "id": "1",
                "name": "War on Drugs continues",
                "description": "Losses continue in agressive raid on local property",
                "content-url": "http://buffalogrove.sat.iit.edu/Kitty.mp4",
                "thumb-url": "http://buffalogrove.sat.iit.edu/thumb/dogs_friends-t2.jpg"
            }
        ],
        // This is static html necessary to draw video player and controls
        html: '<div class="player"><div id="playerStreamDescription" class="player subTitle hidden"></div><div id="playerStreamName" class="header hidden"></div><video id="playerStream" ></video><div id="player-navbar" class="collapse navbar-collapse" style="padding-top: 3%;"><ul class="nav navbar-nav" style="margin-left: -2%;"><li><div id="playerStartButton" onclick="app.playerStreamPlay();" class="video-control left" href="#" title="play"><a href="#">&gt;</a></div><div id="playerPauseButton" onclick="app.playerStreamPause();" class="video-control hidden" href="#" title="play"><a class="rotate" href="#">=</a></div></li><li><div class="span8" style="margin-right: -40px;"><div class="bs-component"><div class="progress" style="height: 36px; margin-left: -3%; margin-right: 45px;"><div id="playerProgressBar" class="progress-bar"style="width: 0%; height: 100%; background-color: #74A245;"></div></div></div></div></li><li><div id="playerFullScreenButton" href="#" onclick="app.playerStreamMaximize();" class="video-control right" ><a href="#">+</a></a></li></ul><!--/.nav-collapse --></div><!-- /.player-navbar --></div>'
    };


    // Add Input Event handlers

    app.onAfterRender = function () {
        app.playerLoadVideo(app.store.data[0]);
        // Add video stream listeners
        $('#playerStream')[0].addEventListener('timeupdate', app.playerStreamProgressChange, false);
        $('#playerStream')[0].addEventListener('ended', app.playerStreamEnded, false);
        // Now slide-in
        $('#fiddleHook').fadeIn().removeClass('hidden').addClass('enter-stage-south');
    };

    app.playerStreamProgressChange = function () {
        var percentage = Math.floor((100 / $('#playerStream')[0].duration) *
                $('#playerStream')[0].currentTime),
            cssWidthValue = percentage + '%',
            titleValue = Math.floor($('#playerStream')[0].currentTime) + ' of ' + Math.floor($('#playerStream')[0].duration) + ' seconds played';
        $('#playerProgressBar').css('width', cssWidthValue);
        $('#playerProgressBar').attr('title', titleValue);

        if (percentage > 25 && !playerStreamDescriptionVisible) {
            playerStreamDescriptionVisible = true;
            $('#playerStreamDescription').css('margin-right', '100%');
            $('#playerStreamDescription').removeClass('hidden');
            $('#playerStreamDescription').addClass("enter-stage-left");
        }
    };
    app.playerStreamEnded = function () {
        app.playerStreamReset();
    };
    app.playerStreamPlay = function () {
        $('#playerStream')[0].play();
        $('#playerStartButton').addClass('hidden');
        $('#playerPauseButton').removeClass('hidden');
    };
    app.playerStreamPause = function () {
        $('#playerStream')[0].pause();
        $('#playerStartButton').removeClass('hidden');
        $('#playerPauseButton').addClass('hidden');
    };
    app.playerStreamMaximize = function () {

        if ($('#playerStream')[0].requestFullScreen) {
            //w3c
            $('#playerStream')[0].requestFullScreen();
        } else if ($('#playerStream')[0].webkitRequestFullScreen) {
            //Google Chrome
            $('#playerStream')[0].webkitRequestFullScreen($('#playerStream')[0].ALLOW_KEYBOARD_INPUT);
        } else if ($('#playerStream')[0].mozRequestFullScreen) {
            //Firefox
            $('#playerStream')[0].mozRequestFullScreen();
        } else {
            alert('Your browser does not Support Full Screen Mode.');
            return;
        }
    };
    app.playerStreamReset = function () {
        $('#playerStream')[0].pause();
        $('#playerStartButton').removeClass('hidden');
        $('#playerPauseButton').addClass('hidden');
        $('#playerStreamDescription').addClass('hidden');
        $('#playerStreamDescription').removeClass('enter-stage-left');
        playerStreamDescriptionVisible = false;
        $('#playerStream')[0].currentTime = 0;
        $('#playerProgressBar').css('width', '0%');
        $('#playerProgressBar').attr('title', +'0 of ' + Math.floor($('#playerStream')[0].duration) + ' seconds played');
    };
    app.playerLoadVideo = function (clip) {
        var streamDescriptionHtml = '<h3>' + unescape(clip.description) + '</h3>',
            streamNameHtml = '<h4>' + clip.name + '</h4>';
        $('#playerStream')[0].src = clip['content-url'];
        $('#playerStream')[0].poster = clip['thumb-url'];
        $('#playerStreamDescription').html(streamDescriptionHtml);
        $('#playerStreamName').html(streamNameHtml).removeClass("hidden");
    };

})(window.app = window.app || {}, jQuery)
