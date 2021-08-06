const findBtn = document.querySelector('.button-container');
const currentJobs = document.querySelector('.showing-jobs')


findBtn.addEventListener('click', () => {

  let text = document.getElementById('filter-jobs').value;
  getJobs().then(jobs => {
    let filteredJobs = filterJobs(jobs, text);
    showJobs(filteredJobs);
    
  })
  
})


function getJobs(){
  return fetch('data.json')
  .then(response => response.json()
  .then(data => {
    return data;
  }))
}


function filterJobs(jobs, searchText){
  if(searchText){
    let filteredJobs = jobs.filter(job => {
      if(job.roleName.toLowerCase().includes(searchText) || job.type.toLowerCase().includes(searchText) 
      || job.company.toLowerCase().includes(searchText)
      || job.requirements.content.toLowerCase().includes(searchText)){
        return true;
      }
      else{
        return false;
      }

    })
    return filteredJobs;
  }
  else{
    return jobs;
  }

}

function showJobs(jobs){
  
  let jobsContainer = document.querySelector('.jobs-container');
  let jobsHTML = '';

  console.log(jobs);

  jobs.forEach(job => {

   jobsHTML += `<div class="job-card">
    <div class="top">
      <img class="job-card-img" src="${job.logo}" alt="">
      <i class="fas fa-ellipsis-h"></i>
    </div>
    <div class="title">
      <span>${job.roleName}</span>
    </div>
    <div class="description">
      <span>${job.requirements.content}</span>
    </div>
    <div class="buttons">
      <div class="btn apply-now">Apply Now</div>
      <div class="btn">Message</div>
    </div>
  </div>`





  })



  let objsum = jobs.reduce((a,b) => a+1,0)

  jobsContainer.innerHTML = jobsHTML;
  
  currentJobs.innerHTML = (objsum < 2) ? `Showing ${objsum} Job`: `Showing ${objsum} Jobs`;
  
  
  
}




getJobs().then(data => {
  showJobs(data);
  
});
