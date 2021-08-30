const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();
app.use(morgan('dev'));

app.get("/", (req, res) => {
	const posts = postBank.list();

	function timeSince(date) {
  		let seconds = Math.floor((new Date() - date) / 1000);
  		let interval = seconds / 31536000;
  		if (interval > 1) {
    		return Math.floor(interval) + " years ago";
  		}
  		interval = seconds / 2592000;
  		if (interval > 1) {
    		return Math.floor(interval) + " months ago";
  		}
  		interval = seconds / 86400;
  		if (interval >= 1) {
    		return Math.floor(interval) + " days ago";
  		}
  		interval = seconds / 3600;
  		if (interval > 1) {
    		return Math.floor(interval) + " hours ago";
  		}
  		interval = seconds / 60;
  		if (interval > 1) {
    		return Math.floor(interval) + " minutes ago";
  		}
  		return Math.floor(seconds) + " seconds ago";
	}
	let aDay = 24 * 60 * 60 * 1000;

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
						  		${post.upvotes} upvotes | ${timeSince(new Date(post.date)-aDay)}
					  		</small>
				  		</div>
			  		`).join('')}
		  		</div>
	  		</body>
  		</html>`;

	res.send(postsListHtml);
});

app.get("/posts/:id", (req, res) => {
	const id = req.params.id;
	const post = postBank.find(id);

	function timeSince(date) {
		let seconds = Math.floor((new Date() - date) / 1000);
		let interval = seconds / 31536000;
		if (interval > 1) {
		  return Math.floor(interval) + " years ago";
		}
		interval = seconds / 2592000;
		if (interval > 1) {
		  return Math.floor(interval) + " months ago";
		}
		interval = seconds / 86400;
		if (interval >= 1) {
		  return Math.floor(interval) + " day(s) ago";
		}
		interval = seconds / 3600;
		if (interval > 1) {
		  return Math.floor(interval) + " hours ago";
		}
		interval = seconds / 60;
		if (interval > 1) {
		  return Math.floor(interval) + " minutes ago";
		}
		return Math.floor(seconds) + " seconds ago";
  }
  let aDay = 24*60*60*1000;

	if (!post.id) {
		throw new Error('Dumbledore has extracted this into his personal Pensieve. You do not have access to it.')
	} else {
		const postIdHtml = `<!DOCTYPE html>
  			<html>
	  			<head>
					<title>Wizard News</title>
		  			<link rel="stylesheet" href="/style.css" />
	  			</head>
	  			<body>
					<div>
						<header><img src="/logo.png"/>Wizard News</header>
							<div class='news-item'>
								<p>
									<span class="news-position">${post.id}</span>${post.title}
									<small>(by ${post.name})</small>
					  			</p>
					  			<small class="news-info">
						  			${post.upvotes} upvotes | ${timeSince(new Date(post.date)-aDay)}
					  			</small>
				  			</div>
		  			</div>
	  			</body>
  			</html>`;

		res.send(postIdHtml);
	}
});


const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(404).send(`
		Dumbledore has extracted this into his personal Pensieve. You do not have access to it.
	
		<div style="width:100%;height:0;padding-bottom:57%;position:relative;"><iframe src="https://giphy.com/embed/1BdrmMkllI1e2gdPaS" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/dumbledore-pensieve-denkarium-1BdrmMkllI1e2gdPaS"></a></p>
	`)
  })

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});