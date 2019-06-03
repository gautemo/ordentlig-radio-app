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
        this.audio = document.querySelector('#radio');
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
        this.stopAudio();
        document.querySelector('.stop-symbol').classList.add('hidden');
        setTimeout(() => document.querySelector('.play-symbol').classList.remove('hidden'), 500);
        document.querySelector('.waveHorizontals').classList.remove('playing');
    },

    playRadio: function () {
        this.playAudio();
        document.querySelector('.play-symbol').classList.add('hidden');
        setTimeout(() => document.querySelector('.stop-symbol').classList.remove('hidden'), 500);
        document.querySelector('.waveHorizontals').classList.add('playing');
    },

    playAudio: function () {
        this.audio.play();
    },

    stopAudio: function () {
        this.audio.pause();
    }
};

app.initialize();