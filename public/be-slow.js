function beSlow() {
    var x = 0;
    for (var i = 0; i < 10000000; i++) {
        if (!document.querySelector('.be-slower')) {
            x++;
        }
    }
    document.write('<p>Going async</p>');
    setTimeout(beSlow, 1);
}

beSlow();