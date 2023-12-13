const apiUrl = `https://api.github.com/users/mortenl-dev/repos`;
const apiUrlCommit = `https://api.github.com/search/commits?q=author:mortenl-dev+committer-date:>2023-01-01`;
var currentProj = -1;
  const username = 'mortenl-dev'; // Replace with the GitHub username
  const container = document.getElementById('projects');
        // Make a request to the GitHub API to get the list of repositories
        fetch(`https://api.github.com/users/${username}/repos`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch repositories: ${response.statusText}`);
            }
            return response.json();
          })
          .then(repositories => {
            // Iterate over each repository and fetch additional details
            const repoDetailsPromises = repositories.map(repo => {
              // Make a request for each repository
              return fetch(repo.url)
                .then(response => {
                  if (!response.ok) {
                    throw new Error(`Failed to fetch repository details: ${response.statusText}`);
                  }
                  return response.json();
                });
            });
        
            // Wait for all individual repository requests to complete
            return Promise.all(repoDetailsPromises);
          })
          .then(repoDetailsArray => {
            repoDetailsArray.forEach(data => {

              const repoElement = document.createElement('div');
              const repoInner = document.createElement('div');
              repoInner.classList.add('repo-info');
              repoElement.classList.add('project');
              // Extract the information you need from the data object
              const repoInfo = `
              <a style="font-size:24px " href="${data.html_url}" target="_blank" class="fade-underline">${data.name}</a>
              <p> | ${data.description}</p>
              
              <p>Written with: ${data.language}</p>
              `;
              //<p>Stars: ${data.stargazers_count}</p>
              // <p>Forks: ${data.forks_count}</p>
              // Display the repository information in the 'repo-info' div
              repoInner.innerHTML = repoInfo;
              repoElement.appendChild(repoInner);
              container.appendChild(repoElement);
            });
            if (repoDetailsArray.Length % 2 != 0) {
              const repoElement = document.createElement('div');
              const repoInner = document.createElement('div');
              repoInner.classList.add('repo-info');
              repoElement.classList.add('project');

              repoElement.appendChild(repoInner);
              container.appendChild(repoElement);
            }
            currentProj = repoDetailsArray.Length / 2;
          })
          .catch(error => {
            console.error('Error:', error.message);
          });
let currentIndex = 0;
  const elements = document.querySelectorAll('.project');
  const projectContainer = document.querySelector('#projects');

  function switchElement(direction) {
    currentIndex += direction;

    if (currentIndex < -7) {
      currentIndex = 7 - 1;        //elements.length
    } else if (currentIndex >= 7) { //NEEDS TO BE 14 ITS 0
      currentIndex = -7;
    }

    updateDisplay();
  }

  function updateDisplay() {
    const transformValue = `translateX(${-currentIndex * 250}%)`;
    projectContainer.style.transform = transformValue;
  }


