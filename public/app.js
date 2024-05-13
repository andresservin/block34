// app.js

// Fetch posts from the API and render them
async function fetchPosts() {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
  
      const postsContainer = document.getElementById('posts-container');
      postsContainer.innerHTML = '';
  
      data.posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
  
        const titleElement = document.createElement('h2');
        titleElement.classList.add('post-title');
        titleElement.textContent = post.title;
  
        const contentElement = document.createElement('p');
        contentElement.classList.add('post-content');
        contentElement.textContent = post.content;
  
        const tagsElement = document.createElement('p');
        tagsElement.classList.add('post-tags');
        tagsElement.textContent = `Tags: ${post.tags.join(', ')}`;
  
        postElement.appendChild(titleElement);
        postElement.appendChild(contentElement);
        postElement.appendChild(tagsElement);
  
        postsContainer.appendChild(postElement);
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  
  // Call fetchPosts when the page loads
  window.onload = fetchPosts;
  