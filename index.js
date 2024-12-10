const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3004;
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();
const cheerio = require('cheerio');

app.use(bodyParser.json());
// To parse application/json content

// Middleware to parse URL-encoded request body (common for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));  // To parse application/x-www-form-urlencoded content
app.use(express.static(path.join(__dirname, 'public')));

const { Blog } = require('./models/blog');
const Url = require('./models/sortUrl');
// Mongoose Connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 60000,  // Increase server selection timeout to 30 seconds
            socketTimeoutMS: 60000,          // Increase socket timeout to 30 seconds
        });
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
app.get('/analytics', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/analytics.html'))
})
// API routes
app.get('/blog', async (req, res) => {
    const blogs = await Blog.find({});
    const randomBlog = blogs[0];

    const blogListHTML = blogs.map((data, index) => {
        const date = new Date(data.createdAt);
        const formattedDate = date.toLocaleDateString('en-GB'); // Formats to DD-MM-YYYY
        return `
            <div class="col-md-4" key="${index}">
                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="col p-4 d-flex flex-column position-static">
                    <div>
                        <img src="${data?.imageURL}" alt="${data.categoryName}" style="height: 200px; width: 100%"/>
                    </div>
                    <div class="d-flex justify-content-between">

                       <div> <strong class="d-inline-block mb-2 text-primary-emphasis">
                            ${data.heading}
                        </strong></div>
                        <div class="mb-1 text-body-secondary">${formattedDate}</div>
                        </div>
                        <h3 class="mb-0"></h3>
                        <p class="card-text mb-auto">${data.description}</p>
                        <a href="/blog/${data.titleUrl}" class="icon-link gap-1 icon-link-hover stretched-link">
                            Continue reading
                        </a>
                    </div>
                </div>
            </div>`;
    }).join("");


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
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <meta name="description" content="Shorten, share, and track your URLs effortlessly with Snaap.io. Simplify your links and gain insights with real-time analytics and detailed tracking reports. Perfect for businesses and individuals alike!">
    <meta name="keywords" content="URL shortener, link shortener, Snaap.io, shorten links, custom URLs, URL tracking, link analytics, URL management, real-time analytics, link sharing, custom link branding">
    <link rel="icon" type="image/png" href="./logo.avif">
    <style>
        body {
           font-family: "Poppins", sans-serif;
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
                      <a class="nav-link" href="/analytics">Analytics</a>
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
                <div class="col-lg-12 px-0">
                    <h3 class="display-8 fst-italic">${randomBlog?.title}</h3>
                    <p class="lead my-1">${randomBlog?.description}</p>
                    <p class="lead mb-0"><a href="/blog/${randomBlog?.titleUrl}" class="text-body-emphasis fw-bold">Continue reading...</a></p>
                </div>
            </div>
            <div class="row mb-2">
                ${blogListHTML}     
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
                       <a href="/analytics" class="text-reset">Analytics</a>
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
                            <a href="/about" class="text-reset">About Us</a>
                        </p>
                        <p>
                            <a href="/contact-us" class="text-reset">Contact Us</a>
                        </p>
                        <p>
                            <a href="/terms-and-conditions" class="text-reset">Terms and Conditions</a>
                        </p>
                        <p>
                            <a href="/privacy-policy" class="text-reset">Privacy Policy</a>
                        </p> <p>
                            <a href="/blog" class="text-reset">Blog</a>
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
                     
                    </div>
                    <!-- Grid column -->
                </div>
                <!-- Grid row -->
            </div>
        </section>
        <!-- Section: Links  -->

        <!-- Copyright -->
        <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
            © <span id="year"></span> Copyright:
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

app.get('/blog/:url', async (req, res) => {

    const titleUrl = req.params.url;

    const blog = await Blog.findOne({ titleUrl });
    const date = new Date(blog?.createdAt);
    const blogs = await Blog.find({});



    const blogListHTML = blogs.map((data, index) => {
        const date = new Date(data.createdAt);
        const formattedDate = date.toLocaleDateString('en-GB'); // Format date to DD-MM-YYYY

        return `
            <li>
                <a class="d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center py-1 link-body-emphasis text-decoration-none" href="/blog/${data.titleUrl}">
       
                    <div class="col-lg-12 p-3 bg-light">
                        <h6 class="mb-0">${data.title}</h6>
                        <small class="text-body-secondary">${formattedDate}</small>
                    </div>
                </a>
            </li>`;
    }).join(""); // Join all <li> elements into a single string


    // Sitemap Generator.
    function tocify(html) {
        if (typeof html !== 'string' || !html.trim()) {
            // If html is not a string or is empty, return default values
            return {
                modifiedHtml: '',
                tocHtml: '',
            };
        }
        const $ = cheerio.load(html); // Load the HTML content with cheerio
        const headings = $("h1, h2, h3, h4, h5, h6");
        const toc = [];
        headings.each(function (index) {
            const level = parseInt(this.tagName.replace("h", ""), 10); // Get heading level
            const text = $(this).text().trim();
            let id = $(this).attr("id") || text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]/g, "");
            let uniqueId = id;
            let counter = 1;
            while ($(`#${uniqueId}`).length > 0) {
                uniqueId = `${id}-${counter}`;
                counter++;
            }
            $(this).attr("id", uniqueId);
            // Add to TOC
            toc.push({ level, text, id: uniqueId });
        });

        // Generate TOC HTML
        const tocHtml = toc
            .map(({ level, text, id }) => `<li class="toc-level-${level}"><a href="#${id}">${text}</a></li>`)
            .join("\n");
        const tocWrapper = `<ul class="table-of-contents">\n${tocHtml}\n</ul>`;

        // Extract the content inside the body (excluding the <html> and <body> tags)
        const modifiedHtml = $("body").html() || ''; // Ensure it's not undefined
        const modifiedHtmlWrapped = `<div class="content-wrapper">\n${modifiedHtml}\n</div>`;

        return {
            modifiedHtml: modifiedHtmlWrapped, // Modified HTML inside <div>
            tocHtml: tocWrapper,               // TOC HTML
        };
    }

    const { modifiedHtml, tocHtml } = tocify(blog?.content || ''); // Ensure blog?.content is valid


    const finalHTML = `<ul class="list-unstyled">${blogListHTML}</ul>`;
    const formattedDate = date.toLocaleDateString('en-GB'); // Formats to DD-MM-YYYY

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
    <meta name="description" content="${blog?.metaDescription}">
    <meta name="keywords" content="${blog?.metaKeywords}">
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
        
            
/* Basic Styles for Table of Contents */
.table-of-contents {
    font-family: Arial, sans-serif;
    padding-left: 20px;
    list-style-type: none;
    margin: 0;
    font-size: 16px;
}
.content-wrapper img{
    max-height: 420px !important;
    width: 100% !important;
}

/* Styling each TOC item based on its heading level */
.table-of-contents .toc-level-1 {
    font-weight: bold;
}

.table-of-contents .toc-level-2 {
    padding-left: 10px;
}

.table-of-contents .toc-level-3 {
    padding-left: 20px;
}

.table-of-contents .toc-level-4 {
    padding-left: 30px;
}

.table-of-contents .toc-level-5 {
    padding-left: 40px;
}

.table-of-contents .toc-level-6 {
    padding-left: 50px;
}

/* Hover effect for links in the TOC */
.table-of-contents a {
    color: #2c3e50;
    text-decoration: none;
}

.table-of-contents a:hover {
    text-decoration: underline;
}


/* Style for anchor links to make them stand out */
a {
    color: #3498db;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

/* code snippts: */
  header {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 20px 0;
        }
        h1 {
            margin: 0;
        }
        main {
            padding: 20px;
        }
        h2 {
            color: #333;
        }
        pre, code {
            font-size: 1.1em;
            background-color: #2d2d2d;
            color: #f8f8f2;
            padding: 10px;
            border-radius: 5px;
        }
        pre {
            overflow-x: auto;
            margin-bottom: 20px;
        }
        a {
            color: #3498db;
            text-decoration: none;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
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
                      <a class="nav-link" href="/analytics">Analytics</a>
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
                    <h1 class="pb-1 mb-2 border-bottom" style="font-size: 1.3rem">
                        ${blog?.heading}
                    </h1>
                  
                    <article class="blog-post">
                        <h2 class="display-8 link-body-emphasis mb-1">${blog?.title}</h2>
                        <p class="blog-post-meta">${formattedDate} by ${blog?.postBy}</p>

  <div>
                        <img src="${blog?.imageURL}" alt="${blog?.heading}" style="height: 400px; width: 100%"/>
                    </div>
                        <div>
                            
                            ${tocHtml}
                      
                        </div>
                        <div>
                        ${modifiedHtml}
                        
                        </div>
                    </article>
                </div>

                <div class="col-md-4">
                    <div class="position-sticky" style="top: 2rem;">

                     

                        <div class="p-1 mb-3 bg-body-tertiary rounded">
                            <h4 class="">About</h4>
                            <p class="mb-0">At Snaap.io, we aim to empower you with simple, yet powerful tools that enhance your digital workflows. Whether you're sharing links, tracking performance, or creating custom QR codes, we are here to make your online presence
                                seamless..</p>
                        </div>

                        <div>
                            <h4 class="">Recent posts</h4>
                            ${finalHTML}
                        </div>


                        <div class="p-4">
                            <h4 class="">Elsewhere</h4>
                            <ol class="list-unstyled d-flex gap-3">
                                <li><a href="https://github.com/codewithcraze">GitHub</a></li>
                                <li><a href="https://www.linkedin.com/in/codewithcraze/">Linkedin</a></li>
                                <li><a href="https://www.instagram.com/codewithdeepak.in">Instagram</a></li>
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
                       <a href="/analytics" class="text-reset">Analytics</a>
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
                            <a href="/about" class="text-reset">About Us</a>
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
                        <p>
                            <a href="/blog" class="text-reset">Blog</a>
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
                     
                    </div>
                    <!-- Grid column -->
                </div>
                <!-- Grid row -->
            </div>
        </section>
        <!-- Section: Links  -->

        <!-- Copyright -->
        <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
            © <span id="year"></span> Copyright:
            <a class="text-reset fw-bold" href="https://snaap.io/">Snaap.io</a>
        </div>
        </footer>
          <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>

    <!-- Bootstrap Icons -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.js"></script>
    <script>
        document.getElementById("year").textContent = new Date().getFullYear();
        </script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5723306635822257"
        crossorigin="anonymous"></script>

</body>
</html>`;

    res.send(html);

});



app.use('/api', require('./routes'))

// @route    GET /:code
// @desc     Redirect to long/original URL
app.get('/:code', async (req, res) => {
    try {
        // Find the URL by the urlCode and increment the count by 1
        const url = await Url.findOneAndUpdate(
            { urlCode: req.params.code }, // Match the URL by code
            { $inc: { count: 1 } }, // Increment the count by 1
            { new: true } // Return the updated document
        );

        if (url) {
            // If the URL is found, redirect to the original long URL
            return res.redirect(url.longUrl);
        } else {
            // If no URL is found, return a 404 error
            return res.status(404).json('No URL found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/notfound.html'))
})


app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
