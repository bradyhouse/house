(function (app, $, undefined) {

    var playerStreamDescriptionVisible = false,
        lastSelectedClipId = '';

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
                "id": "ashklasd132asddfgdf",
                "name": "War on Drugs continues",
                "description": "Losses continue in agressive raid on local property",
                "content-url": "http://buffalogrove.sat.iit.edu/Kitty.mp4",
                "thumb-url": "http://buffalogrove.sat.iit.edu/thumb/dogs_friends-t2.jpg"
            },
            {
                "id": "asdasd132asddf667jf",
                "name": "Parlimentary Proceedings",
                "description": "World Leaders meet to determine the latest policies on climate change relief",
                "content-url": "http://buffalogrove.sat.iit.edu/Clouds%2038%20Timelapse.mp4",
                "thumb-url": "http://buffalogrove.sat.iit.edu/thumb/colorful_clouds-t2.jpg"
            },
            {
                "id": "123dfg6132asddfgdz",
                "name": "Weather for March 22nd 2015",
                "description": "Join Jeremy Brown for today's weather",
                "content-url": "http://buffalogrove.sat.iit.edu/Clouds-Time_lapse_22.mp4",
                "thumb-url": "http://buffalogrove.sat.iit.edu/thumb/hidden_lagoon-t2.jpg"
            },
            {
                "id": "pzxc87asdkjl44h7h",
                "name": "Taking a walk on the wide-side",
                "description": "Cook Counties latest conservation efforts led to a new discovery",
                "content-url": "http://buffalogrove.sat.iit.edu/Flower_4.mp4",
                "thumb-url": "http://buffalogrove.sat.iit.edu/thumb/nature_scenes_3-t2.jpg"
            },
            {
                "id": "mkiaasdsjdh7asd8889",
                "name": "Musical Stunner",
                "description": "Local musician proves nay-sayers wrong by providing ample range",
                "content-url": "http://buffalogrove.sat.iit.edu/Piano_keys.mp4",
                "thumb-url": "http://buffalogrove.sat.iit.edu/thumb/turkey_karadeniz_region-t2.jpg"
            },
            {
                "id": "zklsjdpoiqwehbhfyvfy6h",
                "name": "H-Diddy Represent",
                "description": "The newest Album from H-Diddy",
                "content-url": "http://buffalogrove.sat.iit.edu/Pigeon.mp4",
                "thumb-url": "http://buffalogrove.sat.iit.edu/thumb/nanxiang_ancient_town_shanghai_china-t2.jpg"
            }
        ],

        // This is static html necessary to draw video player and controls
        html: '<div class="player"><div id="playerStreamDescription" ' +
            'class="player subTitle hidden"></div><div id="playerStreamName" ' +
            'class="header hidden"></div><video id="playerStream" ></video><div id="player-navbar" class="collapse navbar-collapse"><ul class="nav navbar-nav" style="margin-left: 5%;"><li><div id="playerStartButton" onclick="app.playerStreamPlay();" class="video-control left" href="#" title="play"><a href="#">&gt;</a></div><div id="playerPauseButton" onclick="app.playerStreamPause();" class="video-control hidden" href="#" title="play"><a class="rotate" href="#">=</a></div></li><li><div class="span8" style="margin-right: -3%;"><div class="bs-component"><div class="progress" style="height: 36px; width=150px; margin-left: -3%; margin-right: 3%;"><div id="playerProgressBar" class="progress-bar"style="width: 0%; height: 100%; background-color: #74A245;"></div></div></div></div></li><li><div id="playerFullScreenButton" href="#" onclick="app.playerStreamMaximize();" class="video-control right" ><a href="#">+</a></a></li></ul><!--/.nav-collapse --></div><!-- /.player-navbar --></div>' +
            '<div class="row-fluid">' +
            '<div class="carousel slide" id="myCarousel">' +
            '<div id="clipCarousel" class="carousel-inner">' +
            '</div>' +
            '<a data-slide="prev" href="#myCarousel" class="left carousel-control">‹</a>' +
            '<a data-slide="next" href="#myCarousel" class="right carousel-control">›</a>' +
            '</div>' +
            '</div>'
    };

    // Carousel Load Logic

    app.carouselLoad = function (clips) {
        var i = 0,
            openItemHtml = '<div class="item"><ul class="thumbnails">',
            openActiveItemHtml = '<div class="item active"><ul class="thumbnails">',
            closeItemHtml = '</ul></div>',
            innerClipCarouselHtml = openActiveItemHtml,
            clip = null,
            itemSize = 3;

        for (i = 0; i < clips.length; i++) {
            clip = clips[i];
            // <li class="span3">
            innerClipCarouselHtml += '<li class="span3">';
            // <div class="thumbnail" onclick="app.playerStreamLoad(this, clip[content-url], clip.description, clip[thumb-url]);" title="War on Drugs continues">
            innerClipCarouselHtml += '<div id="' + clip.id + '" class="thumbnail" ';
            innerClipCarouselHtml += 'onclick="app.playerStreamLoad(this, ';
            innerClipCarouselHtml += "'" + clip['content-url'] + "', ";
            innerClipCarouselHtml += "'" + escape(clip.description) + "', ";
            innerClipCarouselHtml += "'" + clip['thumb-url'] + "');";
            innerClipCarouselHtml += '" title="' + clip.name + '">';
            // <img src="http://buffalogrove.sat.iit.edu/thumb/dogs_friends-t2.jpg">
            innerClipCarouselHtml += '<img src="' + clip['thumb-url'] + '">';
            // </div>
            innerClipCarouselHtml += '</div>';
            innerClipCarouselHtml += '</li>';

            if (i == itemSize) {
                innerClipCarouselHtml += closeItemHtml + openItemHtml;
            }

        }
        $('#clipCarousel').html(innerClipCarouselHtml);
    };


    // Add Input Event handlers

    app.onAfterRender = function () {
        app.carouselLoad(app.store.data);
        app.playerLoadVideo(app.store.data[0]);
        // Add video stream listeners
        $('#playerStream')[0].addEventListener('timeupdate', app.playerStreamProgressChange, false);
        $('#playerStream')[0].addEventListener('ended', app.playerStreamEnded, false);
        // Now slide-in
        $('#fiddleHook').fadeIn().removeClass('hidden').addClass('enter-stage-south');
    };
    app.playerStreamProgressChange = function () {
        var percentage = Math.floor((100 / $('#playerStream')[0].duration) * $('#playerStream')[0].currentTime),
            cssWidthValue = percentage + '%',
            titleValue = Math.floor($('#playerStream')[0].currentTime) + ' of ' + Math.floor($('#playerStream')[0].duration) + ' seconds played';
        $('#playerProgressBar').css('width', cssWidthValue);
        $('#playerProgressBar').attr('title', titleValue);

        /*if (percentage > 25 && !playerStreamDescriptionVisible) {
         playerStreamDescriptionVisible = true;
         $('#playerStreamDescription').css('margin-right', '100%');
         $('#playerStreamDescription').removeClass('hidden');
         $('#playerStreamDescription').addClass("enter-stage-left");
         }*/
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
    app.playerStreamLoad = function (caller, url, title, poster) {
        var streamDescriptionHtml = '<h3>' + unescape(title) + '</h3>',
            streamNameHtml = '<h4>' + caller.title + '</h4>',
            clipId = caller.id;
        console.log('clipId = ' + clipId);
        app.playerStreamReset();
        $('#playerStreamName').html(streamNameHtml);
        $('#playerStream')[0].src = url;
        $('#playerStreamDescription').html(streamDescriptionHtml);
        $('#playerStream')[0].title = caller.title;
        $('#playerStream')[0].poster = poster;
        window.scrollTo(0, 0);
        $('#playerStream')[0].play();

        if (lastSelectedClipId !== '') {
            $(lastSelectedClipId).removeClass('selected');
        }
        lastSelectedClipId = caller.id;
        $(caller.id).addClass('selected');
        console.log(caller);

    };

    // Utilities

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


})(window.app = window.app || {}, jQuery)