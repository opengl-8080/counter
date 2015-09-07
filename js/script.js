$(function() {
    var KEY = 'counter.data';
    var data = getData();
    var now = new Date().getTime();

    if (86400000 < (now - data.time)) {
        reset();
    } else {
        showCount(data.count);
        save(data);
    }

    $('#countUp').on('click', countUp);
    $('#reset').on('click', reset);

    function countUp() {
        var data = getData();
        data.count++;
        save(data);
        showCount(data.count);
    }

    function reset() {
        localStorage.removeItem(KEY);
        var data = getData();
        showCount(data.count);
    }

    function showCount(count) {
        var id = '#counter';

        $(id)
            .text(count)
            .css('font-size', calcFontSize(count));
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
