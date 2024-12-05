const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3004;
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();

app.use(bodyParser.json());  // To parse application/json content
// Middleware to parse URL-encoded request body (common for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));  // To parse application/x-www-form-urlencoded content
app.use(express.static(path.join(__dirname, 'public')));

// Mongoose Connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
    }
}
connectDB();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/privacy-policy', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/privacy-policy.html'))
})

app.get('/terms-and-conditions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/terms-and-condition.html'))
})

app.get('/sitmap.xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'))
})

app.get('/contact-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/contact.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/about.html'))
})


// API routes
app.get('/blog', (req, res) => {


    const html = `<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="google-adsense-account" content="ca-pub-5723306635822257">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Snaap.io | Just Snap It</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==" crossorigin="anonymous" referrerpolicy="no-referrer"
    />
    <meta name="description" content="Shorten, share, and track your URLs effortlessly with Snaap.io. Simplify your links and gain insights with real-time analytics and detailed tracking reports. Perfect for businesses and individuals alike!">
    <meta name="keywords" content="URL shortener, link shortener, Snaap.io, shorten links, custom URLs, URL tracking, link analytics, URL management, real-time analytics, link sharing, custom link branding">
    <link rel="icon" type="image/png" href="./logo.avif">
    <style>
        body {
            font-family: Poppins, sans-serif;
            background-color: #fff!important
        }

        .navbar {
            height: 70px;
            background-color: #000;
            box-shadow: rgba(0, 0, 0, .12) 0 1px 3px, rgba(0, 0, 0, .24) 0 1px 2px;
            border-bottom: 1px solid #fff
        }

        .navbar-brand,
        .navbar-nav .nav-link,
        .navbar-nav .nav-link.active {
            color: #fff
        }

        .navbar-nav .nav-link:hover {
            color: #d1d1d1
        }

        .input-section {
            margin-top: 1rem;
            text-align: center
        }

        .input-section input {
            height: 50px;
            width: 100%;
            background-color: #fff;
            border: 1px solid #ddd;
            color: #000;
            padding: 0 1rem;
            font-size: 1rem;
            margin-bottom: 10px
        }

        .input-section button {
            padding: 10px 20px;
            background-color: #000;
            color: #fff;
            border: 1px solid #ddd;
            cursor: pointer;
            transition: background-color .3s
        }

        .input-section button:hover {
            background-color: #444
        }

        .result-section p {
            font-size: 1rem;
            display: none
        }

        .result-section .hidden {
            display: none
        }

        .navbar-brand {
            line-height: 1.5;
            font-weight: 800
        }

        .main {
            height: 400px;
            margin-top: 200px
        }

        #longUrl {
            width: 100%;
            height: 60px;
            padding: .8rem;
            font-size: 1.2rem;
            border-radius: 9px
        }

        .input-section input:focus {
            border: 2px solid #444;
            outline: 0;
            transition: border .3s
        }

        #generateBtn:hover {
            transform: scale(1.05);
            transition: transform .3s
        }

        .result-section p.hidden {
            opacity: 0;
            transition: opacity .5s
        }

        .result-section p:not(.hidden) {
            opacity: 1
        }

        #copyBtn:focus {
            outline: #444 solid 2px
        }

        .result-section span {
            font-weight: 700;
            text-decoration: underline;
            cursor: pointer
        }

        @media (max-width:768px) {
            .input-section {
                margin-top: 2rem;
                width: 100%!important
            }
            .input-section input {
                max-width: 100%
            }
            .footer .footer-social-link {
                margin-bottom: .8rem;
                text-decoration: none!important
            }
            .input-section button {
                width: 100%;
                margin-top: 10px
            }
        }

        .social-link a i {
            font-size: 2rem
        }

        .social-link a i:hover {
            font-size: 2.1rem
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5 fixed-top" style="background-color: rgba(0, 0, 0, 0.05);">
        <div class="container-fluid bg-light">
            <a class="navbar-brand" href="/">Snaap.io</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Analytics</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">QR Code Generator</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div style="margin-top: 100px">
        <main class="container">
            <div class="p-2 p-md-5 mb-4 rounded text-emphasis bg-secondary" style="background-image: linear-gradient(178.7deg, rgb(126, 184, 253) 5.6%, rgb(198 223 255) 95.3%);">
                <div class="col-lg-6 px-0">
                    <h1 class="display-6 fst-italic">Title of a longer featured blog post</h1>
                    <p class="lead my-1">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
                    <p class="lead mb-0"><a href="#" class="text-body-emphasis fw-bold">Continue reading...</a></p>
                </div>
            </div>

            <div class="row mb-2">
                <div class="col-md-6">
                    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div class="col p-4 d-flex flex-column position-static">
                            <strong class="d-inline-block mb-2 text-primary-emphasis">World</strong>
                            <h3 class="mb-0">Featured post</h3>
                            <div class="mb-1 text-body-secondary">Nov 12</div>
                            <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
            Continue reading
            <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
          </a>
                        </div>
                        <div class="col-auto d-none d-lg-block">
                            <svg class="bd-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div class="col p-4 d-flex flex-column position-static">
                            <strong class="d-inline-block mb-2 text-success-emphasis">Design</strong>
                            <h3 class="mb-0">Post title</h3>
                            <div class="mb-1 text-body-secondary">Nov 11</div>
                            <p class="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
            Continue reading
            <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
          </a>
                        </div>
                        <div class="col-auto d-none d-lg-block">
                            <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    </div>

    <!-- Footer -->
    <footer class="text-center text-lg-start bg-body-tertiary text-muted" style="box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;">
        <!-- Section: Social media -->
        <section class="d-flex justify-content-start justify-content-lg-between p-4 border-bottom">
            <div class="d-flex align-items-center justify-content-center w-100 social-link">
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-google"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-github"></i>
                </a>
            </div>
            <!-- Right -->
        </section>
        <section class="p-3" style="background-color: rgba(0, 0, 0, 0.05);">
            <div class="container text-start text-md-start mt-5">
                <!-- Grid row -->
                <div class="row mt-3">
                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <!-- Content -->
                        <h6 class="text-uppercase fw-bold mb-4">
                            <i class="fas fa-gem me-3"></i>Snaap.io
                        </h6>
                        <p>
                            Snaap.io offers a simple URL shortener, customizable QR code generator, and detailed analytics. Track link performance and engage users with ease.
                        </p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <!-- Links -->
                        <h6 class="text-uppercase fw-bold mb-4">
                            Products
                        </h6>
                        <p>
                            <a href="/" class="text-reset">Snaap.io</a>
                        </p>
                        <p>
                            <a href="#!" class="text-reset">Analytics</a>
                        </p>
                        <p>
                            <a href="#!" class="text-reset">QR Code Generator</a>
                        </p>
                        <p>
                            <a href="#!" class="text-reset">Image Uploader</a>
                        </p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-md-0 mb-4">
                        <!-- Links -->
                        <h6 class="text-uppercase fw-bold mb-4">
                            Useful links
                        </h6>
                        <p>
                            <a href="#!" class="text-reset">About Us</a>
                        </p>
                        <p>
                            <a href="/contact-us" class="text-reset">Contact Us</a>
                        </p>
                        <p>
                            <a href="/terms-and-conditions" class="text-reset">Terms and Conditions</a>
                        </p>
                        <p>
                            <a href="/privacy-policy" class="text-reset">Privacy Policy</a>
                        </p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <!-- Links -->
                        <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                        <p><i class="fas fa-home me-3"></i> Noida Sector 62, Uttar Pradesh</p>
                        <p>
                            <i class="fas fa-envelope me-3"></i> info@snaap.io
                        </p>
                        <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
                        <p><i class="fas fa-print me-3"></i> + 01 234 567 89</p>
                    </div>
                    <!-- Grid column -->
                </div>
                <!-- Grid row -->
            </div>
        </section>
        <!-- Section: Links  -->

        <!-- Copyright -->
        <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
            © 2021 Copyright:
            <a class="text-reset fw-bold" href="https://snaap.io/">Snaap.io</a>
        </div>
        <!-- Copyright -->
    </footer>

    <!-- Optional JavaScript; choose one of the two! -->
    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

    <!-- Bootstrap Icons -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.js"></script>
    <script>
        document.getElementById("year").textContent = new Date().getFullYear();
    </script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5723306635822257" crossorigin="anonymous"></script>

</body>

</html>`

    res.send(html)

});

app.get('/blog/:url', (req, res) => {
    const html = `<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="google-adsense-account" content="ca-pub-5723306635822257">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Snaap.io | Just Snap It</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==" crossorigin="anonymous" referrerpolicy="no-referrer"
    />
    <meta name="description" content="Shorten, share, and track your URLs effortlessly with Snaap.io. Simplify your links and gain insights with real-time analytics and detailed tracking reports. Perfect for businesses and individuals alike!">
    <meta name="keywords" content="URL shortener, link shortener, Snaap.io, shorten links, custom URLs, URL tracking, link analytics, URL management, real-time analytics, link sharing, custom link branding">
    <link rel="icon" type="image/png" href="./logo.avif">
    <style>
    body{font-family:Poppins,sans-serif;background-color:#fff!important}.navbar{height:70px;background-color:#000;box-shadow:rgba(0,0,0,.12) 0 1px 3px,rgba(0,0,0,.24) 0 1px 2px;border-bottom:1px solid #fff}.navbar-brand,.navbar-nav .nav-link,.navbar-nav .nav-link.active{color:#fff}.navbar-nav .nav-link:hover{color:#d1d1d1}.input-section{margin-top:1rem;text-align:center}.input-section input{height:50px;width:100%;background-color:#fff;border:1px solid #ddd;color:#000;padding:0 1rem;font-size:1rem;margin-bottom:10px}.input-section button{padding:10px 20px;background-color:#000;color:#fff;border:1px solid #ddd;cursor:pointer;transition:background-color .3s}.input-section button:hover{background-color:#444}.result-section p{font-size:1rem;display:none}.result-section .hidden{display:none}.navbar-brand{line-height:1.5;font-weight:800}.main{height:400px;margin-top:200px}#longUrl{width:100%;height:60px;padding:.8rem;font-size:1.2rem;border-radius:9px}.input-section input:focus{border:2px solid #444;outline:0;transition:border .3s}#generateBtn:hover{transform:scale(1.05);transition:transform .3s}.result-section p.hidden{opacity:0;transition:opacity .5s}.result-section p:not(.hidden){opacity:1}#copyBtn:focus{outline:#444 solid 2px}.result-section span{font-weight:700;text-decoration:underline;cursor:pointer}@media (max-width:768px){.input-section{margin-top:2rem;width:100%!important}.input-section input{max-width:100%}.footer .footer-social-link{margin-bottom:.8rem;text-decoration:none!important}.input-section button{width:100%;margin-top:10px}}.social-link a i{font-size:2rem}.social-link a i:hover{font-size:2.1rem}
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5 fixed-top" style="background-color: rgba(0, 0, 0, 0.05);">
        <div class="container-fluid bg-light">
            <a class="navbar-brand" href="/">Snaap.io</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Analytics</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">QR Code Generator</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div style="margin-top: 100px">
        <main class="container">
            <div class="row g-5">
                <div class="col-md-8">
                    <h3 class="pb-4 mb-4 fst-italic border-bottom">
                        From the Firehose
                    </h3>

                    <article class="blog-post">
                        <h2 class="display-5 link-body-emphasis mb-1">Sample blog post</h2>
                        <p class="blog-post-meta">January 1, 2021 by <a href="#">Mark</a></p>

                        <p>This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic typography, lists, tables, images, code, and more are all supported as expected.</p>
                        <hr>
                        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing,
                            so be on the lookout for this exact same string of text.</p>
                        <h2>Blockquotes</h2>
                        <p>This is an example blockquote in action:</p>
                        <blockquote class="blockquote">
                            <p>Quoted text goes here.</p>
                        </blockquote>
                        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing,
                            so be on the lookout for this exact same string of text.</p>
                        <h3>Example lists</h3>
                        <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout. This is an example unordered list:</p>
                        <ul>
                            <li>First list item</li>
                            <li>Second list item with a longer description</li>
                            <li>Third list item to close it out</li>
                        </ul>
                        <p>And this is an ordered list:</p>
                        <ol>
                            <li>First list item</li>
                            <li>Second list item with a longer description</li>
                            <li>Third list item to close it out</li>
                        </ol>
                        <p>And this is a definition list:</p>
                        <dl>
                            <dt>HyperText Markup Language (HTML)</dt>
                            <dd>The language used to describe and define the content of a Web page</dd>
                            <dt>Cascading Style Sheets (CSS)</dt>
                            <dd>Used to describe the appearance of Web content</dd>
                            <dt>JavaScript (JS)</dt>
                            <dd>The programming language used to build advanced Web sites and applications</dd>
                        </dl>
                        <h2>Inline HTML elements</h2>
                        <p>HTML defines a long list of available inline tags, a complete list of which can be found on the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element">Mozilla Developer Network</a>.</p>
                        <ul>
                            <li><strong>To bold text</strong>, use <code class="language-plaintext highlighter-rouge">&lt;strong&gt;</code>.</li>
                            <li><em>To italicize text</em>, use <code class="language-plaintext highlighter-rouge">&lt;em&gt;</code>.</li>
                            <li>Abbreviations, like <abbr title="HyperText Markup Language">HTML</abbr> should use <code class="language-plaintext highlighter-rouge">&lt;abbr&gt;</code>, with an optional <code class="language-plaintext highlighter-rouge">title</code>                                attribute for the full phrase.</li>
                            <li>Citations, like <cite>— Mark Otto</cite>, should use <code class="language-plaintext highlighter-rouge">&lt;cite&gt;</code>.</li>
                            <li><del>Deleted</del> text should use <code class="language-plaintext highlighter-rouge">&lt;del&gt;</code> and <ins>inserted</ins> text should use <code class="language-plaintext highlighter-rouge">&lt;ins&gt;</code>.</li>
                            <li>Superscript <sup>text</sup> uses <code class="language-plaintext highlighter-rouge">&lt;sup&gt;</code> and subscript <sub>text</sub> uses <code class="language-plaintext highlighter-rouge">&lt;sub&gt;</code>.</li>
                        </ul>
                        <p>Most of these elements are styled by browsers with few modifications on our part.</p>
                        <h2>Heading</h2>
                        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing,
                            so be on the lookout for this exact same string of text.</p>
                        <h3>Sub-heading</h3>
                        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing,
                            so be on the lookout for this exact same string of text.</p>
                        <pre><code>Example code block</code></pre>
                        <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout.</p>
                    </article>

                    <article class="blog-post">
                        <h2 class="display-5 link-body-emphasis mb-1">Another blog post</h2>
                        <p class="blog-post-meta">December 23, 2020 by <a href="#">Jacob</a></p>

                        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing,
                            so be on the lookout for this exact same string of text.</p>
                        <blockquote>
                            <p>Longer quote goes here, maybe with some <strong>emphasized text</strong> in the middle of it.</p>
                        </blockquote>
                        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing,
                            so be on the lookout for this exact same string of text.</p>
                        <h3>Example table</h3>
                        <p>And don't forget about tables in these posts:</p>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Upvotes</th>
                                    <th>Downvotes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Alice</td>
                                    <td>10</td>
                                    <td>11</td>
                                </tr>
                                <tr>
                                    <td>Bob</td>
                                    <td>4</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>Charlie</td>
                                    <td>7</td>
                                    <td>9</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Totals</td>
                                    <td>21</td>
                                    <td>23</td>
                                </tr>
                            </tfoot>
                        </table>

                        <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout.</p>
                    </article>

                    <article class="blog-post">
                        <h2 class="display-5 link-body-emphasis mb-1">New feature</h2>
                        <p class="blog-post-meta">December 14, 2020 by <a href="#">Chris</a></p>

                        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing,
                            so be on the lookout for this exact same string of text.</p>
                        <ul>
                            <li>First list item</li>
                            <li>Second list item with a longer description</li>
                            <li>Third list item to close it out</li>
                        </ul>
                        <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout.</p>
                    </article>

                    <nav class="blog-pagination" aria-label="Pagination">
                        <a class="btn btn-outline-primary rounded-pill" href="#">Older</a>
                        <a class="btn btn-outline-secondary rounded-pill disabled" aria-disabled="true">Newer</a>
                    </nav>

                </div>

                <div class="col-md-4">
                    <div class="position-sticky" style="top: 2rem;">
                        <div class="p-4 mb-3 bg-body-tertiary rounded">
                            <h4 class="fst-italic">About</h4>
                            <p class="mb-0">Customize this section to tell your visitors a little bit about your publication, writers, content, or something else entirely. Totally up to you.</p>
                        </div>

                        <div>
                            <h4 class="fst-italic">Recent posts</h4>
                            <ul class="list-unstyled">
                                <li>
                                    <a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="#">
                <svg class="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
                <div class="col-lg-8">
                  <h6 class="mb-0">Example blog post title</h6>
                  <small class="text-body-secondary">January 15, 2024</small>
                </div>
              </a>
                                </li>
                                <li>
                                    <a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="#">
                <svg class="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
                <div class="col-lg-8">
                  <h6 class="mb-0">This is another blog post title</h6>
                  <small class="text-body-secondary">January 14, 2024</small>
                </div>
              </a>
                                </li>
                                <li>
                                    <a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="#">
                <svg class="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
                <div class="col-lg-8">
                  <h6 class="mb-0">Longer blog post title: This one has multiple lines!</h6>
                  <small class="text-body-secondary">January 13, 2024</small>
                </div>
              </a>
                                </li>
                            </ul>
                        </div>

                        <div class="p-4">
                            <h4 class="fst-italic">Archives</h4>
                            <ol class="list-unstyled mb-0">
                                <li><a href="#">March 2021</a></li>
                                <li><a href="#">February 2021</a></li>
                                <li><a href="#">January 2021</a></li>
                                <li><a href="#">December 2020</a></li>
                                <li><a href="#">November 2020</a></li>
                                <li><a href="#">October 2020</a></li>
                                <li><a href="#">September 2020</a></li>
                                <li><a href="#">August 2020</a></li>
                                <li><a href="#">July 2020</a></li>
                                <li><a href="#">June 2020</a></li>
                                <li><a href="#">May 2020</a></li>
                                <li><a href="#">April 2020</a></li>
                            </ol>
                        </div>

                        <div class="p-4">
                            <h4 class="fst-italic">Elsewhere</h4>
                            <ol class="list-unstyled">
                                <li><a href="#">GitHub</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">Facebook</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    </div>

    <!-- Footer -->
    <footer class="text-center text-lg-start bg-body-tertiary text-muted" style="box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;">
        <!-- Section: Social media -->
        <section class="d-flex justify-content-start justify-content-lg-between p-4 border-bottom">
            <div class="d-flex align-items-center justify-content-center w-100 social-link">
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-google"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-github"></i>
                </a>
            </div>
            <!-- Right -->
        </section>
        <section class="p-3" style="background-color: rgba(0, 0, 0, 0.05);">
            <div class="container text-start text-md-start mt-5">
                <!-- Grid row -->
                <div class="row mt-3">
                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <!-- Content -->
                        <h6 class="text-uppercase fw-bold mb-4">
                            <i class="fas fa-gem me-3"></i>Snaap.io
                        </h6>
                        <p>
                            Snaap.io offers a simple URL shortener, customizable QR code generator, and detailed analytics. Track link performance and engage users with ease.
                        </p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <!-- Links -->
                        <h6 class="text-uppercase fw-bold mb-4">
                            Products
                        </h6>
                        <p>
                            <a href="/" class="text-reset">Snaap.io</a>
                        </p>
                        <p>
                            <a href="#!" class="text-reset">Analytics</a>
                        </p>
                        <p>
                            <a href="#!" class="text-reset">QR Code Generator</a>
                        </p>
                        <p>
                            <a href="#!" class="text-reset">Image Uploader</a>
                        </p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-md-0 mb-4">
                        <!-- Links -->
                        <h6 class="text-uppercase fw-bold mb-4">
                            Useful links
                        </h6>
                        <p>
                            <a href="#!" class="text-reset">About Us</a>
                        </p>
                        <p>
                            <a href="/contact-us" class="text-reset">Contact Us</a>
                        </p>
                        <p>
                            <a href="/terms-and-conditions" class="text-reset">Terms and Conditions</a>
                        </p>
                        <p>
                            <a href="/privacy-policy" class="text-reset">Privacy Policy</a>
                        </p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <!-- Links -->
                        <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                        <p><i class="fas fa-home me-3"></i> Noida Sector 62, Uttar Pradesh</p>
                        <p>
                            <i class="fas fa-envelope me-3"></i> info@snaap.io
                        </p>
                        <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
                        <p><i class="fas fa-print me-3"></i> + 01 234 567 89</p>
                    </div>
                    <!-- Grid column -->
                </div>
                <!-- Grid row -->
            </div>
        </section>
        <!-- Section: Links  -->

        <!-- Copyright -->
        <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
            © 2021 Copyright:
            <a class="text-reset fw-bold" href="https://snaap.io/">Snaap.io</a>
        </div>
        <!-- Copyright -->
    </footer>

    <!-- Optional JavaScript; choose one of the two! -->
    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

    <!-- Bootstrap Icons -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.js"></script>
    <script>
        document.getElementById("year").textContent = new Date().getFullYear();
    </script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5723306635822257" crossorigin="anonymous"></script>

</body>

</html>`;

    res.send(html);



});

app.use('/api', require('./routes'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/notfound.html'))
})


app.listen(port, () => {
    console.log('Server is running on port ' + port);
});