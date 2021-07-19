import React from 'react';
import Home from '@components/Home';
import { Container } from 'reactstrap';
import { Link } from 'gatsby';
import { Global, Attract, Introduction, Score } from '../content';
import syntaxHighlight from '../helpers/syntaxHighlight';

const IndexPage = () => (
  <>
    <Home />

    <Container>
      <div className='py-5'>
        <h2>Global Config</h2>
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(JSON.stringify(Global, null, 4)),
            }}
          />
        </pre>

        <h2 className='mt-5'>Attract Screen</h2>
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(JSON.stringify(Attract, null, 4)),
            }}
          />
        </pre>

        <h2 className='mt-5'>Introduction Screen</h2>
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(JSON.stringify(Introduction, null, 4)),
            }}
          />
        </pre>

        <h2 className='mt-5'>Quiz Screen</h2>
        <p>
          <Link to='/quiz'>Click here</Link> to view the quiz screen content.
        </p>

        <h2 className='mt-5'>Score Screen</h2>
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(JSON.stringify(Score, null, 4)),
            }}
          />
        </pre>
      </div>
    </Container>
  </>
);

export default IndexPage;
