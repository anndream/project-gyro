<script>
    import Header from '../components/Header';
    export let title, photoURL, author, url;
</script>

<Header/>
<div class="container post-page">  
    <h3>{title}</h3>
    <img src={photoURL} alt={title}>
    <p>Submitted by <a href="/user/{author}">{author}</a></p>
</div>

<svelte:head>
    <link rel="stylesheet" type="text/css" href="/post.css">
	<meta property="og:title" content="{title} - Project Gyro" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={photoURL} />
	<meta property="og:description" content="View {title} on Project Gyro" />
</svelte:head>