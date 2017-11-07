import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    (window as any).zEmbed || function (e, t) {
      var n, o, d, i, s, a = [], r = document.createElement("iframe");
      (window as any).zEmbed = function () {
        a.push(arguments)
      }, (window as any).zE = (window as any).zE || (window as any).zEmbed, r.src = "javascript:false", r.title = "", (r as any).role = "presentation", ((r as any).frameElement || r).style.cssText = "display: none", d = document.getElementsByTagName("script"), d = d[d.length - 1], d.parentNode.insertBefore(r, d), i = r.contentWindow, s = i.document;
      try {
        o = s
      } catch (e) {
        n = document.domain, r.src = 'javascript:var d=document.open();d.domain="' + n + '";void(0);', o = s
      }
      o.open()._l = function () {
        var o = this.createElement("script");
        n && (this.domain = n), o.id = "js-iframe-async", o.src = e, this.t = +new Date, this.zendeskHost = t, this.zEQueue = a, this.body.appendChild(o)
      }, o.write('<body onload="document._l();">'), o.close()
    }("https://assets.zendesk.com/embeddable_framework/main.js", "imperialm.zendesk.com");
  }

  public openFooterSSOSite(url: any) {
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var positioncodes: any = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
    var dealerlcodes: any = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

    window.open(url + validToken + "&positioncode=" + positioncodes + "&dealercode=" + dealerlcodes, "_self")
  }
}
