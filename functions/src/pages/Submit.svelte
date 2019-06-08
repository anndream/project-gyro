<script>
    import Header from '../components/Header';
</script>

<Header/>
<div class="container submit-page">  
    <h3>Add image:</h3>
    <input type="text" placeholder="Image name" id="post-name"/>
    <input type="file" id="post-image-file" value="upload" accept="image/jpeg"/>
    <img alt="image preview" id="image-preview">
    <button onclick="submit()">Upload</button>
</div>

<svelte:head>
    <link rel="stylesheet" type="text/css" href="/submit.css">
    <script src="/__/firebase/6.1.1/firebase-functions.js"></script>
    <script defer src="/submit.js"></script>
	<meta property="og:title" content="Project Gyro - Submit" />
	<meta property="og:type" content="website" />
</svelte:head>