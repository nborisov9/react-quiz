import React from 'react';
import { Route, Switch } from 'react-router-dom';

import 'normalize.css';
import './App.module.scss';
import { Layout } from './hoc/Layout/';
import { Quiz } from './containers/Quiz';
import { QuizCreator } from './containers/QuizCreator';
import { Auth } from './containers/Auth';
import { QuizList } from './containers/QuizList';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={QuizList} />
        <Route path="/auth" component={Auth} />
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
      </Switch>
    </Layout>
  );
}

export default App;
