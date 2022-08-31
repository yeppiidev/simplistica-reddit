import * as React from 'react'
import ons from 'onsenui/esm';
import * as Ons from 'react-onsenui';

import { openURL, roundNumberToString } from '../Helpers/Utils'
import { useState } from 'react';

const supported_sites_regex = /(v.redd.it|i.redd.it|imgur.com|giphy.com)/ig;

export default function PostCard(props) {
    const open_external = (url) => {
        ons.notification.confirm("This link leads to an external site. Continue?")
            .then((response) => {
                if (response) openURL(url);
            });
    }

    const check_media = (src) => {
        return new RegExp(supported_sites_regex).test(src) ? true : false
    };

    const VideoLink = (props) => {
        let src = props.src;
        if (src.includes("v.redd.it")) {
            return (
                    <Ons.Button onClick={() => open_external(src)} className="margin-right open-external">
                        <Ons.Icon icon="ion-ios-open" className="icon"></Ons.Icon>
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
                    <img onClick={() => open_external(props.src)} src={props.thumbnail} alt="Video Thumbnail" style={{ width: '100%' }} />
                </div>
            )
        } else if (new RegExp(/(i.redd.it|imgur.com|giphy.com)/ig).test(props.src)) {
            return (
                <img src={props.src} alt={props.title} style={{ width: '100%' }} />
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
        <Ons.Card>
            <h1 className="title right lh-09">{props.title}</h1>
            <div className="post-subheading">
                <small className="post-subheading">on <a href={"https://reddit.com/r/" + props.subreddit}>r/{props.subreddit}</a>&nbsp;&bull;&nbsp;by <a href={"https://reddit.com/u/" + props.user}>u/{props.user}</a></small>
            </div>
            <PostMedia src={props.img_src} thumbnail={props.thumbnail} />
            <div className="content">
                <Ons.Button className="margin-right upvote-btn">
                    <Ons.Icon icon="ion-ios-thumbs-up" className="icon"></Ons.Icon>
                    <small className="btn-label">{roundNumberToString(parseInt(props.ups), 2)}</small>
                </Ons.Button>
                <Ons.Button className="margin-right">
                    <Ons.Icon icon="ion-ios-share" className="icon"></Ons.Icon>
                    <small className="btn-label">Share</small>
                </Ons.Button>
                <VideoLink src={props.img_src} />
            </div>
        </Ons.Card>
    )
};