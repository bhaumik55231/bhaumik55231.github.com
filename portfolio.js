window.onload = () => {
    main();
};

const main = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
        .then(function(registration) {
          console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function(error) {
          console.log('Service worker registration failed, error:', error);
        });
    }
    const navItem = document.getElementsByClassName('nav-item');
    Array.from(navItem).forEach(element => {
        element.addEventListener('click', () => {
            removeActiveClass('nav-item', 'active');
            element.classList.add('active');
        });
    });
};

const removeActiveClass = (className, activeClass) => {
    let fileIconElement = document.getElementsByClassName(className);
    Array.from(fileIconElement).forEach(elm => {
        elm.classList.remove(activeClass);
    });
};