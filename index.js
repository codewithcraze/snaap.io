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
            serverSelectionTimeoutMS: 30000, // Wait up to 30 seconds to select a server
            socketTimeoutMS: 45000, // Wait up to 45 seconds for a socket to remain open
            connectTimeoutMS: 30000
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
    }
}
connectDB();

// Routes
app.get('/', (req, res) => {
    // customer response setter.
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

app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/robots.txt'));
})
// API routes

app.get('/qr-code-generator', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/qr-code-generator.html'))
})

app.get('/blog', async (req, res) => {
    const blogs = await Blog.find({});
    const randomIndex = Math.floor(Math.random() * blogs.length);
    const randomBlog = blogs[randomIndex];
    const blogListHTML = blogs.map((data, index) => {
        const date = new Date(data.createdAt);
        const formattedDate = date.toLocaleDateString('en-GB'); // Formats to DD-MM-YYYY
        return `
            <div class="col-lg-3 col-md-4" key="${index}">
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
    <title>Blogs | At Snaap.io</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==" crossorigin="anonymous" referrerpolicy="no-referrer"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <meta name="description" 
      content="Explore insightful articles and expert tips on digital marketing, SEO, URL management, and online tools on the Snaap.io blog. Stay updated with the latest trends and best practices in the digital world.">

    <meta name="keywords" 
      content="Snaap.io blog, digital marketing, SEO tips, URL shortener blog, link tracking blog, online tools, digital trends, blog articles, online marketing, link management, content marketing, best practices for SEO, Mern Stack, Javascript Projects, React Projects">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5723306635822257"
     crossorigin="anonymous"></script><script type="text/javascript">
	atOptions = {
		'key' : 'de4a8b561147b81e9ad910f38de21db5',
		'format' : 'iframe',
		'height' : 60,
		'width' : 468,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/de4a8b561147b81e9ad910f38de21db5/invoke.js"></script>


    <link rel="icon" type="image/png" href="https://storage.googleapis.com/snaap/1734096819786-logo.avif">
    <style>.nav-bg,.navbar,footer section{background:#1b324c!important}body{font-family:"Poppins",sans-serif;background-color:#fff!important}.navbar{height:70px;box-shadow:rgba(0,0,0,.12) 0 1px 3px,rgba(0,0,0,.24) 0 1px 2px;border-bottom:1px solid #fff}.navbar-brand,.navbar-nav .nav-link,.navbar-nav .nav-link.active{color:#fff}.navbar-nav .nav-link:hover{color:#d1d1d1}.input-section{margin-top:1rem;text-align:center}.input-section input{height:50px;width:100%;background-color:#fff;border:1px solid #ddd;color:#000;padding:0 1rem;font-size:1rem;margin-bottom:10px}.input-section button{padding:10px 20px;background-color:#000;color:#fff;border:1px solid #ddd;cursor:pointer;transition:background-color .3s}.input-section button:hover{background-color:#444}.result-section p{font-size:1rem;display:none}.result-section .hidden{display:none}.navbar-brand{line-height:1.5;font-weight:800}.main{height:400px;margin-top:200px}#longUrl{width:100%;height:60px;padding:.8rem;font-size:1.2rem;border-radius:9px}.input-section input:focus{border:2px solid #444;outline:0;transition:border .3s}#generateBtn:hover{transform:scale(1.05);transition:transform .3s}.result-section p.hidden{opacity:0;transition:opacity .5s}.result-section p:not(.hidden){opacity:1}#copyBtn:focus{outline:#444 solid 2px}.result-section span{font-weight:700;text-decoration:underline;cursor:pointer}@media (max-width:768px){.input-section{margin-top:2rem;width:100%!important}.input-section input{max-width:100%}.footer .footer-social-link{margin-bottom:.8rem;text-decoration:none!important}.input-section button{width:100%;margin-top:10px}}.social-link a i{font-size:2rem}.social-link a i:hover{font-size:2.1rem}.nav-bg{color:#fff}footer section{color:#fff!important}
    .featured-post-card{position:relative;border-radius:10px;overflow:hidden;height:300px;color:#fff;background-image:url('${randomBlog.imageURL}');background-size:cover;background-position:center;background-repeat:no-repeat}.featured-post-card .overlay{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(10,1,1,.8);z-index:0}.featured-post-card .content{position:relative;z-index:1;padding:20px;background-color:rgba(10,3,3,.9);border-radius:10px}.featured-post-card .content h3{font-weight:700;font-size:2rem}.featured-post-card .content p{font-size:1.1rem}.featured-post-card .content a{font-weight:700;font-size:1.1rem;text-decoration:underline}@media (max-width:768px){.featured-post-card{height:auto}}

    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg mb-5 fixed-top">
        <div class="container-fluid nav-bg">
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
                        <a class="nav-link" href="/qr-code-generator">QR Code Generator</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/blog">Blogs</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div style="margin-top: 100px">
        <main class="container">
           <div class="featured-post-card">
            <div class="overlay"></div>
                <div class="content">
                        <b class="h5">Featured Post</b>
                        <div class="col-lg-12 px-0 mt-3">
                            <h3 class="display-6 fst-italic">${randomBlog?.title}</h3>
                            <p class="lead my-3">${randomBlog?.description}</p>
                            <p class="lead mb-0">
                                <a href="/blog/${randomBlog?.titleUrl}" class="text-white fw-bold text-decoration-underline">Continue reading...</a>
                            </p>
                        </div>
                </div>
            </div>
            <div class="row mb-2 mt-5">
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
                            <a href="/qr-code-generator" class="text-reset">QR Code Generator</a>
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
        <div class="text-center p-4 nav-bg border-top">
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

    if(!blog){
        res.sendFile(path.join(__dirname, 'public', '/pages/notfound.html'));
    }else{
        const date = new Date(blog?.createdAt);
        const blogs = await Blog.find({});
        const blogListHTML = blogs
        .reverse() // Reverse the array
        .map((data, index) => {
            const date = new Date(data.createdAt);
            const formattedDate = date.toLocaleDateString('en-GB'); // Format date to DD-MM-YYYY
            
            // Add 'd-none' class to blogs after the first 5
            const additionalClass = index >= 5 ? 'd-none' : '';
            
            return `
                <li class="${additionalClass}">
                    <a class="d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center py-1 link-body-emphasis" href="/blog/${data.titleUrl}">
                        <div class="col-lg-12 p-3 accordion-button">
                            <h6 class="mb-0">${data.title}</h6>
                            <small class="text-body-secondary">${formattedDate}</small>
                        </div>
                    </a>
                </li>`;
        }).join(""); // Join all <li> elements
    
    
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
        <title>${blog?.title}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==" crossorigin="anonymous" referrerpolicy="no-referrer"
        />
        <!-- Link to Prism.js CSS for code highlighting -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet">
           <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5723306635822257"
         crossorigin="anonymous"></script>
        <meta name="description" content="${blog?.metaDescription}">
        <meta name="keywords" content="${blog?.metaKeywords}">
            <link rel="icon" type="image/png" href="https://storage.googleapis.com/snaap/1734096819786-logo.avif">
        <style>.nav-bg,.navbar,footer section{background:#1b324c!important}body{font-family:Poppins,sans-serif;background-color:#fff!important}.navbar{height:70px;box-shadow:rgba(0,0,0,.12) 0 1px 3px,rgba(0,0,0,.24) 0 1px 2px;border-bottom:1px solid #fff}.navbar-brand,.navbar-nav .nav-link,.navbar-nav .nav-link.active{color:#fff}.navbar-nav .nav-link:hover{color:#d1d1d1}.input-section{margin-top:1rem;text-align:center}.input-section input{height:50px;width:100%;background-color:#fff;border:1px solid #ddd;color:#000;padding:0 1rem;font-size:1rem;margin-bottom:10px}.input-section button{padding:10px 20px;background-color:#000;color:#fff;border:1px solid #ddd;cursor:pointer;transition:background-color .3s}.input-section button:hover{background-color:#444}.result-section p{font-size:1rem;display:none}.result-section .hidden{display:none}.navbar-brand{line-height:1.5;font-weight:800}.main{height:400px;margin-top:200px}#longUrl{width:100%;height:60px;padding:.8rem;font-size:1.2rem;border-radius:9px}.input-section input:focus{border:2px solid #444;outline:0;transition:border .3s}#generateBtn:hover{transform:scale(1.05);transition:transform .3s}.result-section p.hidden{opacity:0;transition:opacity .5s}.result-section p:not(.hidden){opacity:1}#copyBtn:focus{outline:#444 solid 2px}.result-section span{font-weight:700;text-decoration:underline;cursor:pointer}@media (max-width:768px){.input-section{margin-top:2rem;width:100%!important}.input-section input{max-width:100%}.footer .footer-social-link{margin-bottom:.8rem;text-decoration:none!important}.input-section button{width:100%;margin-top:10px}}.social-link a i{font-size:2rem}.social-link a i:hover{font-size:2.1rem}.table-of-contents{font-family:Arial,sans-serif;padding-left:20px;list-style-type:none;margin:0;font-size:16px}.content-wrapper img{max-height:420px!important;width:100%!important}.table-of-contents .toc-level-1{font-weight:700}.table-of-contents .toc-level-2{padding-left:10px}.table-of-contents .toc-level-3{padding-left:20px}.table-of-contents .toc-level-4{padding-left:30px}.table-of-contents .toc-level-5{padding-left:40px}.table-of-contents .toc-level-6{padding-left:50px}.table-of-contents a{color:#2c3e50;text-decoration:none}.table-of-contents a:hover,a:hover{text-decoration:underline}header{background-color:#333;color:#fff;text-align:center;padding:20px 0}h1{margin:0}main{padding:20px}h2{color:#333}code,pre{font-size:1.1em;background-color:#2d2d2d;color:#f8f8f2;padding:0px;border-radius:5px}pre{overflow-x:auto;margin-bottom:20px}a{color:#3498db;text-decoration:none}.nav-bg{color:#fff}footer section{color:#fff!important}
          .table-of-contents{
              background: whitesmoke;
        padding: 19px;
        text-decoration: underline;
            list-style-type: disclosure-closed !important;
        }
            .accordion-button{
        color: white !important;
        background: #1b324c !important;
    }
        </style>
    </head>
    
    <body>
        <nav class="navbar navbar-expand-lg  mb-5 fixed-top" style="background-color: rgba(0, 0, 0, 0.05);">
            <div class="container-fluid nav-bg">
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
                            <a class="nav-link" href="/qr-code-generator">QR Code Generator</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/blog">Blogs</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div style="margin-top: 100px">
            <main class="container">
            
                   <nav aria-label="breadcrumb">
              <ol class="breadcrumb" id="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
              </ol>
            </nav>
                <div class="row g-5">
                    <div class="col-md-8">
                        <article class="blog-post">
                            <h1 class="display-8 link-body-emphasis mb-1">${blog?.heading}</h1>
                            <p class="blog-post-meta">${formattedDate} by ${blog?.postBy}</p>
    
                            <div>
                                <img src="${blog?.imageURL}" alt="${blog?.heading}" style="height: 400px; width: 100%" />
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
                                    seamless..
                                </p>
                            </div>
    
                            <div>
                                <h4 class="">Our Recent posts</h4>
                                ${finalHTML}
                            </div>
    
                            <div class="p-4">
                                <h4 class="">Follow Us</h4>
                                <ol class="list-unstyled d-flex gap-3">
                                    <li>
                                        <a href="https://github.com/codewithcraze" target="_blank" class="text-decoration-none">
                                            <i class="fab fa-github fa-lg"></i> GitHub
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/in/codewithcraze/" target="_blank" class="text-decoration-none">
                                            <i class="fab fa-linkedin fa-lg"></i> LinkedIn
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/codewithdeepak.in" target="_blank" class="text-decoration-none">
                                            <i class="fab fa-instagram fa-lg"></i> Instagram
                                        </a>
                                    </li>
                                </ol>
                            </div>
    
                            <!-- Add Font Awesome -->
                            <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    
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
                                <a href="/qr-code-generator" class="text-reset">QR Code Generator</a>
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
            <div class="text-center p-4 nav-bg border-top">
                © <span id="year"></span> Copyright:
                <a class="text-reset fw-bold" href="https://snaap.io/">Snaap.io</a>
            </div>
        </footer>
        <!-- Bootstrap Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
        <!-- Bootstrap Icons -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.js"></script>
        <script>
            document.getElementById("year").textContent = new Date().getFullYear();
        </script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5723306635822257" crossorigin="anonymous"></script>
        
        <script>
    // Function to update the breadcrumb dynamically based on the current URL
    function updateBreadcrumb() {
    debugger;
      const breadcrumbElement = document.getElementById('breadcrumb');
      const url = window.location.pathname; // Get the current URL path
    
      // Split the URL path into segments (ignoring leading empty segments)
      const pathSegments = url.split('/').filter(segment => segment);
    
      // Clear previous breadcrumb items (except the Home link)
      breadcrumbElement.innerHTML = '<li class="breadcrumb-item"><a href="/">Home</a></li>';
    
      // Loop through each path segment and add to breadcrumb
      pathSegments.forEach((segment, index) => {
        const breadcrumbItem = document.createElement('li');
        breadcrumbItem.classList.add('breadcrumb-item');
        
        // Capitalize the first letter of each word in the segment and replace dashes with spaces
        const displayText = segment
          .split('-') // Split segment by hyphen
          .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
          .join(' '); // Join the words with spaces
    
        // Create a link for each breadcrumb item (except the last one)
        const breadcrumbLink = document.createElement('a');
        breadcrumbLink.href = '/' + pathSegments.slice(0, index + 1).join('/');
        breadcrumbLink.innerText = displayText;
    
        // Append the link to the breadcrumb item
        breadcrumbItem.appendChild(breadcrumbLink);
        
        // Append the breadcrumb item to the breadcrumb list
        breadcrumbElement.appendChild(breadcrumbItem);
      });
    
      // Make the last breadcrumb item active (no link for the current page)
      const lastBreadcrumb = breadcrumbElement.lastElementChild;
      if (lastBreadcrumb) {
        lastBreadcrumb.classList.add('active');
      }
    }
    
    // Run the function to update the breadcrumb when the page loads
    window.addEventListener('DOMContentLoaded', updateBreadcrumb);
    
    // If the URL changes (e.g., user uses back/forward navigation), update the breadcrumb
    window.addEventListener('popstate', updateBreadcrumb);
    
    </script>
    
    
    </body>
    
    </html>`;
    
        res.send(html);
    
    }

   
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
