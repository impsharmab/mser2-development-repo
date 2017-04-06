function checkPartSearch(elmId) {
    var elm = document.getElementById( elmId );
    if (!elm ) {
        return false;
    }
    value = elm.value;
    if ( value.length < 3 ) {
        var cancel = confirm('Searches using a small number of part number characters may return a large number of results.\nSelect OK to coninue.');
        return cancel;
    } else {
        return true;
    }
}