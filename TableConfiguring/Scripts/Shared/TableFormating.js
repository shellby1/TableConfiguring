$(document).ready(function () {
    var table = $('table');
    if (table.attr('interactive') == 'true') {
        table.find(' th[sort] > a').click(function (event) {
            debugger;
            event.preventDefault();
            alert(event.target);
        });
    }
});