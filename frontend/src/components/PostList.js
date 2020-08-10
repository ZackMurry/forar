import React from 'react'
import Post from './Post'

export default class PostList extends React.Component {


    constructor() {
        super()
        this.state = {
            list: []
        }
        this.updateList = this.updateList.bind(this)
    }

    async componentDidMount() {
        const response = await (await fetch('/api/v1/posts/new')).text()
        console.log(response)
        this.updateList(JSON.parse(response))
    }

    updateList = (newList) => {
        this.setState({list: newList})
    }


    render() {
        return (
            <>
                {this.state.list.map(post => (
                    <Post post={post} key={post.id}/>
                ))}
            </>
        )
    }


}