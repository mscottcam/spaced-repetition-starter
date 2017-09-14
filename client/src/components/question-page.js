import React from 'react';
import * as Cookies from 'js-cookie';
import * as actions from '../actions/actions'
import {connect} from 'react-redux'

class QuestionPage extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         questions: [],
    //         answer: '',
    //         value: ''
    //     };
    // }

    componentDidMount() {
        // this.props.dispatch(actions.getQuestion());
        const accessToken = Cookies.get('accessToken');
        fetch('/api/questions', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(questions =>
            this.setState({
                questions
            })
        );
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(this.state.value)
    }

    onChange(value) {
        console.log(value.target.value)
        this.setState({value: value.target.value})
    }

    render() {
        // const questions = this.state.question.map((question, index) =>
        //     <li key={index}>{this.props.question}</li>
        // );

        return (
            <div>
            <ul className="question-list">
                {this.props.question}
            </ul>

            <form onSubmit={e => this.onSubmit(e)}>
                <input type='text' placeholder="Your answer here!" 
                onChange={e => this.onChange(e)}
                />
                <button type="submit">Submit Answer</button>
            </form> 

            <a href="/api/auth/logout">logout</a>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    question: state.question
});

export default connect(mapStateToProps)(QuestionPage);