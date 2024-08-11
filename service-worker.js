self.addEventListener('push', event => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: data.icon,
        badge: data.badge,
        image: data.image, // Use a custom image to simulate background color
        tag: data.tag,
        renotify: true
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});


