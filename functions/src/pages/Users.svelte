<script>
    import Header from '../components/Header';
    export let users, page;
</script>

<Header/>
<div class="container users-page"> 
    <div class="users">
        {#each users as { username, photoURL}}
	        <div class="user">
                <img src={photoURL} alt="{username} Profile Picture">
                <h3><a href="/user/{username}">{username}</a></h3>
            </div>
        {:else}
	        <p>No users on this page</p>
            <a href="/users?page={page - 1}">Previous page</a>
        {/each}
    </div>
    {#if page !== 1 && users.length !== 0}
        <a href="/users?page={page - 1}">Previous page</a>
    {/if}
    <a href="/users?page={page + 1}">Next Page</a>
</div>

<svelte:head>
    <link rel="stylesheet" type="text/css" href="/users.css">
</svelte:head>