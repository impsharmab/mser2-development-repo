$(document).ready(function() {
    var mser = '#70a1eb';
    var serviceLane = '#ababab';
    var accessories = '#f48d29';

    var color = mser;   // default
    var animate = false;

    var url = window.location.href
    if (url.indexOf('a=true') > -1) {
        if (url.indexOf('home.do') > -1) {
            color = mser;
            animate = true;
        } else if (url.indexOf('serviceLaneReward.do') > -1) {
            color = serviceLane;
            animate = true;
        } else if (url.indexOf('homeAccessories.do') > -1) {
            color = accessories;
            animate = true;
        }
    } else {
        if (url.indexOf('serviceLaneReward.do') > -1) {
            color = serviceLane;
        } else if (url.indexOf('rules.do') > -1) {
            color = serviceLane;
        } else if (url.indexOf('serviceLaneMaintenance.do') > -1) {
            color = serviceLane;
        } else if (url.indexOf('contractListing.do') > -1) {
            color = serviceLane;
        } else if (url.indexOf('paymentsReport.do') > -1) {
            color = serviceLane;
        } else if (url.indexOf('ineligibleContractsReport.do') > -1) {
            color = serviceLane;
        } else if (url.indexOf('approveContractsReport.do') > -1) {
            color = serviceLane;
        } else if (url.indexOf('faqs.do') > -1) {
            color = serviceLane;
        } else if (url.indexOf('homeAccessories.do') > -1) {
            color = accessories;
        } else if (url.indexOf('passwordAuthenticationRequest.do?approveMVP') > -1) {
            color = serviceLane;
        }
        $('#drawline').css( 'background-color', color);
    }

    if (animate) {
        $('#drawline').css( 'width', '340px');
        $('#drawline').css('background-color', color);
        $('#drawline').animate( {
                width: '100%'
            }, {
                queue: false,
                duration: 2000,
                specialEasing: {
                    width: 'easeOutBounce'
                }
            }
        )
    }
});