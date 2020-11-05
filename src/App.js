import React from 'react';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import locales from './locales'
import pages from './pages';


export default function App(props) {

    // 如果 getLocale('page.layout')   返回 layout 的值， 如果是 getLocale('page')  返回 page 的值 即 一个对象
    const getLocale = key => {
        return key.split('.').reduce((a, b) => {
            const parent = locales[a];
            if (b) {
                return (parent || {})[b];
            }
            return parent;
        });
    }

    return <div className="app">
        <header className="header">
            <div className="container">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to='/guide'>{getLocale('misc.guide')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/' className="active">{getLocale('misc.component')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/resource'>{getLocale('misc.resource')}</Link>
                    </li>
                </ul>
            </div>
        </header>
        <div className="main container">
            <nav className="side-nav">
                <ul>
                    <li className="nav-item">
                        <a>{getLocale('misc.development')}</a>
                        <ul className="pure-menu-list sub-nav">
                            {
                                Object.keys(pages.documents).map(page => {
                                    return (
                                        <li className="nav-item" key={page}>
                                            <Link to={`#/${page}`}>{getLocale(`page.${page}`)}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a>{getLocale('misc.components')}</a>
                        {
                            Object.keys(pages.components).map(group => {
                                return (
                                    <div className="nav-group" key={group}>
                                        <div className="nav-group__title">{group}</div>
                                        <ul className="pure-menu-list">
                                            {
                                                Object.keys(pages.components[group]).map(page => {
                                                    return (
                                                        <li key={page} className="nav-item">
                                                            <Link to={`#/${page}`}>{getLocale(`page.${page}`)}</Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </li>
                </ul>
            </nav>
            <div className="content">

                <Switch>
                    { this.getComponent(this.state.page) }
                </Switch>

                {/*<ScrollToTop showUnder={210}>*/}
                {/*    <div className="page-component-up">*/}
                {/*        <i className="el-icon-caret-top"></i>*/}
                {/*    </div>*/}
                {/*</ScrollToTop>*/}
            </div>
        </div>
        <footer className="footer">
            <div className="container">
                <div className="footer-main"></div>
                <div className="footer-social"> </div>
            </div>
        </footer>
    </div>

}