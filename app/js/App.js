import React from 'react';
import axios from 'axios';

const Issue = (props) =>{
  return(
      <li className={props.state === 'closed' ? 'done' : ''}>
          <span>{props.title}</span>
          <i className="icon"></i>
      </li>
  )
}

const IssueList = (props) =>{
  return props.issuesList.map( issuesList => {

      return (
        <section className="issue-date" key={issuesList.date}>
          <header>
              {issuesList.date}
          </header>
          <ul className="issue-list">
              {issuesList.issues.map( (issue, i) => {
                return <Issue title={issue.title} state={issue.state} key={i} />
              })}
          </ul>
      </section>
      )
    });
}

class App extends React.Component{

  constructor() {
    super();
    this.state = {
      github: [],
      issues: []
    }
  };

  componentDidMount(){

        axios.get('https://api.github.com/repos/facebook/react/issues?state=all')
          .then( response => {

            const issues = response.data.reduce(function(acc, issue, i){

                const issue_date = issue.created_at.toString().split('T')[0];

                const date_obj = acc.find( item => {
                  return (item.date === issue_date )
                })

                if(date_obj){
                  date_obj.issues.push(issue)
                }else{
                  acc.push({
                    date: issue_date,
                    issues: [issue]
                  })
                }

                return acc;

            }, []);

            this.setState({
              issues: issues,
              github: response.data
            });
          })
  };


  render = () => {
    const {issues} = this.state;

    return(
        <IssueList issuesList={issues}/>
    );
  };
}

export default App;
