/**
 * Created by Administrator on 2017/5/10.
 */
import React from 'react';

import Silder from './Sider/Sider';
export default class App extends React.Component{
    render(){
        return (
            <div className="main">
                <div className="App-left">
                    <Silder/>
                </div>
                <div className="App-right">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
