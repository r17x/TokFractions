const {
    REACT_APP_NAME: app,
    REACT_APP_AUTHOR: author,
} = process.env


export const constants = {
    app,
    author,
    footerText: `Copyright | ${author}`
}

export default constants 
