import * as React from 'react'
import ons from 'onsenui';
import * as Ons from 'react-onsenui';

import PostCard from "../Components/PostCard"

export default function TrendingPage(props) {
    const [state, setState] = React.useState({ index: 0, state: "" });
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [refreshToast, setRefreshToast] = React.useState(false);

    React.useEffect(() => {
        fetch("https://api.reddit.com/r/all/hot.json?limit=10")
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
    }, [state, isLoaded]);

    function handleChange(e) {
        setState(({ state: e.state }));
    }

    function handleLoad(done) {
        setTimeout(() => {
            setRefreshToast(true);
            setTimeout(() => setRefreshToast(false), 2500);
            done();
        }, 500);
    }

    function getContent() {
        switch (state.state) {
            case 'initial':
                return (
                    <div>
                        <span> 
                            Pull to refresh... &nbsp;
                            <Ons.Icon icon="ion-ios-arrow-down" className="icon"></Ons.Icon>
                        </span>
                    </div>
                );
            case 'preaction':
                return (
                    <div>
                        <span>
                            Release to refresh... &nbsp;
                            <Ons.Icon icon="ion-ios-arrow-up" className="icon"></Ons.Icon>
                        </span>
                    </div>
                );
            case 'action':
                return (
                    <div>
                        <Ons.ProgressCircular style={{marginTop: '0.5em'}} indeterminate />
                    </div>
                );
        }
    }

    function hideRefreshToast() {
        setRefreshToast(false);
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <Ons.Page>
                <div className="center">
                    <Ons.ProgressCircular indeterminate />
                </div>
            </Ons.Page>
        );
    } else {
        return (
            <Ons.Page>
                <Ons.PullHook
                    onChange={handleChange}
                    onLoad={handleLoad}
                >
                    {getContent()}
                </Ons.PullHook>

                <section className="container">
                    <h1 className="heading">
                        <b className="lh-1">Trending now on <small className="header-subreddit-label">r/all</small></b>
                    </h1>
                </section>

                <section className="post-container">
                    {
                        items.map(post =>
                            <PostCard
                                key={post.data.name}
                                title={post.data.title}
                                img_src={post.data.url}
                                ups={post.data.ups}
                                thumbnail={post.data.thumbnail}
                                subreddit={post.data.subreddit}
                            />
                        )
                    }
                </section>
                
                <Ons.Toast isOpen={refreshToast}>
                    <div className="message">
                        Refreshing posts...
                    </div>
                </Ons.Toast>
            </Ons.Page>
        );
    }
}