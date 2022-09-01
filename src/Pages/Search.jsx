import * as React from 'react'
import ons from 'onsenui/esm';
import * as Ons from 'react-onsenui';

import PostCard from "../Components/PostCard"

export default function SearchPage(props) {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [didSearchQuery, setDidSearchQuery] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");
    const [searchURL, setSearchURL] = React.useState("");
    const firstUpdate = React.useRef(true);

    React.useEffect(() => {
        if (searchURL == "") return;

        setIsLoaded(false);
        setDidSearchQuery(true);

        fetch(searchURL)
            .then(res => res.json())
            .then(
                (json) => {
                    setIsLoaded(true);
                    setDidSearchQuery(false);

                    setItems(json.data.children);
                },
                (error) => {
                    setIsLoaded(true);
                    setDidSearchQuery(false);

                    setError(error);
                }
            );
    }, [searchValue]);

    const search_get_posts = (event) => {
        let query = event.srcElement.value;
        let first_arg = query.split(" ")[0].replace("r/", "");

        setSearchValue(query);

        if (query.startsWith("r/")) {
            setSearchURL(`https://api.reddit.com/r/${first_arg}/top.json?limit=10`);
        } else {
            setSearchURL(`https://api.reddit.com/r/all/search.json?q=${encodeURI(query)}&limit=10`);
        }
    };

    const changeValue = (val) => {
        setSearchValue(val);
    }

    const LoadingWidget = (props) => {
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded && didSearchQuery) {
            return (
                <Ons.Page>
                    <div className="container container-center center">
                        <Ons.ProgressCircular indeterminate />
                    </div>
                </Ons.Page>
            );
        }
    };

    const render_posts = () => {
        if (items.length > 1 && isLoaded && !didSearchQuery) {            
            return (
                <div>
                    <Ons.ListHeader>Results</Ons.ListHeader>
                    {
                        items.map(post =>
                            <PostCard
                                key={post.data.name}
                                title={post.data.title}
                                img_src={post.data.url}
                                ups={post.data.ups}
                                thumbnail={post.data.thumbnail}
                                subreddit={post.data.subreddit}
                                user={post.data.author}
                            />
                        )
                    }
                </div>
            )
        } else {
            return (
                <div className="container-vertical-center">
                    <div className="container-center-nm">
                        <Ons.Icon className="icon-question" icon="ion-ios-help" />
                        <br />
                    </div>
                    <div className="container-center-nm">
                        Nothing found :(
                    </div>
                </div>
            )
        }
    };

    return (
        <Ons.Page id="search_page">
            <section style={{ textAlign: 'center' }}>
                <p>
                    <Ons.SearchInput style={{ width: "90%", marginLeft: "1em", marginRight: "1em" }} placeholder='Search reddit...' onChange={search_get_posts} />
                </p>
            </section>

            <LoadingWidget />

            {render_posts()}
        </Ons.Page>
    )
};
