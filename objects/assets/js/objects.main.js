statuses = {
    1: 'Status 1',
    2: 'Status 2',
    3: 'Status 3',
    4: 'Status 4'
};

occupations = {
    1: 'Doctor',
    2: 'Detective',
    3: 'Astronaut',
    4: 'Teacher'
};

function createNewUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const status = document.getElementById('status').value;
  const occupation = document.getElementById('occupation').value;
  
  const user = {
    name:name,
    email:email,
    status:statuses[status],
    occupation:occupations[occupation]
  }
  
  const userHtml = renderHtml(user);
   
  document.getElementById('showUsers').appendChild(userHtml);
  
}

function renderHtml(user) {
userHtml = document.createElement('div');
userHtml.classList.add('card');
html = `
    <div class="htmlShow">
        <h1>Name: ${user.name}</h1>
        <h1>Email: ${user.email}</h1>
        <h1>Status: ${user.status}</h1>
        <h1>Occupation: ${user.occupation}</h1>
    </div>
  `;
  userHtml.innerHTML = html;
  return userHtml;
}