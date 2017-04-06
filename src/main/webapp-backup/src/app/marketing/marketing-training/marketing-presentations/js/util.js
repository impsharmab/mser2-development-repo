function textCounter(field, countfield, maxlimit) {
    if (field.value.length > maxlimit)                    // if too long...trim it!
        field.value = field.value.substring(0, maxlimit);
    else                                                  // update 'characters left' counter
        countfield.value = maxlimit - field.value.length;
}

// Used by the colorListbox function
// list0 and list1 must be part of CSS (Cascading Style Sheets)
// For example: .list0 {background-color: yellow;}
function swapColor(obj, color) {
    if (color == 'listbox1')
        color = 'listbox0';
    else
        color = 'listbox1';

    obj.className = color;
    return color;
}

// Color code a listbox
// Parameters Required: form name and select name
function colorListbox(formName, listboxName) {
    var obj = document.forms[formName].elements[listboxName];
    for (var i = 0; i < obj.options.length; i++)
        var cssStyle = swapColor(obj.options[i], cssStyle);
}