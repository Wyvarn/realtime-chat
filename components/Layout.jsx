/**
 * Base Layout for all pages in the application
 */

import React, { Fragment } from 'react';
import { node, element, oneOfType, array, string} from "prop-types";
import Head from "next/head";

/**
 * This is a Layout component that will wrap the whole application. This will be used to define a default and common Layout
 * used in the enter application. Each page will have this layout 
 * @param {String} pageTitle Page title that will be used in the Head
 * @param {Object} children Children props passed to Layout
 */
const Layout = ({children, pageTitle}) => {
    return (
        <Fragment>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
                <title>{pageTitle || "RealTime Chat"}</title>
            </Head>
            {children}
        </Fragment>
    )
}

Layout.propTypes = {
    pageTitle: string,
    children: oneOfType([ element, node, array])
}

export default Layout;
