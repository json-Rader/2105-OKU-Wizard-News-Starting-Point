const postBank = require("../postBank");
const timeAgo = require('node-time-ago');

const postList = () => {
	    const posts = postBank.list();
        const mappingPost = posts.map(post => 
            html`<div class='news-item'>
                <p>
                    <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
                    <small>(by ${post.name})</small>
                </p>
                <small class="news-info">
                    ${post.upvotes} upvotes | ${timeAgo(post.date)}
                </small>
              </div>`
            ).join('')

        const postsListHtml = `<!DOCTYPE html>
            <html>
                <head>
                    <title>Wizard News</title>
                    <link rel="stylesheet" href="/style.css" />
                </head>
                <body>
                    <div>
                        <header><img src="/logo.png"/>Wizard News</header>
                        ${posts.map(post => `
                            <div class='news-item'>
                                <p>
                                    <span class="news-position">${post.id}</span><a href="/posts/${post.id}">${post.title}</a>
                                    <small>(by ${post.name})</small>
                                </p>
                                <small class="news-info">
                                    ${post.upvotes} upvotes | ${timeAgo(post.date)}
                                </small>
                            </div>
                        `).join('')}
                    </div>
                </body>
            </html>`;
        return postsListHtml;
}

module.exports = {postList}