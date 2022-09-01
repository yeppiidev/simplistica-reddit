import * as React from 'react'
import ons from 'onsenui/esm';
import * as Ons from 'react-onsenui';

import { openURL, roundNumberToString } from '../Helpers/Utils'
import { useState } from 'react';
import classNames from 'classnames';
import useLongPress from '../Helpers/LongPress';

const supported_sites_regex = /(v.redd.it|i.redd.it|imgur.com|giphy.com)/ig;

export default function PostCard(props) {
    const [postBackdrop, setPostBackdrop] = React.useState("");

    const open_external = (url) => {
        ons.notification.confirm("This link leads to an external site. Continue?")
            .then((response) => {
                if (response) openURL(url);
            });
    }

    const check_media = (src) => {
        return new RegExp(supported_sites_regex).test(src) ? true : false
    };

    const ButtonOpenVideo = (props) => {
        let src = props.src;
        if (src.includes("v.redd.it")) {
            return (
                <Ons.Button onClick={() => open_external(src)} className="margin-right open-external">
                    <Ons.Icon icon="ion-ios-open" className="realign-icon"></Ons.Icon>
                    &nbsp;
                    <small>Open Video</small>
                </Ons.Button>
            )
        }
    };

    const PostMedia = (props) => {
        if (props.src.includes("v.redd.it")) {
            return (
                <div className="overlay-container">
                    <img onClick={() => open_external(props.src)} src={props.thumbnail} alt="Video Thumbnail" style={{ width: '100%' }} className="img-round zoom-in" />
                </div>
            )
        } else if (new RegExp(/(i.redd.it|imgur.com|giphy.com)/ig).test(props.src)) {
            const longPress = useLongPress(() => {
                ons.notification.alert("Long press");
            }, 1500);

            return (
                <div
                    {...longPress}
                >
                    <img src={props.src}
                        onContextMenu={(e) => e.preventDefault()}
                        width="100%"
                        className="zoom-in zindex-top"

                        // WTF fix this
                        onTouchStart={(e) => {
                            e.preventDefault();
                            setPostBackdrop("bg-obstruct")
                        }}
                        onTouchEnd={() => setPostBackdrop("")}
                        onMouseUp={() => setPostBackdrop("")}
                        onMouseLeave={() => setPostBackdrop("")}
                        onMouseUpCapture={() => setPostBackdrop("")}
                        onTouchCancel={() => setPostBackdrop("")}
                        onBlur={() => setPostBackdrop("")}
                        onDragEnd={() => setPostBackdrop("")}
                        onDragExit={() => setPostBackdrop("")}
                        onDragOver={() => setPostBackdrop("")}
                        onPointerUp={() => setPostBackdrop("")}
                    />
                </div>

            )
        } else {
            return (
                <div className="unknown-post-type-link">
                    <a href={props.src}>{props.src}</a>
                </div>
            )
        }
    }

    if (!check_media(props.img_src)) {
        return;
    }

    return (
        <div className={`post ${postBackdrop}`}>
            <h1 className="title right lh-1_5">{props.title}</h1>
            <div className="post-subheading">
                <small className="post-subheading">on <a href={"https://reddit.com/r/" + props.subreddit}>r/{props.subreddit}</a>&nbsp;&bull;&nbsp;by <a href={"https://reddit.com/u/" + props.user}>u/{props.user}</a></small>
            </div>
            <PostMedia src={props.img_src} thumbnail={props.thumbnail} />
            <div className="content">
                <Ons.Button className="zindex-back margin-right upvote-btn">
                    <Ons.Icon icon="ion-ios-thumbs-up" className="realign-icon"></Ons.Icon>
                    <small className="btn-label">{roundNumberToString(parseInt(props.ups), 2)}</small>
                </Ons.Button>
                <Ons.Button className="zindex-back margin-right">
                    <Ons.Icon icon="ion-ios-share" className="realign-icon"></Ons.Icon>
                    <small className="btn-label">Share</small>
                </Ons.Button>
                <ButtonOpenVideo src={props.img_src} />
            </div>
        </div>
    )
};