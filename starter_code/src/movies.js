// Get the average of all rates with 2 decimals
function ratesAverage(arr){
     
     let totalMovies = arr.length;

     const totalRate = arr.reduce((acc, value) => {
          return acc + value.rate;
     }, 0);

     //Average
     return parseFloat((totalRate/totalMovies).toFixed(2));
}

// Get the average of Drama Movies
function dramaMoviesRate(arr){

     const dramaMovies = arr.filter(m => {
          if(m.genre.includes('Drama')){
               return true;
          }
     })
     
     //Total drama movies
     let totalDrama= dramaMovies.length;

     //In case no drama movies
     if(totalDrama === 0) return 0;

     const avrDrama = dramaMovies.reduce((acc, value) => {
          return acc + value.rate;
     }, 0);

     //Average drama movies
     return parseFloat((avrDrama/totalDrama).toFixed(2));
}

// Order by time duration, ascending
function orderByDuration(arr){

     let byDuration = arr.slice().sort((a,b) => {

          //Calculating duration
          let aDuration = timeParser(a.duration);
          let bDuration = timeParser(b.duration);

          if(aDuration === bDuration){
               return a.title.localeCompare(b.title);
          }

          return aDuration - bDuration;
     });
     
     return byDuration;
}

// How many movies did Steven Spielberg direct
function howManyMovies(arr){
     
     let spielbergMovies = arr.filter(f => {
          if(f.genre.includes("Drama") && f.director === "Steven Spielberg"){
               return true;
          }
     });
     
     if(spielbergMovies.length === 0) return 0;
     
     return spielbergMovies.length;
}

// Order by title and print the first 20 titles
function orderAlphabetically(arr){

     let byTitle = arr.slice().sort((a,b) => {
          return a.title.localeCompare(b.title);
     }).map(m => {
          return m.title;
     });

     //Up to 20
     return byTitle.slice(0, 20);
}

// Best yearly rate average
function turnHoursToMinutes(arr){

     let moviesWithNewDuration = arr.map(movie => {
          
          // Update duration format
          return Object.assign({}, movie, {
               duration: timeParser(movie.duration) //update key
          });
     });

     return moviesWithNewDuration;
}

// Turn duration of the movies from hours to minutes
function timeParser(expression){
     let durationSplitted = expression.toString().trim().split(' ');

     if(durationSplitted.length === 1){
          if(durationSplitted[0].indexOf('h') != -1){
               let h = durationSplitted[0].replace("h", "");
               return h*60; //hours
          }
          if(durationSplitted[0].indexOf('min') != -1){
               let m = durationSplitted[0].replace("min", "");
               return m*1; //minutes
          }

          return durationSplitted[0]*1; //minutes by default
     }
      
     return durationSplitted[0].replace("h", "")*60 + durationSplitted[1].replace("min", "")*1;
}

//Bonus
function bestYearAvg(arr){

     if(arr.length === 0) return null;

     //group movies by year
     let grouper = arr.reduce((group, movie) => {

          let indefOfMovieInGroup = group.findIndex(x => {
               return x.year === movie.year
          });
     
          if(indefOfMovieInGroup >= 0){
                    group[indefOfMovieInGroup].rates.push(movie.rate);
          }
          else
          {
               group.push({
                    year: movie.year,
                    rates: [movie.rate]
               });     
          }
     
          return group;
     
     }, []);
     
     //store best year and avg rate
     let averageRateBest = { bestAvrRate: 0, bestYear: 0 }
     
     grouper.forEach(g => {
          
          //avg  rate
          let totalRateSize = g.rates.length;
          let totalRateAmount = g.rates.reduce((acc, val) => {
               return acc + val;
          }, 0)
     
          let avgRate = totalRateAmount/totalRateSize; 
     
          //if avg rate are equals
          if(avgRate === averageRateBest.bestAvrRate){
               if(g.year < averageRateBest.bestYear){
                    averageRateBest.bestYear = g.year;
                    averageRateBest.bestAvrRate = avgRate;
               }
          //store te best rate
          } else if(avgRate > averageRateBest.bestAvrRate){
               averageRateBest.bestYear = g.year;
               averageRateBest.bestAvrRate = avgRate;
          }
     });
     
     return `The best year was ${averageRateBest.bestYear} with an average rate of ${averageRateBest.bestAvrRate}`;
}