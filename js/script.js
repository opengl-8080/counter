$(function() {
    var LIMIT = 60 * 60 * 27 * 1000;
    // var LIMIT = 60*60*1 * 1000 + 5000; // for debug
    var KEY = 'counter.data';

    showTimeLeft();
    check();
    showCount(getData());

    setInterval(function() {
        showTimeLeft();
        check();
    }, 1000);

    $('#countUp').on('click', countUp);
    $('#reset').on('click', reset);

    function check() {
        var data = getData();
        var now = new Date().getTime();

        if (LIMIT < (now - data.time)) {
            reset();
        }
    }

    function countUp() {
        var data = getData();
        data.count++;
        showCount(data);
        save(data);
        showTimeLeft();
    }

    function reset() {
        console.debug('reset count');
        localStorage.removeItem(KEY);
        var data = getData();
        showCount(data);
        save(data);
    }

    function showCount(data) {
        var id = '#counter';

        $(id)
            .text(data.count)
            .css('font-size', calcFontSize(data.count));
    }

    function calcFontSize(count) {
        if (500 <= count) {
            return '179pt';
        } else {
            return (12 + count / 3) + 'pt';
        }
    }

    function save(data) {
        data.time = new Date().getTime();
        localStorage.setItem(KEY, JSON.stringify(data));
    }

    function getData() {
        var data = localStorage.getItem(KEY);
        return data ? $.parseJSON(data) : {count: 0, time: 0};
    }

    function showTimeLeft() {
        var last = getData().time;
        var limit = last + LIMIT;
        var now = new Date().getTime();
        var left = limit - now;

        var duration = moment.duration(left);
        var d = duration.days();
        var h = leftZeroPadding(duration.hours() + (d * 24), 2);
        var m = leftZeroPadding(duration.minutes(), 2);
        var s = leftZeroPadding(duration.seconds(), 2);

        $('#timeLeft').text(h + ':' + m + ':' + s);

        if (duration.as('hours') < 1) {
            $('#timeLeft').addClass('warning');
        } else {
            $('#timeLeft').removeClass('warning');
        }
    }

    function leftZeroPadding(n, size) {
        var s = '' + n;

        for (var i=0; i<(size - s.length); i++) {
            s = '0' + s;
        }

        return s;
    }
});
