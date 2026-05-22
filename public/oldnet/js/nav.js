function writeNav(activePage) {
    var isNS4 = document.layers ? 1 : 0;

    var pages = [
        ['home.html', 'Home'],
        ['projects.html', 'Projects'],
        ['links.html', 'Links'],
        ['payments.html', 'Payments'],
        ['question.html', 'Why IE?']
    ];

    // Static time rendered at page load. IE4+/modern browsers get live
    // updates from compat.js via innerHTML. NS4 shows this value only
    // (document.layers inside table cells is too broken for live rewrites).
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (!h) h = 12;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    var timeStr = h + ':' + m + ':' + s + ' ' + ap;

    var o = '';
    o += '<div class="sidebar-list">';
    o += '<div><ul>';
    o += '<li class="sidebar-list-item"><span class="sidebar-title">Axle\'s Coffee</span></li>';
    o += '<li class="sidebar-list-break"><span class="sidebar-title-smol" id="currentTime">' + timeStr + '</span></li>';

    for (var i = 0; i < pages.length; i++) {
        var href = pages[i][0];
        var label = pages[i][1];
        o += '<li class="sidebar-list-item">';
        o += '<a href="' + (activePage == href ? '#' : './' + href) + '">' + label + '</a>';
        o += '</li>';
    }

    o += '</ul></div>';
    // NS4: position:absolute on .footer-text-line and .logo is relative to the
    // viewport in NS4, not the sidebar div. Emit plain in-flow HTML for NS4 instead.
    if (isNS4) {
        o += '<center><font face="Arial,sans-serif" size="1" color="#68a593">This page is best viewed in</font></center>';
        o += '<center>';
        o += '<img src="./img/ie_animated.gif" alt="Best viewed in IE 8" border="0">';
        o += '<img src="./img/now9.gif" alt="Netscape Now!" border="0">';
        o += '</center>';
    } else {
        o += '<div class="push"></div>';
        o += '<div class="footer-text-line"><ul>';
        o += '<li class="footer-list-item"><b>This page is best viewed in</b></li>';
        o += '</ul></div>';
        o += '<div class="image-container">';
        o += '<img src="./img/ie_animated.gif" alt="Best viewed in IE 8" class="logo first" border="0">';
        o += '<img src="./img/now9.gif" alt="Netscape Now!" class="logo last" border="0">';
        o += '</div>';
    }
    o += '</div>';

    document.write(o);
}
