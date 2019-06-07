<script>
    import Header from '../Components/Header';
</script>

<Header/>
<div class="container">  
    <p> Home </p>
    <button onclick="login()">Login</button>
    <pre id="user"></pre>
</div>

<svelte:head>
    <script src="/__/firebase/6.1.1/firebase-auth.js"></script>
    <script defer src="auth.js"></script>
</svelte:head>