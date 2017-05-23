import React from 'react'
import Article from '../Article/Article'
import steem from 'steem'
import { withState, compose, pure, lifecycle, } from 'recompose'
import './App.css'

const App = ({articles})=> (
  <div className="container">
    {articles.map(article=> (
      <Article key={article.id} {...article}/>
    ))}
  </div>
)

export default compose(
  withState('articles', 'setArticles', []),
  lifecycle({
    componentDidMount: function (){
      //fetch articles
      console.log("mount");
      steem.api.getDiscussionsByTrendingAsync(
        {
          category: '',
          limit: 10,

        }, (err, result)=> {
          if (err) {
            console.log('err', err)
            return
          }
          this.props.setArticles(result)
          console.log('result[0]', result[0])
      });
    },
  }),
  pure
)(App)
