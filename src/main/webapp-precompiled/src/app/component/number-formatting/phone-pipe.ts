import { Pipe } from '@angular/core';
@Pipe({
    name: 'phone'
})
export class PhonePipe {
    transform(val, args) {
        val = val.charAt(0) != 0 ? '' + val : '' + val;
        val = val.replace(/[^0-9]/g, "");
        let newStr = '';
        for (var i = 0; i < (Math.floor(val.length / 3) - 1); i++) {
            if (i == 0) {
                newStr = newStr + "(" + val.substr(0, 3) + ')-';
            } else {
                // alert()
                newStr = newStr + val.substr((i * 3), 3) + '-';
            }
        }
        return newStr + val.substr(i * 3);
    }
}