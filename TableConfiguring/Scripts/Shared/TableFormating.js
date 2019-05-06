$(document).ready(function () {
    var table = $('table');
    var tableCache = {};
    if (table.attr('interactive') == 'true') {
        $.each(table, function (key, value) {
            //window['tableData_' + value.getAttribute('name')] = Array.from($('tbody>tr', value));
            tableCache[value.getAttribute('name')] = Array.from($('tbody>tr', value));
        });
        table.find('a[sort]').click(function (event) {
            event.preventDefault();
            var colName = event.currentTarget.getAttribute('sort');
            var tb = $('table:has(a[sort=' + colName + '])')[0];
            //var cach = window['tableData_' + tb.getAttribute('name')];
            var cache = Array.from($('tbody>tr', tb));
            var tbh = $('thead th', tb);
            var tbd = $('tbody', tb)[0];
            tbd.innerHTML = '';
            var colId = $(tbh).index($('thead th:has(a[sort=' + event.currentTarget.getAttribute('sort') + '])', tb));
            var sorted = cache.sort((a, b) => {
                var val_a = isNaN(a.children[colId].innerText) ? a.children[colId].innerText : Number(a.children[colId].innerText);
                var val_b = isNaN(b.children[colId].innerText) ? b.children[colId].innerText : Number(b.children[colId].innerText);
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
        table.find('input[filter]').focusout(function (event) {
            event.preventDefault();
            var colName = event.currentTarget.getAttribute('filter');
            var tb = $('table:has(input[filter=' + colName + '])')[0];
            var cache = tableCache[tb.getAttribute('name')];
            var tbh = $('thead th', tb);
            var tbd = $('tbody', tb)[0];
            tbd.innerHTML = '';
            var colId = $(tbh).index($('thead th:has(input[filter=' + event.currentTarget.getAttribute('filter') + ')', tb));
            var filtered = cache.filter(tr => tr.children[colId].innerText.includes(event.currentTarget.value));
            for (i = 0; i < filtered.length; i++) {
                tbd.append(filtered[i]);
            }
        });
    }
});