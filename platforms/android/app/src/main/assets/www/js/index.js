const app = {
    playButton: null,
    isPlaying: false,
    audio: null,
    isToggling: false,
    currentDisplayed: '',

    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        this.playButton = document.querySelector('.play-button');
        this.playButton.addEventListener('click', () => {
            if (!this.isToggling) {
                this.isPlaying = !this.isPlaying;
                if (this.isPlaying) {
                    this.playRadio();
                } else {
                    this.stopRadio();
                }
                this.isToggling = true;
                setTimeout(() => this.isToggling = false, 500);
            }
        });
    },

    stopRadio: function () {
        this.stopWithPlugin();
        //this.stopWithHTMLAudio();
        document.querySelector('.stop-symbol').classList.add('hidden');
        setTimeout(() => document.querySelector('.play-symbol').classList.remove('hidden'), 500);
        document.querySelector('.waveHorizontals').classList.remove('playing');
    },

    playRadio: function () {
        this.playWithPlugin();
        //this.playWithHTMLAudio();
        document.querySelector('.play-symbol').classList.add('hidden');
        setTimeout(() => document.querySelector('.stop-symbol').classList.remove('hidden'), 500);
        document.querySelector('.waveHorizontals').classList.add('playing');
    },

    playWithHTMLAudio: function () {
        this.audio = new Audio('http://mms-live.online.no/oradio_mp3_m');
        this.audio.play();
    },

    stopWithHTMLAudio: function () {
        this.audio.pause();
        this.audio = null;
    },

    playWithPlugin: function () {
        if (window.plugins && window.plugins.NativeAudio) {
            window.plugins.NativeAudio.preloadComplex('radio', 'http://mms-live.online.no/oradio_mp3_m', 1, 1, 0, function (msg) {
            }, function (msg) {
                console.log('error: ' + msg);
            });

            window.plugins.NativeAudio.play('radio');
        }
    },

    stopWithPlugin: function () {
        if (window.plugins && window.plugins.NativeAudio) {
            window.plugins.NativeAudio.stop('radio');
            window.plugins.NativeAudio.unload('radio');
        }
    }
};

app.initialize();