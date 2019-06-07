<script>
    import Header from '../components/Header';
</script>

<Header/>
<div class="container">  
    <p> Home </p>
    <button onclick="login()">Login</button>
    <button onclick="logout()">Logout</button>
    <pre id="user"></pre>
</div>

<svelte:head>
    <script src="/__/firebase/6.1.1/firebase-auth.js"></script>
    <script src="/__/firebase/6.1.1/firebase-firestore.js"></script>
    <script defer src="/auth.js"></script>
</svelte:head>