$(document).ready(function () {
    var table = $('table');
    if (table.attr('interactive') == 'true') {
        $.each(table, function (key, value) {
            window['tableData_' + value.getAttribute('name')] = Array.from($('tbody>tr', value));
        });
        table.find('a[sort]').click(function (event) {
            event.preventDefault();
            var colName = event.currentTarget.getAttribute('sort');
            var tb = $('table:has(a[sort=' + colName + '])')[0];
            var cach = window['tableData_' + tb.getAttribute('name')];
            var tbh = $('thead th', table);
            var tbd = $('tbody', table)[0];
            var colId = $(tbh).index($('th:has(a[sort=' + event.currentTarget.getAttribute('sort') + '])', table));
            var sorted = cach.sort((a, b) => {
                var val_a = isNaN(a.children[colId].innerText) ? a.children[colId].innerText : Number(a.children[colId].innerText);
                var val_b = isNaN(b.children[colId].innerText) ? b.children[colId].innerText : b.children[colId].innerText;
                if (val_a < val_b)
                    return -1;
                if (val_a > val_b)
                    return 1;
                if (val_a = val_b)
                    return 0;
            });
            for (i = 0; i < sorted.length; i++) {
                tbd.append(sorted[i]);
            }
        });
    }
});