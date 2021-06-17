var menuLinks = document.getElementsByClassName('menu-link');
for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('mouseover', function(e) {
        this.querySelector('span').classList.remove('hidden');
    });

    menuLinks[i].addEventListener('mouseout', function(e) {
        this.querySelector('span').classList.add('hidden');
    });
}