<script>
    import Header from '../components/Header';
    export let title, photoURL, author, url, id;
</script>

<Header/>
<div class="container post-page">  
    <h3>{title}</h3>
    <img src={photoURL} alt={title}>
    <p>Submitted by <a href="/user/{author}">{author}</a></p>
    <button onclick="deletePost('{id}')">Delete Post</button>
</div>

<svelte:head>
    <link rel="stylesheet" type="text/css" href="/post.css">
    <script src="/__/firebase/6.1.1/firebase-functions.js"></script>
    <script src="/post.js"></script>
	<meta property="og:title" content="{title} - Project Gyro" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={photoURL} />
	<meta property="og:description" content="View {title} on Project Gyro" />
</svelte:head>