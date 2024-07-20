document.addEventListener("DOMContentLoaded", () => {
    fetchPosts();
});

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
                    <a href="${post.url}" class="read-more" data-post-url="${post.url}">Read more</a>
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
                    contentDiv.innerHTML = marked.parse(markdown);
                });
        });
    });
}
