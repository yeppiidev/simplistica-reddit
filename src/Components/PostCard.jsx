import * as Ons from 'react-onsenui'

export default function PostCard (props) {
    return (
        <Ons.Card>
            <img src={props.img_src} alt={props.title} style={{ width: '100%' }} />
            <div className="title right">{props.title}</div>
            <div className="content">
                <Ons.Button modifier="flat">
                    <Ons.Icon icon="ion-ios-thumbs-up"></Ons.Icon>
                    <small>{props.ups}</small>
                </Ons.Button>
                <Ons.Button>
                    <Ons.Icon icon="ion-ios-share"></Ons.Icon>
                </Ons.Button>
            </div>
        </Ons.Card>
    )
};