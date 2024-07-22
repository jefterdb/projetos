var countrySateCityinfo = {
    Austrália: {
        "Western Aust": {
            Broome: ["12312", "3232", "32423"],
            Collgardie: ["12312", "3232"]
        },
        Tasmania: {
            Hobart: ["324234", "43242342"],
            Lauceston: ["3689789", "454234"],
            Burnie: ["12312", "5545"]
        },
    },
    
    Germany: {
        Bavaria: {
            Munich: ["68879", "897856", "777664"],
            Numemberg: ["52345", "8644"]
        },
        Hessen: {
            Frankfurt: ["68468", "13248689"],
            Surat: ["199849", "132489"]
        },
    },

    Canadá: {
        Alberta: {
            Calgary: ["8967834", "45321", "45687896"],
            Edmonton: ["41657", "37887"]
        },
        Mantioba: {
            Brandon: ["1456456", "57257"],
            Winnipeg: ["9786354", "21257687"]
        },
    }
}

window.onload = function(){
    const selectCountry = document.getElementById('country'),
        selectState = document.getElementById('state'),
        selectCity = document.getElementById('city'),
        selectZip = document.getElementById('zip'),
        selects = document.querySelectorAll('select')

        selectState.disabled = true
        selectCity.disabled = true
        selectZip.disabled = true

        selects.forEach(select => {
            if(select.disabled == true){
                select.style.cursor = "auto"
            }
        })

        for(let country in countrySateCityinfo){
            //console.log(country);
            selectCountry.options[selectCountry.options.length] = new Option(country, country)
        }

        //Country change
        selectCountry.onchange = (e) => {
            selectState.disabled = false
            selectCity.disabled = true
            selectZip.disabled = true

            selectState.length = 1
            selectCity.length = 1
            selectZip.length = 1

            for(let state in countrySateCityinfo[e.target.value]){
                //console.log(state);
                selectState.options[selectState.options.length] = new Option(state, state)
            }
        }

        //State change
        selectState.onchange = (e) =>{
            selectCity.disabled = false
            selectZip.disabled = true

            selectCity.length = 1
            selectZip.length = 1

            for (let city in countrySateCityinfo[selectCountry.value][e.target.value]){
                //console.log(city);
                selectCity.options[selectCity.options.length] = new Option(city, city)
            }
        }

        //Change City
        selectCity.onchange = (e) =>{
            selectZip.disabled = false

            selectZip.length = 1

            let zips = countrySateCityinfo[selectCountry.value][selectState.value][e.target.value]

                for(let i=0; i<zips.length; i++) {
                    selectZip.options[selectZip.options.length] = new Option(zips[i], zips[i])
                }
            }
}