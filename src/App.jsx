import * as React from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ons from 'onsenui';
import * as Ons from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

let posts = [];

const PostCard = (props) => {
  return (
    <Ons.Card>
      <img src={props.img_src} style={{ width: '100%' }} />
      <div className="title right">{props.title}</div>
      <div className="content">
        <Ons.Button><Ons.Icon icon="ion-ios-thumbs-up"></Ons.Icon>{props.ups}</Ons.Button>
        <Ons.Button><Ons.Icon icon="ion-ios-share"></Ons.Icon></Ons.Button>
      </div>
    </Ons.Card>
  )
};

const HomePage = (props) => {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.reddit.com/r/all/top.json?limit=5")
      .then(res => res.json())
      .then(
        (json) => {
          setIsLoaded(true);
          setItems(json.data.children);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <Ons.Page>
        <Ons.ProgressCircular indeterminate="true" />
      </Ons.Page>
    );
  } else {
    return (
      <Ons.Page>
        <section className="container">
          <h1 className="heading">
            <b>Top posts</b>
          </h1>
          {
            items.map(post =>
              <PostCard
                key={post.data.name}
                title={post.data.title}
                img_src={post.data.url}
                ups={post.data.ups}
              />
            )
          }
        </section>
      </Ons.Page>
    );
  }
};

const SearchPage = (props) => {
  return (
    <Ons.Page id="search_page">
      <section style={{ textAlign: 'center' }}>
        <p>
          <Ons.SearchInput style={{ width: "90%", marginLeft: "1em", marginRight: "1em" }} placeholder='Search reddit...' />
        </p>
      </section>
    </Ons.Page>
  )
};


class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
    this.renderToolbar = this.renderToolbar.bind(this);
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
        content: <HomePage />,
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