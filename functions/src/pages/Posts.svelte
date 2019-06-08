<script>
    import Header from '../components/Header';
    export let posts, page;
</script>

<Header/>
<div class="container">  
    <div class="posts">
        {#each posts as { title, photoURL, id, author}}
	        <div class="post">
                <h3><a href="/post/{id}">{title}</a></h3>
                <img src={photoURL} alt={title}>
                <h5>By <a href="/user/{author}">{author}</a></h5>
            </div>
        {:else}
	        <p>No posts on this page</p>
        {/each}
    </div>
    {#if page !== 1}
        <a href="/posts?page={page - 1}">Previous page</a>
    {/if}
    {#if posts.length === 10}
        <a href="/posts?page={page + 1}">Next Page</a>
    {/if}
</div>

<svelte:head>
    <link rel="stylesheet" type="text/css" href="/profile.css">
</svelte:head>