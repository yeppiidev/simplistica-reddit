import * as React from 'react'
import ons from 'onsenui/esm';
import * as Ons from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.min.css';

import './Styles/App.css'

import HomePage from './Pages/Home';
import TrendingPage from './Pages/Trending';
import SearchPage from './Pages/Search';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
  }

  handleClick() {
    ons.notification.alert('Hello world!');
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='center'>Simplistica</div>
      </Ons.Toolbar>
    );
  }

  renderTabs() {
    return [
      {
        content: <HomePage />,
        tab: <Ons.Tab label='Home' icon='ion-ios-home' key="home" />
      },
      {
        content: <SearchPage />,
        tab: <Ons.Tab label='Search' icon='ion-ios-search' key="search" />
      },
      {
        content: <TrendingPage />,
        tab: <Ons.Tab label='Trending' icon='ion-ios-flame' key="trending" />
      }
    ];
  }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
        <Ons.Tabbar
          swipeable={true}
          position='auto'
          index={this.state.index}
          renderTabs={this.renderTabs}
        />
      </Ons.Page>
    );
  }
}

export default function App() {
  ons.disableAutoStyling();

  return (
    <AppComponent />
  )
}