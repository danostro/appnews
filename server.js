var express = require('express'); 
var jsdom = require('jsdom');
var request = require('request');
var url = require('url');
var app = express();

app.use(express.static('www'));
app.set('view engine', 'ejs');
app.set('views','www')

var sportSites = [{url:'/sportsSport5',img:'/images/sport5profile.png'},{url:'/sportsOne',img:'/images/oneProfile.png'}];
var newsSites = [{url:'/newsMako',img:'/images/mako-profile.png'},{url:'/newsYnet',img:'/images/ynet-profile.png'}];
var entertainSites = [{url:'/entertainMako',img:'/images/mako-profile.png'},{url:'/entertainYnet',img:'/images/ynet-profile.png'}];
var mainPageSites = [{url:'#',img:'/images/sport5profile.png'},{url:'#',img:'/images/oneProfile.png'},{url:'#',img:'/images/mako-profile.png'},{url:'#',img:'/images/ynet-profile.png'}]
var mainPageContent = "אפליקציה זו מקבצת עבורך את כל הכתבות המובילות מבין האתרים המובילים במגוון נושאים, ובכך מאפשרת לך לעבור בין הכתבות מכל האתרים וכך להחליט איזו כתבה תרצה לקרוא.לשימוש באפליקציה בחר תחום בתפריט, ולאחר מכן לחץ על הלוגו של האתר ממנו תרצה לקרוא כתבות"
app.get('/', function(req, res){ 
 res.render('index',{
 	sites:mainPageSites,
 	titlePage:"אודות האפליקציה",
 	items:[],
 	content:mainPageContent
 });
 });


app.get('/news', function(req, res){ 
 res.render('index',
 {
 	sites:newsSites,
 	titlePage:"חדשות",
 	items:[],
 	content:'',
 	siteParentLogo:''
 });
 });

app.get('/sports', function(req, res){ 
 res.render('index',
 {
 	sites:sportSites,
 	titlePage:"ספורט",
 	items:[],
 	content:'',
 	siteParentLogo:''
 });
 });

app.get('/entertainment', function(req, res){ 
 res.render('index',
 {
 	sites:entertainSites,
 	titlePage:"בידור",
 	items:[],
 	content:'',
 	siteParentLogo:''
 });
 });





app.get('/sportsOne', function(req, res){ 
	jsonObj = [];

	jsdom.env({
        url: "http://one.co.il/",
        scripts: ["http://code.jquery.com/jquery.js"],
        done: function (errors, window) {
            var file = 'one.json';
            var $ = window.$;
            $("div.one-hp-left-container-column-articles a.one-article:not(.one-article-strip):lt(5)").each(function () {
                item = {};
                item["url"] = "http://one.co.il" + $(this).attr('href');
                item["title"] = $(this).find('h1').text();
                item["disc"] = $(this).find('h2').text();
                item["photoUrl"] = $(this).find('.one-article-image').attr('src');

                jsonObj.push(item);
            });


         res.render('index',
         {
 		sites:sportSites,
 		titlePage:"ספורט",
 		items:jsonObj,
 		content:'',
 		siteParentLogo:'/images/oneProfile.png'
 	});
        }
       
    });

 });






app.get('/sportsSport5', function(req, res){ 
	jsonObj = [];

	jsdom.env({
        url: "http://www.sport5.co.il/4439-he/Sport5.aspx",
        scripts: ["http://code.jquery.com/jquery.js"],
        done: function (errors, window) {
            var file = 'sport5.json';
            var $ = window.$;
            $("div.post-holder .post:not(.post-alt) .holder:lt(5)").each(function () {
                item = {};

                var link = $(this).find("a").attr('href');
                var img = $(this).find("img.mainarticles-img").attr("src");
                var title = $(this).find("div.text-holder h2").text();
                var description = $(this).find("div.text-holder p").text();

                item["url"] = link;
                item["title"] = title;
                item["disc"] = description;
                item["photoUrl"] = img;
                jsonObj.push(item);
            });

            res.render('index',
         {
 		sites:sportSites,
 		titlePage:"ספורט",
 		items:jsonObj,
 		content:'',
 		siteParentLogo:'/images/sport5profile.png'
 	});

           
        }
    });
 });



app.get('/newsMako', function(req, res){ 
	jsonObj = [];

	jsdom.env({
        url: "http://www.mako.co.il/news-military",
        scripts: ["http://code.jquery.com/jquery.js"],
        done: function (errors, window) {
            var file = 'mako.json';
            var $ = window.$;
            var first = $("div.itemsWrap.child.flodding:first");
            $(first).find(".hover").each(function () {
                item = {};

                var link = "http://mako.co.il" + $(this).find("div.image_inside a").attr('href');
                var img = $(this).find("div.image_inside img").attr("src");
                var title = $(this).find("div.line-clamp h5").text();
                var description = $(this).find("div.line-clamp p").text();

                item["url"] = link;
                item["title"] = title;
                item["disc"] = description;
                item["photoUrl"] = img;

                jsonObj.push(item);

            });

            res.render('index',
         {
 		sites:newsSites,
 		titlePage:"חדשות",
 		items:jsonObj,
 		content:'',
 		siteParentLogo:'/images/mako-profile.png'
 	});

            
        }
    });
 });



app.get('/newsYnet', function(req, res){ 
	jsonObj = [];

	jsdom.env({
        url: "http://www.ynet.co.il/home/0,7340,L-344,00.html",
        scripts: ["http://code.jquery.com/jquery.js"],
        done: function (errors, window) {
            var file = 'ynet.json';
            var $ = window.$;


            $("div.art_headlines_items .art_headlines_item:lt(5)").each(function () {
                item = {};

                var link = "http://ynet.co.il" + $(this).find("a.art_headlines_image").attr('href');
                var img = $(this).find("a.art_headlines_image img").attr("src");
                var title = $(this).find("div.art_headlines_item_content h4").text();
                var description = $(this).find("div.art_headlines_item_content a.art_headlines_sub_title").text();

                item["url"] = link;
                item["title"] = title;
                item["disc"] = description;
                item["photoUrl"] = img;

                jsonObj.push(item);

            });

             res.render('index',
         {
 		sites:newsSites,
 		titlePage:"חדשות",
 		items:jsonObj,
 		content:'',
 		siteParentLogo:'/images/ynet-profile.png'
 	});

           
        }
    });

	
 });



app.get('/entertainYnet', function(req, res){ 
	jsonObj = [];

	jsdom.env({
        url: "http://pplus.ynet.co.il/home/0,7340,L-11220,00.html",
        scripts: ["http://code.jquery.com/jquery.js"],
        done: function (errors, window) {
            var file = 'ynet_entertain.json';
            var $ = window.$;


            $("ul.gshpp.gshpp_leshnit li:lt(5)").each(function () {
                item = {};

                var link = "http://ynet.co.il" + $(this).find("a.gshpp_image").attr('href');
                var img = $(this).find("a.gshpp_image img").attr("src");
                var title = $(this).find("div.gshpp_content .gshpp_title a").text();
                var description = $(this).find("div.gshpp_content .gshpp_sub_title a").text();

                item["url"] = link;
                item["title"] = title;
                item["disc"] = description;
                item["photoUrl"] = img;

                jsonObj.push(item);

            });

            res.render('index',
         {
 		sites:entertainSites,
 		titlePage:"בידור",
 		items:jsonObj,
 		content:'',
 		siteParentLogo:'/images/ynet-profile.png'
 	});

            
        }
    });
 });


app.get('/entertainMako', function(req, res){ 
	jsonObj = [];
	jsdom.env({
        url: "http://www.mako.co.il/entertainment?partner=NavBar",
        scripts: ["http://code.jquery.com/jquery.js"],
        done: function (errors, window) {
            var file = 'mako_entertain.json';
            var $ = window.$;


            $("div.mako_main_portlet_container div.itemsWrap.free-items .generic .hover.classic:lt(5)").each(function () {
                item = {};

                var link = "http://mako.co.il" + $(this).find("div.image_inside a").attr('href');
                var img = $(this).find("div.image_inside img").attr("src");
                var title = $(this).find("pre a p b").text();
                var description = $(this).find("pre a p small").text();

                item["url"] = link;
                item["title"] = title;
                item["disc"] = description;
                item["photoUrl"] = img;

                jsonObj.push(item);
            });

            res.render('index',
         {
 		sites:entertainSites,
 		titlePage:"בידור",
 		items:jsonObj,
 		content:'',
 		siteParentLogo:'/images/mako-profile.png'
 	});

           
        }
    });
	
	
 });
app.listen( 3000 || process.env, function () {


    console.log('app listening on port 3000!');

});