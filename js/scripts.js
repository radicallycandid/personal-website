document.addEventListener("DOMContentLoaded", () => {
    const homeLink = document.getElementById('home-link');
    homeLink.addEventListener('click', (event) => {
        event.preventDefault();
        loadHomePage();
    });

    loadHomePage();
});

function loadHomePage() {
    document.getElementById('content').innerHTML = `
        <h2>Blog Posts</h2>
        <div id="posts"></div>
    `;
    fetchPosts();
}

function fetchPosts() {
    fetch('posts/posts.json')
        .then(response => response.json())
        .then(data => {
            const postsDiv = document.getElementById('posts');
            data.posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="#" class="read-more" data-post-url="${post.url}">Read more</a>
                `;
                postsDiv.appendChild(postElement);
            });
            addReadMoreEventListeners();
        });
}

function addReadMoreEventListeners() {
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const postUrl = event.target.getAttribute('data-post-url');
            fetch(postUrl)
                .then(response => response.text())
                .then(markdown => {
                    const contentDiv = document.getElementById('content');
                    contentDiv.innerHTML = `
                        <button id="back-button">Back to Home</button>
                        ${marked.parse(markdown)}
                    `;
                    document.getElementById('back-button').addEventListener('click', loadHomePage);
                });
        });
    });
}
