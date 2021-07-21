import { Link } from 'gatsby';
import React from 'react';
import { Container } from 'reactstrap';
import { Quiz } from '../content';
import syntaxHighlight from '../helpers/syntaxHighlight';

const QuizPage = () => (
  <>
    <Container>
      <p className='mt-5'>
        Go back to the <Link to='/'>Home</Link> page.
      </p>

      <div className='py-5'>
        <h1>Quiz Screen</h1>

        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(JSON.stringify(Quiz, null, 4)),
            }}
          />
        </pre>
      </div>

      <p className='pb-5'>
        Go back to the <Link to='/'>Home</Link> page.
      </p>
    </Container>
  </>
);

export default QuizPage;
