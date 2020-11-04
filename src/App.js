import React from 'react';
import locales from './locales'
import pages from './pages';

export default class App extends React.Component {

    state = {}

    // 如果 getLocale('page.layout')   返回 layout 的值， 如果是 getLocale('page')  返回 page 的值 即 一个对象
    getLocale = key => {
        return key.split('.').reduce((a, b) => {
            const parent = locales[a];
            if (b) {
                return (parent || {})[b];
            }
            return parent;
        });
    }

    render() {
        return <div className="app">
            <header className="header">
                <div className="container">
                    {/*<h1>logo</h1>*/}
                    <ul className="nav">
                        <li className="nav-item">
                            <a target="_blank">{this.getLocale('misc.guide')}</a>
                        </li>
                        <li className="nav-item">
                            <a className="active" target="_blank">{this.getLocale('misc.component')}</a>
                        </li>
                        <li className="nav-item">
                            <a target="_blank">{this.getLocale('misc.resource')}</a>
                        </li>
                    </ul>
                </div>
            </header>
            <div className="main container">
                <nav className="side-nav">
                    <ul>
                        <li className="nav-item">
                            <a>{this.getLocale('misc.development')}</a>
                            <ul className="pure-menu-list sub-nav">
                                {
                                    Object.keys(pages.documents).map(page => {
                                        return (
                                            <li className="nav-item" key={page}>
                                                <a href={`#/${page}`} className={page === this.state.page ? 'active' : ''}>{this.getLocale(`page.${page}`)}</a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a>{this.getLocale('misc.components')}</a>
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
                                                                <a href={`#/${page}`} className={page === this.state.page ? 'active' : ''}>{this.getLocale(`page.${page}`)}</a>
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
                    {/*{ this.getComponent(this.state.page) }*/}
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
}