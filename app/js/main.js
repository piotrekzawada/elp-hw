document.addEventListener("DOMContentLoaded", function(event) {
    fetch('https://api.github.com/repos/facebook/react/issues?state=all')
        .then(function(response) {
            return response.json();
        })
        .then(function(issues) {
            var map = issues.map(function (issue) {
                var single ={
                    created_at: issue.created_at,
                    title: issue.title,
                    state: issue.state
                };

                return single;
            })

            createIssues(map);
        });

    function createIssues(issues) {
        var issuesList = document.querySelector('.issue-date.template'),
            ul = issuesList.querySelector('ul');

        issues.forEach(function (issue) {
            var singleIssue = ul.querySelector('li.template'),
                li = singleIssue.cloneNode(true);

            li.querySelector('span').textContent = issue.title;

            if(issue.state !== 'open'){
             li.classList.add('done');
            }

            li.classList.remove('template');
            ul.appendChild(li);
        });

        issuesList.classList.remove('template');

    };

    function createSignleIssue(issue) {
        console.log('issue', issue);
    };

});