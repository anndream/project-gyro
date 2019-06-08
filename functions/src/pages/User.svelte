<script>
    import Header from '../components/Header';
    export let username, photoURL, posts, url;
</script>

<Header/>
<div class="container profile-page">  
    <div class="profile">
        <img src={photoURL} alt="{username}'s profile picture">
        <h3>{username}</h3>
        <button class="sign-in">loading</button>
    </div>
    <div class="posts">
        {#each posts as { title, photoURL, id}}
	        <div class="post">
                <h3><a href="/post/{id}">{title}</a></h3>
                <img src={photoURL} alt={title}>
            </div>
        {:else}
	        <p>{username} has no posts</p>
        {/each}
    </div>
</div>

<svelte:head>
    <link rel="stylesheet" type="text/css" href="/profile.css">
	<meta property="og:title" content="{username} - Project Gyro" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={photoURL} />
	<meta property="og:description" content="View {username}'s account on Project Gyro" />
</svelte:head>