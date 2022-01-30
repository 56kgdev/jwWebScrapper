const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const PORT = 8000

const app = express()

//Variables de construcción de URL
var cBaseUrl = 'https://www.justwatch.com'
var cCountryID = 'mx'
var cMovieSearch = 'pelicula'
var cSerieSearch = 'serie'
var cMovieName = 'la-la-land'

var arrMovieSearch = [cBaseUrl,cCountryID,cMovieSearch,cMovieName]
var arrSerieSearch = [cBaseUrl,cCountryID,cSerieSearch,cMovieName]

var cMovieSearchUrl = arrMovieSearch.join('/');
var cSerieSearchUrl = arrSerieSearch.join('/');
 
//Variables de estructura JustWatch de búsqueda específica
var cComparisonBlockClass = '.price-comparison--block'
var cMonetizationsClass = '.monetizations'

var cStreamClass = '.price-comparison__grid__row--stream'
var cBuyClass = '.price-comparison__grid__row--buy'
var cRentClass = '.price-comparison__grid__row--rent'

//var cOptionHolderClass = '.price-comparison__grid__row__element'

axios(cMovieSearchUrl)
    .then(response => {
        const html = response.data 
        const $ = cheerio.load(html)
        
        $(cComparisonBlockClass,html).each(function(){

            $(cMonetizationsClass,$(this)).each(function(){                                                                               
                
                var hasStreamOptions = $(this).find(cStreamClass).html() !== null ? true : false;
                var hasBuyOptions = $(this).find(cBuyClass).html() !== null ? true : false;
                var hasRentOptions = $(this).find(cRentClass).html() !== null ? true : false;

                if(hasStreamOptions){
                    var cherioObjectStream = $(this).find(cStreamClass);
                    showOptions("Stream", cherioObjectStream);
                }

                if(hasBuyOptions){
 
                    var cherioObjectBuy = $(this).find(cBuyClass);
                    showOptions("Compra", cherioObjectBuy);
                }

                if(hasRentOptions){
                    var cherioObjectRent = $(this).find(cRentClass);
                    showOptions("Renta", cherioObjectRent);
                }

                
            })
        })

    })


function showOptions(cWatchMode,cheerioObject){

    var cOptionHolderClass = '.price-comparison__grid__row__element'

    console.log("-------------------")
    console.log("Disponibe en " + cWatchMode)
    console.log("-------------------")

    var $ = cheerio.load(cheerioObject.html())

    $(cOptionHolderClass,cheerioObject).each(function(){

        var cStreamOption = $(this).find('img').attr('title')
        console.log(cStreamOption)

    })

}




app.listen(PORT,()=> console.log("Server running on port: " + PORT))