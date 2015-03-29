(function (app, $, undefined) {

    $(document).ready(function () {
       $('#fiddleHook').html(app.store.html);
       setTimeout(app.onAfterRender, 1000);
    });

    // After Render event handler
    app.onAfterRender = function () {
        app.loadCarousel(app.store.data);
        $('.carousel').carousel();
        $('#fiddleHook').fadeIn().removeClass('hidden').addClass('enter-stage-south');
    };

    // Static data store
    app.store = {
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
        html: '<div class="row-fluid">' +
            '<div class="carousel slide" id="myCarousel">' +
            '<div id="clipCarousel" class="carousel-inner">' +
            '</div>' +
            '<a data-slide="prev" href="#myCarousel" class="left carousel-control">‹</a>' +
            '<a data-slide="next" href="#myCarousel" class="right carousel-control">›</a>' +
            '</div>' +
            '</div>'
    };

    // Load Carousel
    app.loadCarousel = function (clips) {
        var i = 0,
            openItemHtml = '<div class="item"><ul class="thumbnails">',
            openActiveItemHtml = '<div class="item active"><ul class="thumbnails">',
            closeItemHtml = '</ul></div>',
            innerClipCarouselHtml = openActiveItemHtml,
            clip = null,
            lastClipIndex = clips.length - 1;

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

            if (i < lastClipIndex) {
                innerClipCarouselHtml += closeItemHtml + openItemHtml;
            } else {
                innerClipCarouselHtml += closeItemHtml;
            }
        }
        $('#clipCarousel').html(innerClipCarouselHtml);
    };


})(window.app = window.app || {}, jQuery);

