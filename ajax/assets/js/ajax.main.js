const API = 'https://jsonplaceholder.typicode.com';

fetch(`${API}/posts`)
    .then(response => response.json())
    .then(posts =>{
        posts.forEach(post => {
            let createdHtmlFormatPost = renderPosts(post);
            document.getElementById('posts').appendChild(createdHtmlFormatPost);
        });
    }).catch(error => console.error(error));

//Render Posts in html
function renderPosts(post) {
    const blogPost = document.createElement('div');
    blogPost.id = 'card-'+post.id;
    const html = `
                  <div class="content">
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-body">${post.body}</p>
                    <h4 class="post-userId">${post.userId}</h4>
                  </div>
                  <br>
                  <div class="update-post">
                    <input type="text" id="title-${post.id}" placeholder="title" value="${post.title}">
                    <br>
                    <input type="number" name="userId" id="userId-${post.id}" placeholder="user id" value="${post.userId}">
                    <br>
                    <textarea name="body" id="body-${post.id}" cols="30" rows="10">${post.body}</textarea>
                    <br>
                    <button id="updateBtn" onclick="updatePost(${post.id})">Update</button>
                    <br>
                    <button onclick="getComments(${post.id})">Load Comments</button><br>
                    <button onclick="deletePost(${post.id})">Delete Post</button>
                    <br>
                  </div>
                  <hr>
                `;
    blogPost.innerHTML = html;
    return blogPost;          
}

function insertPost() {
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const userId = document.getElementById('userId').value;
    const  data = {
      title:title,
      body:body,
      userId:userId
    }
    fetch(`${API}/posts`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(post=>{
      let createdHtmlFormatPost = renderPosts(post);
      document.getElementById('posts').appendChild(createdHtmlFormatPost);
    }).catch(error => console.error(error));
}

// Delete Post
function  deletePost(id) {
    fetch(`${API}/posts/${id}`,{
      method:'DELETE',
    }).then(response => response.json())
    .then(post=>{
     document.getElementById('card-'+id).remove();
    })
}

//Update Post
function updatePost(id) {
    const title = document.getElementById('title-'+id).value;
    const body = document.getElementById('body-'+id).value;
    const userId = document.getElementById('userId-'+id).value;
  
    const data = {
      title:title,
      body:body,
      userId:userId
    }
    fetch(`${API}/posts/${id}`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(post=>{
       document.getElementById('card-'+id).getElementsByTagName('h3')[0].innerText = post.title;
       document.getElementById('card-'+id).getElementsByTagName('p')[0].innerText = post.body;
       document.getElementById('card-'+id).getElementsByTagName('h4')[0].innerText = post.userId;

    }).catch(error => console.error(error));
}


//Get Comments
function getComments(id) {
    fetch(`${API}/posts/${id}/comments`)
    .then(response => response.json())
    .then(comments => {
      document.getElementById('comments').innerHTML = '';
      comments.forEach(comment => {
        let createComment = renderComments(comment);
        document.getElementById('comments').appendChild(createComment);
     });
    document.getElementById('modal').classList.add('active');
  })
  .catch(error => console.error(error));
}

function renderComments(comment) {
    const commentItem = document.createElement('div');
    commentItem.id = 'comment-item-'+comment.id;
   const html = `
     <h3>${comment.name}</h3>    
     <p>${comment.body}</p>
     <a href="mailto:${comment.email}">By: ${comment.email}</a>
   `;
   commentItem.innerHTML = html;
   return commentItem;
}

function closeModal() {
    document.getElementById('comments').innerHTML = '';
    document.getElementById('modal').classList.remove('active');
}