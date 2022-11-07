//we use react-helment library to change title of each page or related componenet

import React from 'react'
import Helmet from 'react-helmet';
const metadata = (props) => {
    return (
        <Helmet>
            <title>{props.title}</title>
        </Helmet>
    )
}

export default metadata