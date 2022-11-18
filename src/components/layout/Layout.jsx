import React from 'react';
import {Header} from '../header/Header';
import {Main} from '../main/Main';
import {Footer} from '../footer/Footer';

export function Layout() {
    return (
        <div className="layout">
            <Main />
            <Footer />
        </div>
    );
}
