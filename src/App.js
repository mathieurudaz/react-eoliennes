import React, { Component } from 'react';
import './App.css';
import PolymorphicTracking from '@ta-interaktiv/react-polymorphic-tracking'
import PolymorphicShareButtons from '@ta-interaktiv/react-polymorphic-share-buttons'
import Masthead from '@ta-interaktiv/react-polymorphic-masthead'
import Map from "./Map"

import '@ta-interaktiv/semantic-ui/semantic/dist/components/reset.css'
import '@ta-interaktiv/semantic-ui/semantic/dist/components/site.css'
import '@ta-interaktiv/semantic-ui/semantic/dist/components/segment.css'
import '@ta-interaktiv/semantic-ui/semantic/dist/components/grid.css'
import '@ta-interaktiv/semantic-ui/semantic/dist/components/table.css'
import '@ta-interaktiv/semantic-ui/semantic/dist/components/header.css'
import '@ta-interaktiv/semantic-ui/semantic/dist/components/divider.css'
import '@ta-interaktiv/semantic-ui/semantic/dist/components/image.css'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="index">
          <Masthead
             mediaName='24heures'
             homepage='//www.24heures.ch'
             articleID='11319806'
             fullMediaName='24 heures'
             hashtags={['24heuresch']} />

          <div className="ui container">
            <Map width="100%" />
          </div>

          <PolymorphicShareButtons articleID='11319806' />
          <PolymorphicTracking articleId='11319806'/>
        </div>
      </div>
    );
  }
}

export default App;
