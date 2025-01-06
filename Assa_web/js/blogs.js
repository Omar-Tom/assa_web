document.addEventListener('DOMContentLoaded', () => {
    // Load the blog posts from blogs.json
    fetch('blogs.json')
        .then(response => response.json())
        .then(data => {
            const blogList = document.getElementById('blog-list');

            data.forEach(blog => {
                if (!blog.link) {
                    console.warn('Missing link for blog:', blog.title);
                    blog.link = '#'; // Fallback link if none is provided
                }

                const blogCard = document.createElement('div');
                blogCard.classList.add('col-md-4', 'mb-4');
                blogCard.innerHTML = `
                    <div class="card">
                        <img src="${blog.image}" class="card-img-top" alt="${blog.title}">
                        <div class="card-body">
                            <h5 class="card-title">${blog.title}</h5>
                            <p class="card-text">${blog.summary}</p>
                            <a href="${blog.link}" class="btn btn-primary">Read More</a>
                        </div>
                    </div>
                `;

                // Append the blog card to the blog list
                blogList.appendChild(blogCard);
            });
        })
        .catch(error => {
            console.error('Error loading blogs:', error);
        });
});
