document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
    const getInputValue = id => document.getElementById(id).value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Math.floor(Math.random() * 100000000) + '';
    const status = 'Open';

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')) {
        issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
}

const closeIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find(issue => parseInt(issue.id) === parseInt(id));
    if (currentIssue.status === 'Open') {
        currentIssue.status = 'Closed';
    } else {
        currentIssue.status = 'Open';
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

const deleteIssue = id => {
    const answer = confirm('Are you sure want to delete!');
    if (answer === true) {
        const issues = JSON.parse(localStorage.getItem('issues'));
        const remainingIssues = issues.filter(issue => parseInt(issue.id) !== parseInt(id))
        localStorage.setItem('issues', JSON.stringify(remainingIssues));
        fetchIssues();
    }
}

const fetchIssues = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';


    for (var i = 0; i < issues.length; i++) {
        const { id, description, severity, assignedTo, status } = issues[i];
        issuesList.innerHTML += `
        <div class="well">
            <h6>Issue ID: ${id} </h6>
            <p>Status: <span class="label label-info"> ${status} </span></p>
            <h3>${status === 'Open' ? description : `<del>${description}</del>`}</h3>
            <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
            <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
            <a onclick="closeIssue(${id})" class="btn btn-warning">${status === 'Open' ? 'Close' : 'Open'}</a>
            <a onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
        </div>
        `;
    }
}