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
                    <a href="${post.url}">Read more</a>
                `;
                postsDiv.appendChild(postElement);
            });
        });
}
