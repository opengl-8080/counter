$(function() {
    var LIMIT = 60 * 60 * 27 * 1000;
    // var LIMIT = 5 * 1000; // for debug
    var KEY = 'counter.data';

    check();
    showCount(getData());
    setInterval(check, 1000);

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
    }

    function reset() {
        console.debug('reset count');
        localStorage.removeItem(KEY);
        var data = getData();
        showCount(data);
    }

    function showCount(data) {
        var id = '#counter';

        $(id)
            .text(data.count)
            .css('font-size', calcFontSize(data.count));

        save(data);
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
});
